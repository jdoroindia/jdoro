"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { categoryIds, fits, type Colour } from "@/lib/products";
import { currentAdmin, serverClient } from "@/lib/supabase/server";

const allowedEmails = () =>
  (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

export async function sendLoginLink(_: unknown, form: FormData) {
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  // Same reply either way, so the form never reveals who is an admin.
  const ok = { sent: true as const, error: null };
  if (!allowedEmails().includes(email)) return ok;
  const h = await headers();
  const origin = `${h.get("x-forwarded-proto") ?? "http"}://${h.get("host")}`;
  const supabase = await serverClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: `${origin}/admin/auth/callback`, shouldCreateUser: true },
  });
  if (error) return { sent: false as const, error: error.message };
  return ok;
}

export async function signOut() {
  const supabase = await serverClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

async function requireAdmin() {
  if (!(await currentAdmin())) throw new Error("Not signed in as an admin.");
  return serverClient();
}

function refresh() {
  revalidatePath("/", "layout");
}

export type SaveResult = { ok: boolean; error?: string; slug?: string };

export async function saveProduct(input: {
  originalSlug: string | null;
  slug: string;
  name: string;
  price: number;
  category: string;
  fit: string;
  unisex: boolean;
  detail: string;
  description: string;
  fabric: string;
  sizes: string[];
  colours: Colour[];
  pairsWith: string[];
  stock: number;
  published: boolean;
}): Promise<SaveResult> {
  try {
    const supabase = await requireAdmin();
    const slug = input.slug.trim().toLowerCase();
    if (!/^[a-z0-9-]+$/.test(slug)) return { ok: false, error: "Web address can only use a–z, 0–9 and dashes." };
    if (!input.name.trim()) return { ok: false, error: "Add a name." };
    if (!Number.isInteger(input.price) || input.price < 0) return { ok: false, error: "Price must be a whole number of rupees." };
    if (!categoryIds.includes(input.category as never)) return { ok: false, error: "Pick a category." };
    if (!fits.includes(input.fit as never)) return { ok: false, error: "Pick a fit." };
    if (!input.colours.length || input.colours.some((c) => !c.name.trim() || !c.image))
      return { ok: false, error: "Each colour needs a name and a front photo." };
    if (!input.sizes.length) return { ok: false, error: "Pick at least one size." };

    const row = {
      slug,
      name: input.name.trim(),
      price: input.price,
      category: input.category,
      fit: input.fit,
      unisex: input.unisex,
      detail: input.detail.trim(),
      description: input.description.trim(),
      fabric: input.fabric.trim(),
      sizes: input.sizes,
      colours: input.colours.map((c) => ({ name: c.name.trim(), hex: c.hex, image: c.image, ...(c.back ? { back: c.back } : {}) })),
      pairs_with: input.pairsWith.filter((s) => s !== slug),
      stock: Math.max(0, Math.floor(input.stock)),
      published: input.published,
    };

    if (input.originalSlug) {
      const { error } = await supabase.from("products").update(row).eq("slug", input.originalSlug);
      if (error) return { ok: false, error: error.code === "23505" ? "Another piece already uses that web address." : error.message };
    } else {
      const { data: max } = await supabase.from("products").select("sort").order("sort", { ascending: false }).limit(1).maybeSingle();
      const { error } = await supabase.from("products").insert({ ...row, sort: (max?.sort ?? 0) + 1 });
      if (error) return { ok: false, error: error.code === "23505" ? "Another piece already uses that web address." : error.message };
    }
    refresh();
    return { ok: true, slug };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

export async function setPublished(slug: string, published: boolean) {
  const supabase = await requireAdmin();
  await supabase.from("products").update({ published }).eq("slug", slug);
  refresh();
  revalidatePath("/admin");
}

export async function deleteProduct(slug: string) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("products").delete().eq("slug", slug);
  if (error) throw new Error(error.message);
  refresh();
  redirect("/admin");
}

export async function saveDrop(_: unknown, form: FormData) {
  try {
    const supabase = await requireAdmin();
    const row = {
      number: String(form.get("number") ?? "").trim(),
      name: String(form.get("name") ?? "").trim(),
      line: String(form.get("line") ?? "").trim(),
      intro: String(form.get("intro") ?? "").trim(),
    };
    if (!row.number || !row.name) return { ok: false, message: "Drop number and name are needed." };
    const { error } = await supabase.from("drop_settings").update(row).eq("id", 1);
    if (error) return { ok: false, message: error.message };
    refresh();
    return { ok: true, message: "Saved. The site is updated." };
  } catch (e) {
    return { ok: false, message: (e as Error).message };
  }
}
