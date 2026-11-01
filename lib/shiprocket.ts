import "server-only";

/**
 * Shiprocket API (https://apidocs.shiprocket.in). Uses a dedicated API user:
 * Shiprocket → Settings → API → Configure → Create an API user. Its email and
 * password go in SHIPROCKET_EMAIL / SHIPROCKET_PASSWORD.
 */
const API = "https://apiv2.shiprocket.in/v1/external";

let cached: { token: string; at: number } | null = null;

export const shiprocketReady = () => Boolean(process.env.SHIPROCKET_EMAIL && process.env.SHIPROCKET_PASSWORD);

async function token() {
  // Tokens last 10 days; refresh after 9.
  if (cached && Date.now() - cached.at < 9 * 864e5) return cached.token;
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: process.env.SHIPROCKET_EMAIL, password: process.env.SHIPROCKET_PASSWORD }),
  });
  const body = await res.json();
  if (!res.ok || !body.token) throw new Error(`Shiprocket login failed: ${body.message ?? res.status}`);
  cached = { token: body.token, at: Date.now() };
  return body.token as string;
}

async function call(path: string, payload: unknown) {
  const res = await fetch(`${API}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${await token()}` },
    body: JSON.stringify(payload),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const detail = body.errors ? Object.values(body.errors).flat().join(" ") : body.message;
    throw new Error(`Shiprocket: ${detail ?? res.status}`);
  }
  return body;
}

export type ShipOrder = {
  number: number;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  total: number;
  address: { line1: string; line2?: string; city: string; state: string; pincode: string };
  items: { slug: string; name: string; size: string; price: number; qty: number }[];
};

/** Default parcel for one folded garment; adjusted per piece count. */
function parcel(count: number) {
  return { length: 30, breadth: 25, height: Math.min(30, 4 + count * 3), weight: Math.max(0.5, 0.4 * count) };
}

/**
 * Creates the Shiprocket order, assigns the recommended courier (AWB),
 * requests pickup and generates the label. Each step is idempotent from our side
 * because we save ids as soon as we get them.
 */
export async function bookShipment(
  o: ShipOrder,
  existing: { shipmentId?: number | null; orderId?: number | null },
  /** Saves Shiprocket's ids right away, so a retry never creates a duplicate order. */
  onCreated: (ids: { orderId: number; shipmentId: number }) => Promise<void>,
) {
  const [first, ...rest] = o.name.trim().split(/\s+/);
  let orderId = existing?.orderId ?? null;
  let shipmentId = existing?.shipmentId ?? null;

  if (!shipmentId) {
    const created = await call("/orders/create/adhoc", {
      order_id: `JD${o.number}`,
      order_date: new Date(o.created_at).toISOString().slice(0, 16).replace("T", " "),
      pickup_location: process.env.SHIPROCKET_PICKUP_LOCATION ?? "Primary",
      billing_customer_name: first,
      billing_last_name: rest.join(" ") || ".",
      billing_address: o.address.line1,
      billing_address_2: o.address.line2 ?? "",
      billing_city: o.address.city,
      billing_pincode: o.address.pincode,
      billing_state: o.address.state,
      billing_country: "India",
      billing_email: o.email,
      billing_phone: o.phone.replace(/\D/g, "").slice(-10),
      shipping_is_billing: true,
      order_items: o.items.map((l) => ({ name: `${l.name} (${l.size})`, sku: `${l.slug}-${l.size}`.slice(0, 50), units: l.qty, selling_price: l.price })),
      payment_method: "Prepaid",
      sub_total: o.total,
      ...parcel(o.items.reduce((s, l) => s + l.qty, 0)),
    });
    orderId = created.order_id;
    shipmentId = created.shipment_id;
    await onCreated({ orderId: orderId!, shipmentId: shipmentId! });
  }

  const awb = await call("/courier/assign/awb", { shipment_id: shipmentId });
  const data = awb?.response?.data ?? {};
  if (!data.awb_code) throw new Error(`Shiprocket couldn’t assign a courier: ${awb?.message ?? "no AWB returned"}. Check the pincode and your wallet balance.`);

  // Pickup and label are nice-to-haves; don't fail the booking if they hiccup.
  await call("/courier/generate/pickup", { shipment_id: [shipmentId] }).catch((e) => console.error(e));
  const label = await call("/courier/generate/label", { shipment_id: [shipmentId] }).catch(() => null);

  return {
    orderId,
    shipmentId,
    awb: String(data.awb_code),
    courier: data.courier_name as string | undefined,
    labelUrl: (label?.label_url as string | undefined) ?? null,
  };
}

export const trackingUrl = (awb: string) => `https://shiprocket.co/tracking/${encodeURIComponent(awb)}`;
