import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `JD’ORO is a womenswear label by ${site.founder}: small drops, made to order in rare-run fabrics.`,
  alternates: { canonical: "/about" },
};

const steps = [
  { n: "01", title: "Find the fabric", body: "Each drop starts with limited rolls of surplus mill fabric. When a roll runs out, so does the piece." },
  { n: "02", title: "Draw the details", body: "Smocking, bubble hems, wave seams and buttons collected one card at a time." },
  { n: "03", title: "Cut when you order", body: "Nothing is made ahead. Your piece is cut and finished once you order it." },
];

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto grid max-w-[88rem] items-end gap-10 px-5 pb-16 pt-14 md:px-10 lg:grid-cols-2 lg:pt-20">
        <div>
          <p className="cap text-berry">About us</p>
          <h1 className="mt-4 font-display text-[clamp(2.75rem,6vw,5.25rem)] font-normal leading-[0.95] text-bur">
            Made by Jahnvi, for the girl who dresses up for herself.
          </h1>
        </div>
        <p className="max-w-md text-[0.9375rem] leading-relaxed text-graphite lg:justify-self-end">
          JD’ORO is a small womenswear label by {site.founder}. The clothes are playful in the details and serious in how
          they are made: small drops, cut to order, in rare-run fabrics we buy from mills in small quantities.
        </p>
      </section>

      <section className="relative aspect-[16/9] max-h-[80svh] w-full overflow-hidden bg-shell">
        <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline preload="metadata" poster="/video/hero-poster.jpg" aria-label="Paper patterns in the atelier">
          <source src="/video/hero.webm" type="video/webm" />
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
      </section>

      <section className="grid border-b border-line md:grid-cols-3">
        {steps.map((s) => (
          <div key={s.n} className="border-b border-line px-5 py-12 last:border-b-0 md:border-b-0 md:border-r md:px-10 md:last:border-r-0">
            <span className="cap text-berry">{s.n}</span>
            <h2 className="mt-3 font-display text-2xl font-normal">{s.title}</h2>
            <p className="mt-2 text-[0.875rem] leading-relaxed text-ash">{s.body}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto grid max-w-[88rem] items-center gap-12 px-5 py-20 md:px-10 lg:grid-cols-2 lg:gap-20">
        <Reveal className="grid grid-cols-2 gap-3">
          {["/products/p8.jpg", "/products/p1.jpg"].map((src, i) => (
            <div key={src} className={`relative aspect-[3/4] overflow-hidden border border-line bg-white ${i ? "mt-12" : ""}`}>
              <Image src={src} alt="" fill sizes="25vw" className={i ? "object-cover" : "object-contain p-[8%]"} />
            </div>
          ))}
        </Reveal>
        <Reveal delay={120}>
          <h2 className="font-display text-[clamp(2rem,3.4vw,2.75rem)] font-normal leading-tight text-bur">A note from Jahnvi</h2>
          <p className="mt-5 max-w-md text-[0.9375rem] leading-relaxed text-graphite">
            Placeholder: two or three lines in Jahnvi’s own voice about why JD’ORO exists, what she loves making, and who
            she makes it for.
          </p>
          <Link href="/shop" className="btn mt-8 border-bur bg-bur text-shell hover:border-ink hover:bg-ink">
            Shop the drop
          </Link>
        </Reveal>
      </section>
    </>
  );
}
