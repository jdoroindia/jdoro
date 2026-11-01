"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { browserClient } from "@/lib/supabase/browser";
import { Wordmark } from "@/components/wordmark";
import { useFittingRoom } from "@/lib/fitting-room";
import { useWishlist } from "@/lib/wishlist";
import { nav } from "@/lib/site";
import { cx } from "@/lib/cx";

export function SiteHeader() {
  const { items, ready } = useFittingRoom();
  const wish = useWishlist();
  const saved = wish.ready ? wish.slugs.length : 0;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Shows "Admin" only to signed-in admins. The admins table only returns a row to an admin (RLS).
  useEffect(() => {
    const sb = browserClient();
    sb.auth.getUser().then(async ({ data }) => {
      if (!data.user) return;
      const { data: row } = await sb.from("admins").select("email").limit(1).maybeSingle();
      setIsAdmin(Boolean(row));
    });
  }, []);
  const count = ready ? items.length : 0;

  const linkCls = (href: string) =>
    cx("cap link-draw inline-flex min-h-11 items-center py-2 transition-colors hover:text-bur", pathname === href && "text-bur");

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bone/90 backdrop-blur-md">
      <div className="announce bg-bur text-center text-shell">
        <p className="cap truncate px-3 py-2 text-[0.625rem]">
          Drop 01 is live<span className="hidden sm:inline"> · Made to order in India · Free shipping</span>
          <span className="sm:hidden"> · Made to order</span>
        </p>
      </div>
      <div className="mx-auto grid max-w-[88rem] grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center px-5 py-4 md:px-10">
        <nav className="hidden items-center gap-8 md:flex" aria-label="Shop">
          {nav.left.map((l) => (
            <Link key={l.href} href={l.href} className={linkCls(l.href)}>
              {l.label}
              {l.dot && <span className="ml-1.5 inline-block size-1.5 rounded-full bg-berry align-middle" />}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className="cap -ml-2 min-h-11 justify-self-start px-2 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>

        <Link href="/" aria-label="JD’ORO home" onClick={() => setOpen(false)}>
          <Wordmark size="lg" priority className="h-7 w-auto md:h-9" />
        </Link>

        <nav className="flex min-w-0 items-center justify-end gap-3 md:gap-8" aria-label="Site">
          <Link href="/search" aria-label="Search" className="-m-1 max-md:hidden grid min-h-11 min-w-9 place-items-center hover:text-bur">
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden><path d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Zm5.3-2.2L21 21" /></svg>
          </Link>
          <Link href="/wishlist" aria-label={`Wishlist (${saved})`} className="relative -m-1 max-md:hidden grid min-h-11 min-w-9 place-items-center hover:text-bur">
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden><path d="M12 20.5s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.9c0 5.4-7.5 10-7.5 10Z" /></svg>
            {saved > 0 && <span className="absolute right-0 top-1.5 grid size-4 place-items-center rounded-full bg-bur text-[0.5625rem] text-shell">{saved}</span>}
          </Link>
          {nav.right.map((l) => (
            <Link key={l.href} href={l.href} className={cx(linkCls(l.href), "max-md:hidden")}>
              {l.label}
            </Link>
          ))}
          <Link
            href="/fitting-room"
            className={cx(linkCls("/fitting-room"), "gap-1 whitespace-nowrap")}
            onClick={() => setOpen(false)}
          >
            <span>Bag</span><span>({count})</span>
          </Link>
        </nav>
      </div>

      {open && (
        <nav id="mobile-nav" className="border-t border-line bg-bone px-5 pb-8 pt-4 md:hidden" aria-label="Mobile">
          {[...nav.left, ...nav.right, { label: saved ? `Wishlist (${saved})` : "Wishlist", href: "/wishlist" }, { label: "Search", href: "/search" }, { label: "Bag", href: "/fitting-room" }, ...(isAdmin ? [{ label: "Admin", href: "/admin" }] : [])].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex min-h-14 items-center border-b border-line font-display text-2xl text-bur"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
