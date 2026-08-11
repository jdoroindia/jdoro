import Link from "next/link";
import { Newsletter } from "@/components/newsletter";
import { Wordmark } from "@/components/wordmark";
import { legalNav, site, siteMap } from "@/lib/site";
import { forms } from "@/lib/microcopy";

export function SiteFooter() {
  return (
    <footer className="bg-umber text-paper">
      {/* The closing statement. The one place we let the idea sit alone. */}
      <div className="shell border-b border-paper/12 py-20 md:py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p className="eyebrow text-paper/50">The hang tag</p>
            <p className="type-display mt-7 max-w-2xl text-paper">
              By the time your seed grows into a plant, your garment should
              still be part of your wardrobe.
            </p>
            <p className="type-body mt-7 max-w-xl text-paper/65">
              Every piece leaves us with a hang tag pressed from seed paper.
              Soak it, sow it, and keep it watered. It is the only deadline we
              set ourselves: whatever you plant should still be alive alongside
              the garment years from now.
            </p>
          </div>

          <div className="lg:col-span-5 lg:pl-10">
            <p className="eyebrow text-paper/50">{forms.newsletterHeading}</p>
            <p className="type-body mt-5 text-paper/65">{forms.newsletterBody}</p>
            <div className="mt-8">
              <Newsletter tone="dark" />
            </div>
          </div>
        </div>
      </div>

      {/* Sitemap */}
      <div className="shell py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          {siteMap.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <p className="eyebrow text-paper/50">{column.heading}</p>
              <ul className="mt-6 space-y-3.5">
                {column.links.map((link) => (
                  <li key={`${column.heading}-${link.href}`}>
                    <Link
                      href={link.href}
                      className="text-[0.875rem] text-paper/75 transition-colors duration-500 ease-editorial hover:text-oro-soft"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <p className="eyebrow text-paper/50">The atelier</p>
            {site.contact.studio.lines.length ? (
              <address className="mt-6 space-y-1 text-[0.875rem] not-italic text-paper/75">
                {site.contact.studio.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            ) : null}
            <p className="mt-4 text-[0.8125rem] leading-relaxed text-paper/45">
              {site.contact.studio.note}
            </p>
            <div className="mt-6 space-y-2 text-[0.875rem]">
              <a
                href={`mailto:${site.contact.email}`}
                className="block text-paper/75 transition-colors duration-500 hover:text-oro-soft"
              >
                {site.contact.email}
              </a>
              <a
                href={`tel:${site.contact.phoneHref}`}
                className="block text-paper/75 transition-colors duration-500 hover:text-oro-soft"
              >
                {site.contact.phone}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Base */}
      <div className="shell border-t border-paper/12 py-9">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            <Wordmark size="sm" tone="paper" />
            <p className="text-[0.75rem] uppercase tracking-[0.18em] text-paper/40">
              Cut, sewn and finished in {site.madeIn}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
            {site.social.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                rel="noreferrer noopener"
                target="_blank"
                className="text-[0.75rem] uppercase tracking-[0.18em] text-paper/55 transition-colors duration-500 hover:text-oro-soft"
              >
                {channel.label}
              </a>
            ))}
            {legalNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[0.75rem] uppercase tracking-[0.18em] text-paper/40 transition-colors duration-500 hover:text-oro-soft"
              >
                {link.label}
              </Link>
            ))}
            <p className="text-[0.75rem] uppercase tracking-[0.18em] text-paper/30">
              © {new Date().getFullYear()} {site.legalName}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
