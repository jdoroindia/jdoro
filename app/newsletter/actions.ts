"use server";

import { welcome } from "@/lib/newsletter";
import { serviceClient } from "@/lib/supabase/service";

export async function subscribe(_: unknown, form: FormData) {
  // Honeypot: bots fill every field, people never see this one.
  if (String(form.get("company") ?? "")) return { ok: true, message: "You’re on the list." };
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 200) return { ok: false, message: "Enter a valid email." };

  const db = serviceClient();
  const { data: existing } = await db.from("subscribers").select("token, unsubscribed_at").eq("email", email).maybeSingle();
  if (existing && !existing.unsubscribed_at) return { ok: true, message: "You’re already on the list." };

  const { data, error } = existing
    ? await db.from("subscribers").update({ unsubscribed_at: null }).eq("email", email).select("token").single()
    : await db.from("subscribers").insert({ email, source: String(form.get("source") ?? "site").slice(0, 40) }).select("token").single();
  if (error || !data) return { ok: false, message: "Something went wrong. Try again." };
  await welcome(email, data.token);
  return { ok: true, message: "You’re on the list. Check your inbox." };
}
