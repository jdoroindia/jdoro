import Link from "next/link";
import { redirect } from "next/navigation";
import { currentAdmin } from "@/lib/supabase/server";
import { signOut } from "../actions";

export const metadata = { robots: { index: false } };

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const email = await currentAdmin();
  if (!email) redirect("/admin/login");

  return (
    <div className="mx-auto max-w-5xl px-4 py-5 md:px-8 md:py-8">
      <div className="border-b border-line pb-2 md:flex md:items-center md:justify-between md:gap-4 md:pb-4">
        <nav className="no-scrollbar -mx-4 flex gap-1 overflow-x-auto px-4 text-[0.875rem] md:mx-0 md:gap-6 md:px-0">
          <Link href="/admin/orders" className="link-draw inline-flex min-h-11 shrink-0 items-center whitespace-nowrap px-2 md:px-0">Orders</Link>
          <Link href="/admin" className="link-draw inline-flex min-h-11 shrink-0 items-center whitespace-nowrap px-2 md:px-0">Products</Link>
          <Link href="/admin/products/new" className="link-draw inline-flex min-h-11 shrink-0 items-center whitespace-nowrap px-2 md:px-0">+ New piece</Link>
          <Link href="/admin/drop" className="link-draw inline-flex min-h-11 shrink-0 items-center whitespace-nowrap px-2 md:px-0">Drop text</Link>
          <Link href="/admin/newsletter" className="link-draw inline-flex min-h-11 shrink-0 items-center whitespace-nowrap px-2 md:px-0">Newsletter</Link>
          <Link href="/" target="_blank" className="link-draw inline-flex min-h-11 shrink-0 items-center whitespace-nowrap px-2 md:px-0 text-ash">View site ↗</Link>
        </nav>
        <form action={signOut} className="mt-1 flex items-center justify-between gap-3 text-[0.75rem] text-ash md:mt-0">
          <span className="truncate">{email}</span>
          <button className="min-h-11 shrink-0 underline underline-offset-2 hover:text-ink">Sign out</button>
        </form>
      </div>
      <div className="pt-6 md:pt-8">{children}</div>
    </div>
  );
}
