import Link from "next/link";
import {
  ArrowLink,
  ButtonLink,
  Contrast,
  Eyebrow,
  Marker,
  PullQuote,
  Receipts,
  SectionHead,
} from "@/components/ui";
import { Media } from "@/components/media";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { WordmarkDisplay } from "@/components/wordmark";
import { buttons, trust, ways } from "@/lib/microcopy";
import { featured } from "@/lib/products";
import { journal, formatEntryDate } from "@/lib/journal";
import { photos } from "@/lib/images";
import { site } from "@/lib/site";

export default function HomePage() {
  const entries = journal.slice(0, 3);

  return (
    <>
      {/* ---------------------------------------------------------------- Hero */}
      <section className="bg-bone">
        <div className="shell grid gap-12 pb-16 pt-14 md:pb-24 md:pt-20 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6 lg:pr-8">
            <Reveal>
              <Eyebrow>Surplus fabric · Made in {site.madeIn}</Eyebrow>
              <h1 className="type-hero mt-7 text-ink">
                Fewer clothes,
                <br />
                made far better.
              </h1>
            </Reveal>

            <Reveal delay={140}>
              <p className="type-lede mt-8 max-w-lg">{site.standfirst}</p>
            </Reveal>

            <Reveal delay={220}>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
                <ButtonLink href="/collection">
                  {buttons.viewCollection}
                </ButtonLink>
                <ArrowLink href="/made-to-order">How ordering works</ArrowLink>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <dl className="mt-14 grid max-w-lg grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-8">
                <div>
                  <dt className="eyebrow">{ways.readyLabel}</dt>
                  <dd className="type-caption mt-2">{ways.readyLine}</dd>
                </div>
                <div>
                  <dt className="eyebrow">{ways.measureLabel}</dt>
                  <dd className="type-caption mt-2">{ways.measureLine}</dd>
                </div>
              </dl>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={180}>
              <Media
                src={photos.hero}
                alt="Woman in neutral tailoring, editorial studio portrait"
                ratio="4 / 5"
                priority
                sizes="(min-width: 1024px) 48vw, 100vw"
                caption="Campaign, opening frame: oversized tailoring, afternoon light."
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ Receipts */}
      <section className="hairline-t bg-bone" aria-label="How we work, in numbers">
        <Receipts
          items={[
            {
              figure: "100%",
              label: "Surplus or natural fabric",
              note: "Left behind by mills and fashion houses. Where none suits the garment, natural fibres — never synthetics.",
            },
            {
              figure: "8–30",
              label: "Garments per roll",
              note: "When the roll is used up, the garment is retired. We do not remake it in another fabric.",
            },
            {
              figure: "2",
              label: "Ways to have it",
              note: "Take a finished piece, sent in two working days. Or cut to your measurements in three to five weeks.",
            },
            {
              figure: "1",
              label: "Free alteration, first year",
              note: "Bodies change. Seams carry allowance to be let out twice, and hems are left deep on purpose.",
            },
          ]}
        />
      </section>

      {/* ---------------------------------------------------------- Collection */}
      <section className="hairline-t bg-paper">
        <div className="shell py-20 md:py-28">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead
              eyebrow="The collection"
              title="Four pieces, and what is left of each fabric."
              lede="Every piece names the roll it came from. When that roll is finished, the piece goes with it."
            />
            <ArrowLink href="/collection" className="mb-2">
              {buttons.viewAll}
            </ArrowLink>
          </Reveal>

          <div className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product, index) => (
              <Reveal key={product.slug} delay={index * 90}>
                <ProductCard
                  product={product}
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- The fabric */}
      <section className="hairline-t bg-bone">
        <div className="shell grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal>
              <Media
                src={photos.fabricRolls}
                alt="Fabric rolls stacked on a wooden shelf, chalked with metres remaining"
                ratio="4 / 5"
                caption="The shelf: surplus rolls, each one chalked with the metres remaining."
              />
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 lg:pt-8">
            <Reveal delay={120}>
              <SectionHead
                eyebrow="Where the fabric comes from"
                title="The industry makes more fabric than it uses. We start there."
                lede="Mills weave more than the order calls for. Collections get cancelled after the fabric is finished. Houses over-buy and hold the remainder for years. All of it is finished, inspected cloth with nowhere to go."
              />
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-10 space-y-7">
                <p className="type-body">
                  We buy those part-rolls, one at a time, in whatever quantity
                  exists. That is the constraint the whole house is built around:
                  a roll of 40 metres makes about fifteen trousers, so fifteen is
                  the run. There is no version of this where we make two hundred.
                </p>
                <p className="type-body">
                  When nothing surplus suits a garment — the wrong weight, the
                  wrong handle, the wrong width — we buy new, and only ever
                  cotton, silk, linen, hemp or bamboo. No polyester, no nylon, no
                  recycled plastic dressed up as a virtue. The single exception is
                  a technical component with no natural equivalent, and when that
                  happens the product page names it.
                </p>
              </div>
            </Reveal>

            <Reveal delay={260}>
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
                <ArrowLink href="/materials">The fabric we use</ArrowLink>
                <ArrowLink href="/deadstock">Why surplus fabric matters</ArrowLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- Three counts */}
      <section className="hairline-t bg-paper">
        <div className="shell grid gap-10 py-16 md:grid-cols-3 md:py-20">
          {[
            {
              index: "01",
              label: "The fabric",
              body:
                "Surplus rolls left behind by mills and fashion houses. When none suits the garment, natural fibres and nothing else.",
            },
            {
              index: "02",
              label: "The making",
              body:
                "A handful of garments per roll. We hold fabric back so the piece can still be cut to your measurements later.",
            },
            {
              index: "03",
              label: "The wearing",
              body:
                "Seams that can be let out, hems deep enough to change, and repairs for as long as you keep it.",
            },
          ].map((item, index) => (
            <Reveal key={item.index} delay={index * 110}>
              <Marker index={item.index} label={item.label} />
              <p className="type-body mt-6">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------ The price ask */}
      <section className="bg-umber text-paper">
        <div className="shell grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow className="text-paper/50">On what it costs</Eyebrow>
              <h2 className="type-display mt-7 text-paper">
                It costs more because more of it is work.
              </h2>
              <p className="type-body mt-7 text-paper/65">
                Most clothing is priced down to a target and built backwards from
                there. We price up from what the garment takes: the fabric, the
                hours, the allowances we leave in, the repairs we expect to make.
              </p>
            </Reveal>

            <Reveal delay={140}>
              <div className="mt-10">
                <ArrowLink href="/craftsmanship" tone="paper">
                  How a piece is built
                </ArrowLink>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={100}>
              <Contrast
                headings={["The usual way", "How we do it"]}
                rows={[
                  [
                    "Hems folded once, about a centimetre. Shortened once, never lengthened.",
                    "Hems left 5–6 cm deep, so the length can change twice in the garment's life.",
                  ],
                  [
                    "Side seams cut with 1 cm allowance. No room to adjust.",
                    "4 cm at the side seams, enough to be let out twice as a body changes.",
                  ],
                  [
                    "Fronts and collars fused with glue, which bubbles after a few cleans.",
                    "Woven cotton interlining, stitched in. It softens rather than failing.",
                  ],
                  [
                    "Buttons moulded from polyester to resemble horn or shell.",
                    "Reclaimed horn, shell and brass, graded into matched sets by hand.",
                  ],
                  [
                    "Repairs are not offered. The garment is designed to be replaced.",
                    "Repairs offered for as long as you own it, at cost.",
                  ],
                ]}
                className="border-paper/20 [&_p]:text-paper/70 [&_p:last-child]:text-paper [&>div]:border-paper/15"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- Made to order */}
      <section className="hairline-t bg-bone">
        <div className="shell grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <Reveal>
              <SectionHead
                eyebrow={ways.chooseHeading}
                title="Take the one that exists, or have it cut for you."
                lede={ways.chooseNote}
              />
            </Reveal>

            <Reveal delay={140}>
              <div className="mt-12 grid gap-10 sm:grid-cols-2">
                <div className="border-t border-line pt-6">
                  <p className="eyebrow text-oro">{ways.readyLabel}</p>
                  <p className="type-body mt-4">
                    A piece from the cut run, in the sizes we made. Packed and
                    sent within two working days, returnable unworn for fourteen.
                  </p>
                  <p className="type-caption mt-4">{trust.readyLeadTime}</p>
                </div>
                <div className="border-t border-line pt-6">
                  <p className="eyebrow text-oro">{ways.measureLabel}</p>
                  <p className="type-body mt-4">
                    Your measurements, cut from what remains of the same roll.
                    Three to five weeks, one free alteration once it arrives.
                  </p>
                  <p className="type-caption mt-4">{trust.measureLeadTime}</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-12">
                <ButtonLink href="/made-to-order" variant="outline">
                  Read how ordering works
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal delay={160}>
              <Media
                src={photos.fitting}
                alt="Dress form with a pinned bodice in the workroom"
                ratio="3 / 4"
                caption="The workroom: a bodice pinned to the stand before the first seam is stitched."
              />
            </Reveal>
            <Reveal delay={240}>
              <PullQuote attribution={`${site.founder}, founder`} className="mt-12">
                We would rather make eleven of something properly than two
                hundred of it quickly.
              </PullQuote>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- The journal */}
      <section className="hairline-t bg-paper">
        <div className="shell py-20 md:py-28">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead
              eyebrow="The journal"
              title="Notes from the workroom."
              lede="What we found, what it cost, and how it was made. Specifics rather than sentiment."
            />
            <ArrowLink href="/journal" className="mb-2">
              All entries
            </ArrowLink>
          </Reveal>

          <div className="mt-14 grid gap-x-6 gap-y-12 md:grid-cols-3">
            {entries.map((entry, index) => (
              <Reveal key={entry.slug} delay={index * 100}>
                <Link href={`/journal/${entry.slug}`} className="group block">
                  <Media
                    src={entry.image}
                    alt={entry.title}
                    texture={entry.texture}
                    tone={entry.tone}
                    ratio="4 / 3"
                    showCaption={false}
                    sizes="(min-width: 768px) 30vw, 100vw"
                  />
                  <p className="eyebrow mt-5">
                    {entry.category}
                    <span className="text-mist">
                      {" "}
                      · {formatEntryDate(entry.date)}
                    </span>
                  </p>
                  <h3 className="type-subtitle mt-3 text-ink transition-colors duration-500 ease-editorial group-hover:text-oro">
                    {entry.title}
                  </h3>
                  <p className="type-caption mt-3">{entry.standfirst}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ Signature */}
      <section className="hairline-t bg-bone">
        <div className="shell flex flex-col items-center py-20 text-center md:py-28">
          <Reveal className="w-full max-w-2xl">
            <WordmarkDisplay />
          </Reveal>
          <Reveal delay={160}>
            <p className="type-subtitle mt-10 max-w-md text-ash">
              {site.closingLine}
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-10">
              <ButtonLink href="/collection">{buttons.viewCollection}</ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
