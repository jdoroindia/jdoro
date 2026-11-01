"use server";

import { site } from "@/lib/site";

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

/** Forwards the contact form to the studio inbox through Resend. Reply goes straight to the customer. */
export async function sendContact(f: { name: string; email: string; subject: string; message: string; measurements: string; company: string }) {
  if (f.company) return { ok: true }; // spam bot
  const name = f.name.trim().slice(0, 120);
  const email = f.email.trim().slice(0, 200);
  const message = f.message.trim().slice(0, 5000);
  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return { ok: false, error: "Add your name, a valid email and a message." };
  const key = process.env.RESEND_API_KEY;
  if (!key) return { ok: false, error: `Messages aren’t switched on yet. Email us at ${site.contact.email}.` };

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM ?? "JD’ORO <onboarding@resend.dev>",
      to: site.contact.email,
      reply_to: email,
      subject: `Website message: ${f.subject.slice(0, 80)} · ${name}`,
      html: `<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6">
        <p><b>From:</b> ${esc(name)} &lt;${esc(email)}&gt;<br><b>About:</b> ${esc(f.subject)}${f.measurements.trim() ? `<br><b>Bust, waist, hip:</b> ${esc(f.measurements.trim())}` : ""}</p>
        <p style="white-space:pre-wrap">${esc(message)}</p>
        <p style="color:#888">Reply to this email to answer ${esc(name.split(" ")[0])} directly.</p></div>`,
    }),
  });
  if (!res.ok) return { ok: false, error: `Couldn’t send just now. Email us at ${site.contact.email}.` };
  return { ok: true };
}
