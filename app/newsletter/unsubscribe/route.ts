import { serviceClient } from "@/lib/supabase/service";

const page = (msg: string) =>
  new Response(
    `<!doctype html><meta name="viewport" content="width=device-width"><title>JD’ORO</title><body style="font-family:Georgia,serif;background:#faf7f3;color:#4a1412;display:grid;place-items:center;min-height:90vh;text-align:center"><div><h1 style="font-weight:normal">${msg}</h1><p style="font-family:Arial;color:#6e6561"><a href="/" style="color:#4a1412">Back to JD’ORO</a></p></div>`,
    { headers: { "Content-Type": "text/html; charset=utf-8" } },
  );

async function unsubscribe(token: string | null) {
  if (!token || !/^[0-9a-f-]{36}$/.test(token)) return false;
  const { data } = await serviceClient().from("subscribers").update({ unsubscribed_at: new Date().toISOString() }).eq("token", token).select("email");
  return Boolean(data?.length);
}

/** Link in every newsletter. */
export async function GET(request: Request) {
  const ok = await unsubscribe(new URL(request.url).searchParams.get("token"));
  return page(ok ? "You’ve been unsubscribed." : "This unsubscribe link isn’t valid.");
}

/** One-click unsubscribe from Gmail/Outlook (List-Unsubscribe-Post). */
export async function POST(request: Request) {
  await unsubscribe(new URL(request.url).searchParams.get("token"));
  return new Response(null, { status: 200 });
}
