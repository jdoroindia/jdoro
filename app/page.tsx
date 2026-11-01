import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { Newsletter } from "@/components/newsletter";
import { Reveal } from "@/components/reveal";
import { getDrop, getProducts } from "@/lib/catalog";
import { site } from "@/lib/site";

const ethos = [
  { n: "01", title: "Small drops", body: "Limited runs of a few pieces each, never mass-produced." },
  { n: "02", title: "Made to order", body: "Cut once you order, so nothing sits in a warehouse or goes to waste." },
  { n: "03", title: "Rare-run fabric", body: "Limited rolls of surplus mill fabric. Once a roll is used up, it never comes back." },
];

const ticker = ["For everyone", "Easy shapes", "Buttons with a story", "Rare-run fabric", "Made to order", "Drop 01"];

export default async function Home() {
  const [drop, products] = await Promise.all([getDrop(), getProducts()]);
  return (
    <>
      {/* Hero: full-bleed landscape drop film with the copy laid over it. The film changes every drop. */}
      <section className="relative h-[calc(100svh-6.5rem)] min-h-[34rem] w-full overflow-hidden bg-ink">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/video/hero-poster.jpg"
          aria-label="Paper patterns hanging in the JD’ORO atelier"
        >
          <source src="/video/hero.webm" type="video/webm" />
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />

        <div className="relative mx-auto flex h-full max-w-[88rem] flex-col justify-between px-5 py-10 md:px-10 lg:py-14">
          <p className="cap text-shell/80">
            Drop {drop.number} · {drop.name}
          </p>
          <div>
            <h1 className="font-display text-[clamp(3.5rem,8vw,7.5rem)] font-normal leading-[0.92] text-shell">
              {/* Edited in /admin → Drop text. Each sentence gets its own line. */}
              {(drop.line.match(/[^.!?]+[.!?]*/g) ?? [drop.line]).map((s, i) => (
                <span key={i} className="block">
                  {s.trim()}
                </span>
              ))}
            </h1>
            <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-shell/85">{drop.intro}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/fitting-room" className="btn border-shell bg-shell text-bur hover:border-shell hover:bg-transparent hover:text-shell">
                Shop the drop
              </Link>
              <Link href="/shop" className="btn text-shell hover:bg-shell hover:text-bur">
                Shop all
              </Link>
            </div>
          </div>
          <div className="flex items-end justify-between">
            <a href="#drop" className="cap text-shell/70 hover:text-shell">
              Scroll ↓
            </a>
            <p className="cap hidden text-shell/70 sm:block">From pattern to piece · Atelier film</p>
          </div>
        </div>
      </section>

      {/* Ticker */}
      <div className="overflow-hidden border-b border-line bg-ink py-3 text-shell" aria-hidden>
        <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
          {[...ticker, ...ticker, ...ticker, ...ticker].map((t, i) => (
            <span key={i} className="cap flex items-center gap-10">
              {t} <span className="text-clay">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* The drop */}
      <section id="drop" className="mx-auto max-w-[88rem] scroll-mt-28 px-5 py-20 md:px-10 lg:py-28">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="cap mb-3 inline-block bg-olive px-2.5 py-1.5 text-[0.625rem] text-shell">New drop</span>
            <h2 className="font-display text-[clamp(2.25rem,4vw,3.25rem)] font-normal leading-tight">{drop.name}</h2>
          </div>
          <Link href="/fitting-room" className="btn border-ink bg-ink text-shell hover:bg-bur hover:border-bur">
            View your bag
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-5">
          {products.slice(0, 8).map((p, i) => (
            <Reveal key={p.slug} delay={(i % 4) * 80}>
              <ProductCard product={p} priority={i < 4} showUnisex={false} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Fitting Room promo */}
      <section className="bg-bur text-shell">
        <div className="mx-auto grid max-w-[88rem] items-center gap-12 px-5 py-20 md:px-10 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="cap text-clay">Your bag, laid out</p>
            <h2 className="mt-4 font-display text-[clamp(2.25rem,4vw,3.5rem)] font-normal leading-[1.05]">
              See it together before you pay.
            </h2>
            <p className="mt-5 max-w-md text-[0.9375rem] leading-relaxed text-shell/75">
              Your bag is a styling board. Tap “Add to bag” on any piece, mix tops with jackets, switch colours, swap
              what doesn’t work, then check out the whole outfit at once.
            </p>
            <Link href="/fitting-room" className="btn mt-9 border-shell text-shell hover:bg-shell hover:text-bur">
              Start shopping
            </Link>
          </div>
          <div className="relative h-[24rem] md:h-[28rem]">
            <div className="absolute left-[6%] top-0 aspect-[3/4] w-[48%] -rotate-3 overflow-hidden bg-white shadow-2xl shadow-black/30">
              <Image src="/products/p5.jpg" alt="Patchwork Denim Jacket" fill sizes="25vw" className="object-cover" />
            </div>
            <div className="absolute right-[6%] top-[14%] aspect-[3/4] w-[46%] rotate-2 overflow-hidden bg-white shadow-2xl shadow-black/30">
              <Image src="/products/p4.jpg" alt="Bubble Tie Top" fill sizes="25vw" className="object-cover" />
            </div>
            <span className="cap absolute bottom-6 left-0 bg-bone px-3 py-2 text-[0.625rem] text-ink">
              <b className="text-berry">●</b> Patchwork Denim Jacket · M
            </span>
            <span className="cap absolute right-0 top-2 bg-bone px-3 py-2 text-[0.625rem] text-ink">
              <b className="text-berry">●</b> Bubble Tie Top · Pink · S
            </span>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="mx-auto grid max-w-[88rem] items-center gap-12 px-5 py-20 md:px-10 lg:grid-cols-2 lg:gap-20 lg:py-28">
        <Reveal className="relative aspect-[4/5] overflow-hidden bg-shell">
          <svg className="absolute left-1/2 top-6 w-28 -translate-x-1/2" viewBox="0 0 120 40" fill="none" stroke="#4A1412" strokeWidth="1.5" aria-hidden>
            <path d="M60 14c0-6 7-6 7-11M60 14 6 36h108z" />
          </svg>
          <Image src="/products/p3.jpg" alt="Wave Seam Dress in rust" fill sizes="(min-width:1024px) 45vw, 90vw" className="object-contain px-[16%] pb-[4%] pt-[14%] mix-blend-multiply" />
        </Reveal>
        <Reveal delay={120}>
          <p className="cap text-olive">About us</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,3.6vw,3rem)] font-normal leading-[1.08] text-bur">
            Made by Jahnvi, for anyone who dresses for themselves.
          </h2>
          <p className="mt-5 max-w-md text-[0.9375rem] leading-relaxed text-graphite">
            JD’ORO is a small label by {site.founder}. Every drop starts with a limited roll of fabric and ends when it
            runs out. Pieces are cut to order, finished by hand, and made to be worn on ordinary days.
          </p>
          <Link href="/about" className="btn mt-8 text-ink hover:bg-ink hover:text-shell">
            Read our story
          </Link>
        </Reveal>
      </section>

      {/* Instagram */}
      <section className="border-t border-line bg-shell/60">
        <div className="mx-auto flex max-w-[88rem] flex-wrap items-center justify-between gap-6 px-5 py-12 md:px-10">
          <div>
            <p className="cap text-olive">Follow the drop</p>
            <p className="mt-3 font-display text-[clamp(1.75rem,3vw,2.5rem)] font-normal text-bur">{site.instagram.handle}</p>
          </div>
          <div className="flex w-full max-w-md flex-col gap-4 md:w-auto">
            <Newsletter source="home" />
            <a href={site.instagram.href} target="_blank" rel="noreferrer" className="cap w-fit text-bur underline underline-offset-4">
              Or follow on Instagram ↗
            </a>
          </div>
        </div>
      </section>

      {/* Ethos */}
      <section className="grid border-y border-line md:grid-cols-3">
        {ethos.map((e) => (
          <div key={e.n} className="border-b border-line px-5 py-10 last:border-b-0 md:border-b-0 md:border-r md:px-10 md:py-12 md:last:border-r-0">
            <span className="cap text-olive">{e.n}</span>
            <h3 className="mt-3 font-display text-2xl font-normal">{e.title}</h3>
            <p className="mt-2 text-[0.8125rem] leading-relaxed text-ash">{e.body}</p>
          </div>
        ))}
      </section>
    </>
  );
}
