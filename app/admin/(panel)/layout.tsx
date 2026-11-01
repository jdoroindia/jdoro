import Link from "next/link";
import { redirect } from "next/navigation";
import { currentAdmin } from "@/lib/supabase/server";
import { signOut } from "../actions";

export const metadata = { robots: { index: false } };

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const email = await currentAdmin();
  if (!email) redirect("/admin/login");

  return (
    <div className="mx-auto max-w-5xl px-5 py-8 md:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
        <nav className="flex gap-6 text-[0.875rem]">
          <Link href="/admin/orders" className="link-draw">Orders</Link>
          <Link href="/admin" className="link-draw">Products</Link>
          <Link href="/admin/products/new" className="link-draw">+ New piece</Link>
          <Link href="/admin/drop" className="link-draw">Drop text</Link>
          <Link href="/admin/newsletter" className="link-draw">Newsletter</Link>
          <Link href="/" target="_blank" className="link-draw text-ash">View site ↗</Link>
        </nav>
        <form action={signOut} className="flex items-center gap-3 text-[0.75rem] text-ash">
          <span className="hidden sm:inline">{email}</span>
          <button className="underline underline-offset-2 hover:text-ink">Sign out</button>
        </form>
      </div>
      <div className="pt-8">{children}</div>
    </div>
  );
}
