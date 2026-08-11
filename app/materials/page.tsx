import type { Metadata } from "next";
import { FactList, PageHero } from "@/components/page-hero";
import { Media } from "@/components/media";
import { Reveal } from "@/components/reveal";
import {
  ArrowLink,
  ColumnPair,
  Prose,
  PullQuote,
  Receipts,
  SectionHead,
  ShortAnswer,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "The fabric we use",
  description:
    "Surplus fabric first, natural fibres second, nothing synthetic unless the construction demands it. What each fibre does, and how we choose between them.",
  alternates: { canonical: "/materials" },
};

const fibres = [
  {
    heading: "Cotton",
    body: "Handloom and mill-woven, from 85 gsm shirting to 320 gsm twill. It takes a press, it washes indefinitely, and it gets better in the hand for the first ten washes. Our default for anything worn against the skin.",
  },
  {
    heading: "Linen",
    body: "Strongest when wet, which is why it survives washing better than almost anything. It creases, and we do not treat that as a fault to be chemically corrected. Heavier weights hang instead of clinging.",
  },
  {
    heading: "Mulberry silk",
    body: "Used where a piece needs to move — bias cuts, slips, linings. Cool in Indian summers despite the reputation. Hand wash cold; it dislikes heat and alkaline soap more than it dislikes water.",
  },
  {
    heading: "Hemp",
    body: "Grows without irrigation or pesticide and produces a fibre closer to linen than to canvas once it has been washed a few times. We blend it with cotton for softness while keeping the weight.",
  },
  {
    heading: "Bamboo",
    body: "Only mechanically processed or lyocell-route bamboo, never the viscose route, which uses carbon disulphide. Used sparingly, for jersey and lining where drape matters more than structure.",
  },
  {
    heading: "Wool",
    body: "Surplus suiting, almost always. It is the fibre with the longest wearable life of anything we handle, it resists creasing without treatment, and it needs cleaning far less often than people assume.",
  },
];

