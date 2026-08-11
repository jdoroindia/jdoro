import type { Metadata } from "next";
import { FactList, PageHero } from "@/components/page-hero";
import { Media } from "@/components/media";
import { Reveal } from "@/components/reveal";
import {
  ArrowLink,
  ButtonLink,
  Prose,
  PullQuote,
  Receipts,
  SectionHead,
} from "@/components/ui";
import { WordmarkDisplay } from "@/components/wordmark";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our story",
  description:
    "Why JD’oro exists, what it refuses to do, and how a house built around surplus fabric decides what to make.",
  alternates: { canonical: "/story" },
};

export default function StoryPage() {
  return (
    <>
      <PageHero
        eyebrow="The house"
        title="It started with a shelf of fabric nobody was going to use."
        lede="Not with a business plan, a mood board or a gap in the market. With four part-rolls of wool suiting in a mill warehouse that had been sitting there for three years, and the realisation that this was normal."
        aside={
          <FactList
            items={[
              { term: "Founded", detail: `2023, ${site.madeIn}` },
              { term: "Founder", detail: site.founder },
              { term: "Workroom", detail: "Six people, one room, nothing outsourced" },
              { term: "Production", detail: "8–30 garments per fabric roll" },
            ]}
          />
        }
      />

      <section className="hairline-t bg-paper">
        <div className="shell grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <Reveal>
              <Prose>
                <h2>The thing that did not add up</h2>
                <p>
                  The fashion industry commits to fabric months before it commits to
                  a garment. Mills will not weave small quantities, so labels order
                  more than they need. Collections get cancelled after the cloth has
                  already been woven, dyed and finished. Nobody is being careless —
                  it is simply what happens when material decisions run ahead of
                  product decisions.
                </p>
                <p>
                  The result is warehouses of good fabric with nowhere to go. Not
                  offcuts, not seconds. Full rolls, inspected and finished, waiting
                  for a buyer who is never going to arrive.
                </p>
                <p>
                  Meanwhile the same industry was telling everyone to consume more
                  carefully while releasing fifty-two collections a year. The gap
                  between those two facts is where this house sits.
                </p>

                <h2>What we decided not to do</h2>
                <p>
                  We could have designed a collection and then gone looking for
                  fabric to approximate it. Every label does this, and it is why
                  deadstock is usually a footnote rather than a method — you cannot
                  build a repeatable product on material you cannot reorder.
                </p>
                <p>
                  So we inverted it. The fabric comes first. We buy a roll, handle
                  it, wash a sample, hang a metre overnight, and then decide what it
                  wants to become. The roll&apos;s length decides how many we make.
                  When it runs out, the piece retires.
                </p>
                <p>
                  This is commercially inconvenient in every way. We cannot promise a
                  bestseller will return. We cannot scale by making more of what
                  sold. We cannot run a sale, because there is no surplus stock to
                  discount. What we get in exchange is that nothing we make is
                  wasteful by construction rather than by intention.
                </p>
              </Prose>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal delay={100}>
              <Media
                texture="roll"
                tone="shell"
                ratio="3 / 4"
                caption="The first purchase: four part-rolls of wool suiting, three years in storage, bought whole."
              />
            </Reveal>
            <Reveal delay={160}>
              <PullQuote attribution={`${site.founder}, founder`} className="mt-12">
                The fabric was already made. The only question left was whether
                anybody would ever wear it.
              </PullQuote>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="hairline-t bg-bone">
        <Receipts
          items={[
            {
              figure: "2023",
              label: "First run",
              note: "Fifteen jackets from four part-rolls of wool suiting. All fifteen sold before the second roll was found.",
            },
            {
              figure: "6",
              label: "People in the workroom",
              note: "One cutter, four tailors, one presser. Nothing is outsourced and nothing leaves the room unfinished.",
            },
            {
              figure: "0",
              label: "Sales, ever",
              note: "There is no surplus stock to discount, because production is capped by fabric rather than forecast.",
            },
          ]}
        />
      </section>

      <section className="hairline-t bg-paper">
        <div className="shell grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionHead
                eyebrow="What we are competing on"
                title="Not price. Everything that happens after the purchase."
              />
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={100}>
              <Prose>
                <p>
                  We are more expensive than most of what is in a shopping centre,
                  and pretending otherwise would insult your intelligence. A jacket
                  here costs several times what a high-street jacket costs.
                </p>
                <p>
                  The comparison that matters is not the price on the tag but the
                  number of years the garment stays in use, and what it costs you per
                  year of wearing it. A jacket worn for ten years and altered twice
                  is a different purchase from four jackets worn for two seasons
                  each.
                </p>
                <p>
                  That is not a moral argument, it is an arithmetic one, and it is
                  the only claim we make about value. Everything else on this site is
                  about whether the garment can actually survive ten years — the
                  seam allowances, the woven interlinings, the reclaimed horn
                  buttons that age at the same rate as the cloth, the repairs we
                  offer for as long as you own it.
                </p>
                <p>
                  Which is also why we will not run a sale. A discount on a garment
                  built to last a decade would suggest we had priced it wrong in the
                  first place.
                </p>
              </Prose>
            </Reveal>

            <Reveal delay={160}>
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
                <ArrowLink href="/craftsmanship">How a piece is built</ArrowLink>
                <ArrowLink href="/sustainability">Our practice in full</ArrowLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-umber text-paper">
        <div className="shell flex flex-col items-center py-20 text-center md:py-28">
          <Reveal className="w-full max-w-xl">
            <WordmarkDisplay tone="paper" />
          </Reveal>
          <Reveal delay={140}>
            <p className="type-subtitle mt-10 max-w-md text-paper/70">
              {site.closingLine}
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              <ButtonLink href="/founder" variant="light">
                Meet the founder
              </ButtonLink>
              <ArrowLink href="/collection" tone="paper">
                See the collection
              </ArrowLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
