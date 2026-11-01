import "server-only";
import { site } from "@/lib/site";
import { serviceClient } from "@/lib/supabase/service";

const base = () => process.env.NEXT_PUBLIC_SITE_URL ?? site.url;
const from = () => process.env.NEWSLETTER_FROM ?? process.env.EMAIL_FROM ?? "JD’ORO <onboarding@resend.dev>";
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

/** Plain text → simple HTML: blank lines make paragraphs, bare URLs become links. */
function render(subject: string, body: string, unsubscribe: string) {
  const paras = esc(body)
    .split(/\n{2,}/)
    .map((p) => `<p style="margin:0 0 16px">${p.replace(/\n/g, "<br>").replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" style="color:#4a1412">$1</a>')}</p>`)
    .join("");
  return `<div style="background:#faf7f3;padding:32px;font-family:Arial,sans-serif;color:#141111">
  <div style="max-width:560px;margin:auto;background:#fff;border:1px solid #e2d8cd;padding:32px">
    <p style="letter-spacing:.2em;font-size:11px;color:#806b29;margin:0">JD’ORO</p>
    <h1 style="font-family:Georgia,serif;font-weight:normal;color:#4a1412;font-size:28px;margin:12px 0 20px">${esc(subject)}</h1>
    <div style="font-size:15px;line-height:1.65;color:#3b3533">${paras}</div>
    <p style="margin-top:24px"><a href="${base()}/shop" style="background:#4a1412;color:#ede3d9;padding:12px 20px;text-decoration:none;font-size:12px;letter-spacing:.15em">SHOP THE DROP</a></p>
    <p style="font-size:11px;color:#a39893;margin-top:32px">You’re getting this because you signed up at ${site.url.replace("https://", "")}. <a href="${unsubscribe}" style="color:#a39893">Unsubscribe</a></p>
  </div></div>`;
}

async function resend(path: string, payload: unknown) {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not set.");
  const res = await fetch(`https://api.resend.com${path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Email service: ${(await res.json().catch(() => ({}))).message ?? res.status}`);
}

const unsubUrl = (token: string) => `${base()}/newsletter/unsubscribe?token=${token}`;

/** Sends to every active subscriber (or just `testTo`). Resend's batch API takes 100 per call. */
export async function sendBulletin(subject: string, body: string, testTo: string | null, sentBy: string) {
  if (testTo) {
    await resend("/emails", { from: from(), to: testTo, subject: `[Test] ${subject}`, html: render(subject, body, `${base()}/newsletter/unsubscribe`) });
    return 1;
  }
  const db = serviceClient();
  const { data: subs, error } = await db.from("subscribers").select("email, token").is("unsubscribed_at", null);
  if (error) throw new Error(error.message);
  for (let i = 0; i < subs.length; i += 100) {
    await resend(
      "/emails/batch",
      subs.slice(i, i + 100).map((s) => ({
        from: from(),
        to: s.email,
        subject,
        html: render(subject, body, unsubUrl(s.token)),
        headers: { "List-Unsubscribe": `<${unsubUrl(s.token)}>`, "List-Unsubscribe-Post": "List-Unsubscribe=One-Click" },
      })),
    );
  }
  await db.from("newsletters").insert({ subject, body, sent_to: subs.length, sent_by: sentBy });
  return subs.length;
}

export async function welcome(email: string, token: string) {
  await resend("/emails", {
    from: from(),
    to: email,
    subject: "You’re on the list",
    html: render(
      "You’re on the list.",
      "Thank you for signing up. We write only when there’s something worth knowing: a new drop, the last metres of a fabric, or a piece back in stock.\n\nNo more than once or twice a month.",
      unsubUrl(token),
    ),
  }).catch((e) => console.error("welcome email", e));
}
