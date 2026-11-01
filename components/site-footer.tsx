import Link from "next/link";
import { Newsletter } from "@/components/newsletter";
import { Wordmark } from "@/components/wordmark";
import { footerNav, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-shell">
      <div className="mx-auto grid max-w-[88rem] gap-12 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:px-10 md:py-20">
        <div>
          <Wordmark tone="paper" size="xl" className="h-14 w-auto md:h-16" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-shell/70">
            Small drops, made to order in rare-run fabrics by {site.founder}.
          </p>
          <div className="mt-8">
            <p className="cap mb-2 text-clay">Hear about the next drop</p>
            <Newsletter tone="dark" source="footer" />
          </div>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-3">
          {footerNav.map((l) => (
            <Link key={l.href} href={l.href} className="cap link-draw w-fit py-1.5 text-shell/80 hover:text-shell">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="space-y-3 text-sm text-shell/80">
          <p className="cap text-clay">Say hello</p>
          <a className="link-draw block w-fit" href={`mailto:${site.contact.email}`}>
            {site.contact.email}
          </a>
          <a className="link-draw block w-fit" href={`https://wa.me/${site.contact.whatsapp}`}>
            WhatsApp {site.contact.phone}
          </a>
          {site.social.map((s) => (
            <a key={s.href} className="link-draw block w-fit" href={s.href} target="_blank" rel="noreferrer">
              {s.label}
            </a>
          ))}
        </div>
      </div>
      <div className="border-t border-line-dark">
        <p className="cap mx-auto max-w-[88rem] px-5 py-5 text-[0.625rem] text-shell/50 md:px-10">
          © {new Date().getFullYear()} {site.legalName} · Made in {site.madeIn}
        </p>
      </div>
    </footer>
  );
}
