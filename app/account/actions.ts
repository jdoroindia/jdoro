"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { serverClient } from "@/lib/supabase/server";

export async function sendCustomerLink(_: unknown, form: FormData) {
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return { sent: false, error: "Enter a valid email." };
  const h = await headers();
  const origin = `${h.get("x-forwarded-proto") ?? "http"}://${h.get("host")}`;
  const supabase = await serverClient();
  const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: `${origin}/account/auth/callback` } });
  if (error) return { sent: false, error: error.status === 429 ? "Too many requests. Wait a few minutes and try again." : error.message };
  return { sent: true, error: null };
}

export async function signOutCustomer() {
  const supabase = await serverClient();
  await supabase.auth.signOut();
  redirect("/account");
}
