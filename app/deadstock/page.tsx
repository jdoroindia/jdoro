import type { Metadata } from "next";
import { FactList, PageHero } from "@/components/page-hero";
import { Media } from "@/components/media";
import { Reveal } from "@/components/reveal";
import {
  ArrowLink,
  ButtonLink,
  Prose,
  PullQuote,
  SectionHead,
  ShortAnswer,
  Steps,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Why surplus fabric matters",
  description:
    "Mills weave more than the order calls for and collections get cancelled after the fabric is finished. What happens to that surplus, and what we do with it instead.",
  alternates: { canonical: "/deadstock" },
};

export default function DeadstockPage() {
  return (
    <>
      <PageHero
        eyebrow="Deadstock"
        title="Perfectly good fabric, made for an order that no longer exists."
        lede="Deadstock is finished, inspected cloth that nobody claimed. It is not offcuts, not seconds, and not waste in any sense you would recognise — it is a full roll with nowhere to go."
        aside={
          <FactList
            items={[
              { term: "What it is", detail: "Surplus rolls from mills, houses and cancelled production" },
              { term: "What it is not", detail: "Offcuts, factory seconds, or flawed cloth sold cheap" },
              { term: "How we buy", detail: "The whole roll, at whatever length exists" },
              { term: "What it means for you", detail: "A short run, and no chance of a reissue" },
            ]}
          />
        }
      />

      <section className="hairline-t bg-paper">
        <div className="shell grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <Reveal>
              <SectionHead
                eyebrow="How it happens"
                title="Fabric is committed long before a garment is."
              />
            </Reveal>
            <Reveal delay={100}>
              <Prose className="mt-10">
                <p>
                  A mill will not weave 40 metres. Minimums start in the hundreds,
                  so a label ordering fabric for a collection orders more than it
                  needs and accepts the remainder as a cost of doing business. Mills
                  themselves over-run deliberately, because a short delivery is
                  worse than a long one.
                </p>
                <p>
                  Then things change. A collection is cut, a buyer pulls out, a
                  season is cancelled, a colour is dropped after the fabric has
                  already been dyed and finished. The cloth exists. The garment
                  never will.
                </p>
                <p>
                  This is not a scandal and we are not presenting it as one. It is
                  arithmetic — the consequence of committing to material months
                  before committing to a product. But it leaves a great deal of good
                  cloth sitting in warehouses.
                </p>
              </Prose>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal delay={140}>
              <Media
                texture="roll"
                tone="clay"
                ratio="4 / 5"
                caption="A warehouse aisle: part-rolls stacked and labelled by season, several years deep."
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-umber text-paper">
        <div className="shell py-20 md:py-28">
          <Reveal>
            <SectionHead
              eyebrow="Where it ends up"
              title="Three normal endings, none of which involve anyone wearing it."
              lede="This is the part of the supply chain nobody photographs."
              className="[&_h2]:text-paper [&_.type-lede]:text-paper/70"
            />
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-14 grid gap-10 md:grid-cols-3">
              {[
                {
                  title: "It waits",
                  body: "Rolls sit in storage while someone hopes a buyer appears. Warehouses are rarely climate-controlled, so within a few years the outer metres are marked by damp, sun or dust and the roll is worth less than the shelf it occupies.",
                },
                {
                  title: "It is sold by weight",
                  body: "A jobber buys the lot by the kilo and resells it as an unnamed fabric. It gets used, which is better than nothing — but the fibre content, weight and origin are lost along the way, and with them any chance of it being valued properly.",
                },
                {
                  title: "It is shredded",
                  body: "Broken down for insulation, mattress filling or wiping cloth. A wool suiting that would have made fifteen jackets becomes stuffing. This is called recycling, and it is the last useful thing that can happen to it.",
                },
              ].map((item, index) => (
                <div key={item.title} className="border-t border-paper/20 pt-6">
                  <p className="eyebrow text-oro-soft">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="type-subtitle mt-4 text-paper">{item.title}</h3>
                  <p className="type-body mt-4 text-paper/65">{item.body}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={200}>
            <PullQuote className="mt-16 border-oro-soft/60 [&_blockquote]:text-paper">
              The most efficient thing anyone can do with forty metres of finished
              silk is make clothes out of it.
            </PullQuote>
          </Reveal>
        </div>
      </section>

      <section className="hairline-t bg-bone">
        <div className="shell py-20 md:py-28">
          <Reveal>
            <SectionHead
              eyebrow="What we do instead"
              title="How a roll becomes a run."
              lede="This is the whole process, and it is the reason our collection is small and our sizes are uneven."
            />
          </Reveal>

          <Reveal delay={120}>
            <Steps
              className="mt-14"
              items={[
                {
                  title: "We are offered a roll",
                  body: "Usually a call or a photograph. Mills and houses we have bought from before come to us first, which is the only advantage of having done this for a while.",
                },
                {
                  title: "We test before we buy",
                  body: "A metre is washed, pressed, hung overnight and rubbed for colourfastness. Surplus is often surplus for a reason, and about a third of what we are offered we decline.",
                },
                {
                  title: "We buy the whole thing",
                  body: "Not a cut length — the roll, at whatever length it happens to be. We measure it ourselves, because stated lengths on surplus rolls are optimistic.",
                },
                {
                  title: "The roll decides the garment",
                  body: "Weight, width and handle determine what it can become. A 90 cm width rules out a wide trouser however much we might want one.",
                },
                {
                  title: "We divide the metres",
                  body: "Total length divided by the metres per garment gives the run. Forty metres of silk at 2.4 metres a dress is eleven dresses. That is the entire production plan.",
                },
                {
                  title: "We cut a few, and hold the rest",
                  body: "The most requested sizes are cut and finished so they can ship immediately. The remaining metres stay on the shelf so the piece can still be made to measure.",
                },
                {
                  title: "The piece retires",
                  body: "When the roll is finished, the piece is finished. We do not remake it in a substitute fabric, because that would be a different garment wearing the same name.",
                },
              ]}
            />
          </Reveal>
        </div>
      </section>

      <section className="hairline-t bg-paper">
        <div className="shell py-16 md:py-20">
          <Reveal>
            <SectionHead
              eyebrow="Straight answers"
              title="What people reasonably want to know."
            />
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-10">
              <ShortAnswer
                question="Is deadstock actually better, or just a good story?"
                answer="For the fabric itself, it is unambiguously better: no new water, dye, energy or land."
              >
                <p>
                  The environmental cost of a garment is dominated by its material,
                  and using cloth that has already been made removes that cost
                  entirely rather than reducing it. What deadstock does not fix is
                  everything downstream — sewing, shipping, and how long you keep it.
                  That is why the rest of this site talks about construction and
                  repair as much as about fabric.
                </p>
              </ShortAnswer>

              <ShortAnswer
                question="Does this mean the fabric is old?"
                answer="Sometimes years old, and it makes no practical difference to a natural fibre stored properly."
              >
                <p>
                  Wool, linen and cotton do not degrade meaningfully in storage. We
                  check the outer metres for light and damp marking and discard what
                  is affected. Silk is the one to watch, and we test every silk roll
                  for tendering before we commit.
                </p>
              </ShortAnswer>

              <ShortAnswer
                question="Why not just tell us the mills?"
                answer="Because naming them is how we stop being offered fabric."
              >
                <p>
                  Surplus is sold quietly. Houses do not want their over-ordering
                  published, and mills do not want their overruns catalogued. We can
                  tell you the fibre, the weight, the width, the region and how it
                  came to be surplus — everything that affects the garment you are
                  buying. The supplier's name affects only our access.
                </p>
              </ShortAnswer>

              <ShortAnswer
                question="What happens to your own offcuts?"
                answer="Anything above a hand's width is kept and used. The rest goes to a quilting collective."
              >
                <p>
                  Facings, bindings, pocket bags, ties and straps come out of the
                  offcuts of earlier pieces, which is why a jacket's seam binding is
                  sometimes a different fabric from the jacket. Below that size,
                  scraps are bagged by fibre and passed on rather than binned.
                </p>
              </ShortAnswer>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
              <ButtonLink href="/collection">See what the fabric became</ButtonLink>
              <ArrowLink href="/sustainability">Our practice in full</ArrowLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
