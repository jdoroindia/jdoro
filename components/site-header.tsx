"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Wordmark } from "@/components/wordmark";
import { useFittingRoom } from "@/lib/fitting-room";
import { nav } from "@/lib/site";
import { cx } from "@/lib/cx";

export function SiteHeader() {
  const { items, ready } = useFittingRoom();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const count = ready ? items.length : 0;

  const linkCls = (href: string) =>
    cx("cap link-draw py-2 transition-colors hover:text-bur", pathname === href && "text-bur");

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bone/90 backdrop-blur-md">
      <div className="announce bg-bur text-center text-shell">
        <p className="cap py-2 text-[0.625rem]">Drop 01 is live · Made to order in India · Style it in the Fitting Room</p>
      </div>
      <div className="mx-auto grid max-w-[88rem] grid-cols-[1fr_auto_1fr] items-center px-5 py-4 md:px-10">
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
          className="cap justify-self-start py-2 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>

        <Link href="/" aria-label="JD’ORO home" onClick={() => setOpen(false)}>
          <Wordmark size="lg" priority className="h-7 w-auto md:h-9" />
        </Link>

        <nav className="flex items-center justify-end gap-8" aria-label="Site">
          {nav.right.map((l) => (
            <Link key={l.href} href={l.href} className={cx(linkCls(l.href), "hidden md:inline-block")}>
              {l.label}
            </Link>
          ))}
          <Link
            href="/fitting-room"
            className={cx(linkCls("/fitting-room"), "whitespace-nowrap")}
            onClick={() => setOpen(false)}
          >
            <span className="hidden sm:inline">Fitting Room </span>
            <span className="sm:hidden">Look </span>({count})
          </Link>
        </nav>
      </div>

      {open && (
        <nav id="mobile-nav" className="border-t border-line bg-bone px-5 pb-8 pt-4 md:hidden" aria-label="Mobile">
          {[...nav.left, ...nav.right, { label: "Fitting Room", href: "/fitting-room" }].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block border-b border-line py-4 font-display text-2xl text-bur"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