export default function MaterialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Materials"
        title="Two rules about fabric, and one exception we declare."
        lede="Surplus fabric wherever it exists. Natural fibre where it does not. Nothing synthetic unless a component has no natural equivalent — and when that happens, the product page names it."
        aside={
          <FactList
            items={[
              { term: "First choice", detail: "Surplus and deadstock rolls, bought whole" },
              { term: "Second choice", detail: "Cotton, linen, silk, hemp, bamboo, wool" },
              { term: "Never", detail: "Polyester, nylon, acrylic, or recycled plastic sold as virtue" },
              { term: "Declared exception", detail: "Technical components with no natural equivalent, named on the piece" },
            ]}
          />
        }
      />

      <section className="hairline-t bg-bone">
        <Receipts
          items={[
            {
              figure: "1st",
              label: "Surplus, always",
              note: "Finished, inspected fabric that already exists. We buy the roll whole, at whatever length it happens to be.",
            },
            {
              figure: "2nd",
              label: "Natural fibre",
              note: "When nothing surplus suits the garment, we buy new — and only fibres that grew.",
            },
            {
              figure: "0",
              label: "Synthetics by choice",
              note: "No polyester, no nylon, no acrylic. The only exceptions are declared on the product page.",
            },
          ]}
        />
      </section>

      <section className="hairline-t bg-paper">
        <div className="shell grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <Reveal>
              <SectionHead
                eyebrow="How we choose"
                title="The garment decides the fabric, not the other way round."
              />
            </Reveal>
            <Reveal delay={100}>
              <Prose className="mt-10">
                <p>
                  Every piece is drawn for one weight and one behaviour. A wide
                  trouser needs enough mass to fall in a straight line; a bias slip
                  needs a fabric that will move under its own weight. Get that
                  wrong and no amount of good sewing rescues it.
                </p>
                <p>
                  So we start from the roll. When something arrives on the shelf, we
                  handle it, hang a metre of it overnight, wash a sample, press it,
                  and then decide what it wants to become. That is the reverse of
                  how most collections are made, where a design is drawn first and a
                  fabric found to approximate it.
                </p>
                <p>
                  It also means we cannot promise you a specific piece in a specific
                  fabric forever. What we can promise is that we will not
                  approximate. If the right fabric is gone, the piece retires.
                </p>
              </Prose>
            </Reveal>

            <Reveal delay={160}>
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
                <ArrowLink href="/deadstock">Why surplus fabric matters</ArrowLink>
                <ArrowLink href="/craftsmanship">How it is then built</ArrowLink>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal delay={120}>
              <Media
                texture="weave"
                tone="shell"
                ratio="4 / 5"
                caption="Fabric library: samples washed, pressed and pinned to card with the mill weight and behaviour noted."
              />
            </Reveal>
            <Reveal delay={200}>
              <PullQuote className="mt-12">
                We wash a sample before we draw anything. A fabric tells you what
                it will become after its first wash, not before.
              </PullQuote>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="hairline-t bg-bone">
        <div className="shell py-20 md:py-28">
          <Reveal>
            <SectionHead
              eyebrow="The fibres"
              title="Six materials, and what each one is actually for."
              lede="Not a list of virtues. A list of behaviours, so you can tell whether a piece suits the way you live."
            />
          </Reveal>
          <Reveal delay={120}>
            <ColumnPair className="mt-14" items={fibres} />
          </Reveal>
        </div>
      </section>

      <section id="trims" className="hairline-t bg-paper scroll-mt-32">
        <div className="shell grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal>
              <Media
                texture="seed"
                tone="shell"
                ratio="1 / 1"
                caption="Sorting: reclaimed horn and shell buttons graded into matched sets, six at a time."
              />
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={100}>
              <SectionHead
                eyebrow="Trims and hardware"
                title="Buttons, buckles and metal that have already had one life."
                lede="A jacket needs six buttons that agree with each other. Ordering them new takes ten minutes. We do it the slow way, and not for sentimental reasons."
              />
            </Reveal>

            <Reveal delay={160}>
              <div className="mt-10">
                <ShortAnswer
                  question="Where the trims come from"
                  answer="Retired tailors' chests, closing haberdashers, thrift markets, and deadstock trim lots."
                >
                  <p>
                    We buy in bulk and unsorted, then grade by material, diameter,
                    hole count and shank. A matched set of six horn buttons can take
                    a week to assemble out of a bowl of two hundred, because horn is
                    never uniform.
                  </p>
                </ShortAnswer>

                <ShortAnswer
                  question="Why reclaimed rather than new"
                  answer="Real horn, shell and brass age at the same rate as good fabric. Moulded polyester does not."
                >
                  <p>
                    Most new buttons are polyester made to resemble horn. They are
                    dimensionally perfect and they wear badly: the coating hazes and
                    the edges chip pale, so within two years they no longer match the
                    garment they were sewn to.
                  </p>
                </ShortAnswer>

                <ShortAnswer
                  question="What happens when you lose one"
                  answer="Write to us. We keep the remainder of every set we have used."
                >
                  <p>
                    Each run is logged against its button set, and the leftovers are
                    kept in labelled tins. If we genuinely cannot match it, we will
                    replace the full set rather than leave you with five that agree
                    and one that does not.
                  </p>
                </ShortAnswer>

                <ShortAnswer
                  question="Zips, elastic and thread"
                  answer="Deadstock where possible. Where not, this is where our declared exception usually sits."
                >
                  <p>
                    There is no natural-fibre zip. Where a piece needs one, we use
                    deadstock metal zips, and if none exist in the right length we
                    use a new metal zip on a polyester tape and say so on the product
                    page. Most of our pieces avoid the problem by not having a zip at
                    all — ties, hooks and wraps instead.
                  </p>
                </ShortAnswer>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
