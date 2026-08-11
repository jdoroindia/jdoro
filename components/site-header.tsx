"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cx } from "@/lib/cx";
import { bag, buttons, trust } from "@/lib/microcopy";
import { primaryNav, site, siteMap } from "@/lib/site";
import { Wordmark } from "@/components/wordmark";
import { Arrow } from "@/components/ui";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close everything when the route changes. */
  useEffect(() => {
    setDrawerOpen(false);
    setOpenGroup(null);
  }, [pathname]);

  /* Hold the page still while the drawer is open. */
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setDrawerOpen(false);
      setOpenGroup(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  return (
    <header
      className="sticky top-0 z-50"
      onMouseLeave={() => setOpenGroup(null)}
    >
      {/* Standing note. Three facts, no slogan. */}
      <div className="bg-umber text-paper/75">
        <div className="shell flex h-9 items-center justify-center overflow-hidden">
          <p className="flex items-center gap-3 truncate text-[0.625rem] uppercase tracking-[0.2em]">
            <span>{trust.runLength}</span>
            <span aria-hidden="true" className="text-oro-soft">
              ·
            </span>
            <span className="hidden sm:inline">{trust.packaging}</span>
          </p>
        </div>
      </div>

      <div
        className={cx(
          "bg-bone/92 backdrop-blur-md transition-shadow duration-500 ease-editorial",
          scrolled ? "border-b border-line shadow-[0_1px_0_0_rgba(27,24,21,0.04)]" : "border-b border-transparent",
        )}
      >
        {/* Row 1 — Logo centred on mobile, left on desktop */}
        <div className="shell flex h-14 items-center justify-between md:h-16">
          <Link
            href="/"
            aria-label={`${site.name} — home`}
            className="shrink-0 transition-opacity duration-500 hover:opacity-70"
          >
            <Wordmark size="md" priority />
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/contact"
              className="hidden text-[0.6875rem] uppercase tracking-[0.2em] text-ink transition-colors duration-500 hover:text-oro md:inline"
            >
              <span className="link-draw">{buttons.bookFitting}</span>
            </Link>
            <Link
              href="/bag"
              className="text-[0.6875rem] uppercase tracking-[0.2em] text-ink transition-colors duration-500 hover:text-oro"
            >
              <span className="link-draw">
                {bag.label} <span aria-hidden="true">(0)</span>
                <span className="sr-only">, empty</span>
              </span>
            </Link>
          </div>
        </div>

        {/* Row 2 — Navigation */}
        <div className="shell flex h-11 items-center gap-6 border-t border-line/60">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-expanded={drawerOpen}
            aria-controls="site-drawer"
            className="group flex items-center gap-3 text-[0.6875rem] uppercase tracking-[0.2em] text-ink transition-colors duration-500 hover:text-oro"
          >
            <span aria-hidden="true" className="flex flex-col gap-[5px]">
              <span className="block h-px w-5 bg-current" />
              <span className="block h-px w-5 bg-current" />
            </span>
            <span className="hidden sm:inline">{buttons.menu}</span>
          </button>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {primaryNav.map((group) => (
                <li key={group.label}>
                  <Link
                    href={group.href}
                    onMouseEnter={() => setOpenGroup(group.label)}
                    onFocus={() => setOpenGroup(group.label)}
                    className={cx(
                      "block py-2 text-[0.6875rem] uppercase tracking-[0.2em] transition-colors duration-500 ease-editorial",
                      isActive(group.href)
                        ? "text-oro"
                        : "text-ink hover:text-oro",
                    )}
                  >
                    <span
                      className={cx(
                        openGroup === group.label || isActive(group.href)
                          ? "link-drawn"
                          : "link-draw",
                      )}
                    >
                      {group.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Desktop panel */}
        <div
          className={cx(
            "hidden overflow-hidden border-line transition-[max-height,opacity] duration-500 ease-editorial lg:block",
            openGroup
              ? "max-h-[26rem] border-t opacity-100"
              : "max-h-0 opacity-0",
          )}
        >
          {primaryNav
            .filter((group) => group.label === openGroup)
            .map((group) => (
              <div key={group.label} className="shell grid grid-cols-12 gap-10 py-10">
                <div className="col-span-3">
                  <p className="eyebrow">{group.label}</p>
                  <p className="type-subtitle mt-4 text-graphite">
                    {panelNote[group.label]}
                  </p>
                </div>
                <ul className="col-span-9 grid grid-cols-3 gap-x-10 gap-y-7">
                  {group.links?.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group block"
                        onClick={() => setOpenGroup(null)}
                      >
                        <span className="flex items-center gap-3 text-sm text-ink transition-colors duration-500 group-hover:text-oro">
                          {link.label}
                          <Arrow className="w-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        </span>
                        {link.note ? (
                          <span className="type-caption mt-1.5 block">
                            {link.note}
                          </span>
                        ) : null}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      </div>

      {/* Drawer — full sitemap, all breakpoints */}
      <div
        id="site-drawer"
        aria-hidden={!drawerOpen}
        className={cx(
          "fixed inset-0 z-50 transition-opacity duration-500 ease-editorial",
          drawerOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <button
          type="button"
          tabIndex={drawerOpen ? 0 : -1}
          aria-label={buttons.close}
          onClick={() => setDrawerOpen(false)}
          className="absolute inset-0 bg-espresso/40 backdrop-blur-sm"
        />
        <div
          className={cx(
            "absolute inset-y-0 left-0 flex w-full max-w-xl flex-col bg-paper transition-transform duration-700 ease-editorial",
            drawerOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex h-16 items-center justify-between border-b border-line px-6 md:h-20 md:px-10">
            <Wordmark size="sm" />
            <button
              type="button"
              tabIndex={drawerOpen ? 0 : -1}
              onClick={() => setDrawerOpen(false)}
              className="text-[0.6875rem] uppercase tracking-[0.2em] text-ink transition-colors duration-500 hover:text-oro"
            >
              <span className="link-draw">{buttons.close}</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-10 md:px-10">
            <ul className="space-y-5">
              {primaryNav.map((group) => (
                <li key={group.label}>
                  <Link
                    href={group.href}
                    tabIndex={drawerOpen ? 0 : -1}
                    className="type-title block text-ink transition-colors duration-500 hover:text-oro"
                  >
                    {group.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-14 grid gap-10 border-t border-line pt-10 sm:grid-cols-2">
              {siteMap.map((column) => (
                <div key={column.heading}>
                  <p className="eyebrow">{column.heading}</p>
                  <ul className="mt-5 space-y-3">
                    {column.links.map((link) => (
                      <li key={`${column.heading}-${link.href}`}>
                        <Link
                          href={link.href}
                          tabIndex={drawerOpen ? 0 : -1}
                          className="text-sm text-graphite transition-colors duration-500 hover:text-oro"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

/** One line of orientation per panel, so the menu reads like the house. */
const panelNote: Record<string, string> = {
  Collection:
    "Small in number. Each piece names the fabric it was cut from, and how much of that fabric is left.",
  "Made to Order":
    "Every piece in the collection can also be cut to your measurements, for as long as the fabric holds out.",
  Materials:
    "Surplus fabric first. Natural fibres next. Nothing synthetic unless the construction demands it.",
  "Our Practice": "How the work is actually done — method, not adjectives.",
  Journal:
    "Fabric we have found, techniques we have kept, and the people who do the work.",
};
