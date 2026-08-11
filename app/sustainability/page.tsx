import type { Metadata } from "next";
import Link from "next/link";
import { FactList, PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import {
  ArrowLink,
  Prose,
  PullQuote,
  Receipts,
  SectionHead,
  ShortAnswer,
} from "@/components/ui";
import { Media } from "@/components/media";

export const metadata: Metadata = {
  title: "Our practice",
  description:
    "Every claim we make about how JD’oro is produced, with the method behind it — fabric sourcing, trims, cutting, packaging, repairs, and the things we have not solved.",
  alternates: { canonical: "/sustainability" },
};

const pillars = [
  {
    href: "/materials",
    label: "The fabric we use",
    claim: "Surplus fabric first, natural fibre second, nothing synthetic by choice.",
    method:
      "We buy whole surplus rolls wherever they exist. Where none suits the garment we buy new, and only cotton, silk, linen, hemp, bamboo or wool. Any technical exception is named on the product page it appears on.",
  },
  {
    href: "/deadstock",
    label: "Why surplus matters",
    claim: "Using fabric that already exists removes its material footprint rather than reducing it.",
    method:
      "No new water, dye, energy or land is spent on a roll that has already been woven and finished. What deadstock does not fix is sewing, shipping or how long you keep the garment, which is why the rest of this page exists.",
  },
  {
    href: "/craftsmanship",
    label: "How it is built",
    claim: "Construction is our longevity strategy. Nothing else lasts if the seams do not.",
    method:
      "No fusible interlining, no overlocked raw edges, 4 cm of side-seam allowance and 5–6 cm hems so the garment can be altered twice. One tailor per piece, start to finish.",
  },
  {
    href: "/packaging",
    label: "How it reaches you",
    claim: "Plastic-free from the workroom to your door, including the tape.",
    method:
      "Plant-starch garment bags that compost, unbleached board boxes, paper seals, soy ink, and a hang tag pressed from seed paper you can plant.",
  },
  {
    href: "/care",
    label: "How long it lasts",
    claim: "We repair anything we have made, for as long as you own it.",
    method:
      "One free alteration in the first year, then repairs at cost indefinitely. Every piece is logged against its fabric roll and its button set so we can match both years later.",
  },
];

export default function SustainabilityPage() {
  return (
    <>
      <PageHero
        eyebrow="Our practice"
        title="Every claim on this site, with the method attached."
        lede="You have been told that clothing is sustainable by companies that would not survive the question 'how'. So this page is organised around that question. Each claim below is followed by the specific practice that produces it, and the last section lists what we have not solved."
        aside={
          <FactList
            items={[
              { term: "Material", detail: "Surplus rolls first; natural fibre where none suits" },
              { term: "Production", detail: "Runs of 8–30, decided by the length of the roll" },
              { term: "Waste", detail: "Single-layer cutting; offcuts reused above a hand's width" },
              { term: "Afterlife", detail: "Repairs at cost for as long as you own the piece" },
            ]}
          />
        }
      />

      <section className="hairline-t bg-bone">
        <Receipts
          items={[
            {
              figure: "0 m",
              label: "New fabric woven for us",
              note: "Where surplus exists in the right weight, no fabric is made on our account at all.",
            },
            {
              figure: "8–30",
              label: "Garments per roll",
              note: "Production is capped by material rather than by forecast, so nothing is made to be discounted.",
            },
            {
              figure: "1 layer",
              label: "How we cut",
              note: "Single-layer cutting wastes less than stacked cutting and lets us place patterns around flaws.",
            },
            {
              figure: "∞",
              label: "Repair window",
              note: "We repair what we made for as long as you own it, at cost. No time limit and no receipt required.",
            },
          ]}
        />
      </section>

      <section className="hairline-t bg-paper">
        <div className="shell py-20 md:py-28">
          <Reveal>
            <SectionHead
              eyebrow="Claim and method"
              title="Five claims. Five methods. No adjectives."
            />
          </Reveal>

          <div className="mt-14 hairline-t">
            {pillars.map((pillar, index) => (
              <Reveal key={pillar.href} delay={index * 80}>
                <div className="grid gap-6 border-b border-line py-10 md:grid-cols-12 md:gap-8">
                  <p className="eyebrow text-oro md:col-span-2">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <div className="md:col-span-4">
                    <h3 className="type-subtitle text-ink">{pillar.claim}</h3>
                    <Link
                      href={pillar.href}
                      className="eyebrow mt-5 inline-block text-ink transition-colors duration-500 hover:text-oro"
                    >
                      <span className="link-draw">{pillar.label}</span>
                    </Link>
                  </div>
                  <div className="md:col-span-6">
                    <p className="eyebrow">The method</p>
                    <p className="type-body mt-3">{pillar.method}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-umber text-paper">
        <div className="shell grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="eyebrow text-paper/50">What we have not solved</p>
              <h2 className="type-display mt-7 text-paper">
                The honest list.
              </h2>
              <Prose className="mt-9 [&_p]:text-paper/65">
                <p>
                  A page like this is usually a list of achievements. Ours would be
                  incomplete without the problems, and publishing them is the only
                  way the rest of it stays credible.
                </p>
              </Prose>
            </Reveal>

            <Reveal delay={120}>
              <div className="mt-10 [&_.type-body]:text-paper/65 [&_.type-subtitle]:text-paper [&>div]:border-paper/20">
                <ShortAnswer
                  question="Shipping is not clean"
                  answer="An international parcel flies. There is no version of that with a small footprint."
                >
                  <p className="text-paper/65">
                    We consolidate orders, ship by sea for wholesale, and never
                    offer next-day delivery — a promise that exists only to force
                    air freight. For a single dress to another continent, air is
                    still what happens, and calling it carbon-neutral because we
                    bought an offset would be a claim we cannot substantiate.
                  </p>
                </ShortAnswer>

                <ShortAnswer
                  question="Zips are a genuine gap"
                  answer="There is no natural-fibre zip. Where a piece needs one and no deadstock zip fits, we use new."
                >
                  <p className="text-paper/65">
                    Most of our pieces avoid it by design, using ties, hooks and
                    wraps. When a zip is unavoidable we use metal on the shortest
                    tape available, and the product page says so plainly rather than
                    describing the piece as fully natural.
                  </p>
                </ShortAnswer>

                <ShortAnswer
                  question="We are not certified"
                  answer="Certification is priced for volume, and we do not have the volume."
                >
                  <p className="text-paper/65">
                    Audit schemes cost more per year than several of our production
                    runs are worth, and most certify a supply chain rather than a
                    garment. Instead we publish the method and invite you to the
                    studio. That is weaker as a badge and stronger as evidence.
                  </p>
                </ShortAnswer>

                <ShortAnswer
                  question="Surplus fabric is finite"
                  answer="If demand for it grows enough, it stops being surplus and starts being a product."
                >
                  <p className="text-paper/65">
                    This is the real limit on our model, and we would rather name it
                    than pretend it scales. If deadstock became a commodity woven on
                    purpose, we would be buying new fabric with a better story. At
                    that point we would say so and change what we do.
                  </p>
                </ShortAnswer>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal delay={140}>
              <Media
                texture="roll"
                tone="umber"
                ratio="3 / 4"
                caption="The shelf at the end of a season: what is left, chalked and dated."
              />
            </Reveal>
            <Reveal delay={200}>
              <PullQuote className="mt-12 border-oro-soft/60 [&_blockquote]:text-paper">
                We would rather publish the gaps than be found out having hidden
                them.
              </PullQuote>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="hairline-t bg-bone">
        <div className="shell flex flex-wrap items-center justify-between gap-8 py-14">
          <p className="type-title max-w-xl text-ink">
            Ask us anything about how a piece was made. We will answer with
            specifics or say we do not know.
          </p>
          <ArrowLink href="/contact">Write to the atelier</ArrowLink>
        </div>
      </section>
    </>
  );
}
