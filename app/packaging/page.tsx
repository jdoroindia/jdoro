import type { Metadata } from "next";
import { FactList, PageHero } from "@/components/page-hero";
import { Media } from "@/components/media";
import { Reveal } from "@/components/reveal";
import {
  ArrowLink,
  ColumnPair,
  Prose,
  PullQuote,
  SectionHead,
  Steps,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Packaging",
  description:
    "Plastic-free packaging, plant-starch garment bags, unbleached board and a hang tag pressed from seed paper you can plant. What each component is and why.",
  alternates: { canonical: "/packaging" },
};

export default function PackagingPage() {
  return (
    <>
      <PageHero
        eyebrow="Packaging"
        title="A tag you can plant, and a box with no plastic in it."
        lede="Packaging is where most brands quietly undo their own claims — a compostable mailer sealed with polypropylene tape. Here is every component of ours, including the tape."
        aside={
          <FactList
            items={[
              { term: "Garment bag", detail: "Plant-starch film, composts in 90–180 days" },
              { term: "Box", detail: "Unbleached recycled board, no coating, no lamination" },
              { term: "Seal", detail: "Paper tape and a paper seal. No plastic anywhere" },
              { term: "Hang tag", detail: "Seed paper — basil and marigold. Plant it" },
            ]}
          />
        }
      />

      <section className="hairline-t bg-paper">
        <div className="shell grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal>
              <Media
                texture="seed"
                tone="bone"
                ratio="1 / 1"
                caption="The hang tag: cotton pulp pressed with basil and marigold seed set through it while wet."
              />
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={100}>
              <SectionHead
                eyebrow="The hang tag"
                title="It sets a deadline, and we printed it on the back."
              />
            </Reveal>
            <Reveal delay={140}>
              <Prose className="mt-9">
                <p>
                  Soak the tag overnight. Lay it under a centimetre of soil, keep it
                  damp and out of hard sun, and it germinates in eight to twelve
                  days. Basil and marigold, both of which survive a windowsill.
                </p>
                <p>
                  The line printed on the reverse is the reason it exists:
                </p>
              </Prose>
            </Reveal>
            <Reveal delay={180}>
              <PullQuote className="mt-8">
                By the time your seed grows into a plant, your garment should still
                be part of your wardrobe.
              </PullQuote>
            </Reveal>
            <Reveal delay={220}>
              <Prose className="mt-8">
                <p>
                  It is a clock we can be measured against, which is the point of
                  it. A basil plant on a windowsill lives for years with a little
                  attention. So should a jacket, and we would rather hand you the
                  comparison than ask you to take our word for it.
                </p>
              </Prose>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="hairline-t bg-bone">
        <div className="shell py-20 md:py-28">
          <Reveal>
            <SectionHead
              eyebrow="Component by component"
              title="Everything in the box, and what happens to it afterwards."
            />
          </Reveal>
          <Reveal delay={120}>
            <Steps
              className="mt-14"
              items={[
                {
                  title: "Garment bag — plant-starch film",
                  body: "Looks and behaves like a polybag and is made from corn starch. It breaks down in a home compost heap in three to six months, or in municipal green waste. It is the one component we would still like to eliminate entirely rather than substitute.",
                },
                {
                  title: "Tissue — unbleached, uncoated",
                  body: "Recycled paper with no optical brighteners, so it is the colour paper actually is. Fine to compost, fine to reuse, fine to recycle. We use one sheet, not five.",
                },
                {
                  title: "Box — unbleached recycled board",
                  body: "No lamination, no foil, no plastic window, no printed coating — laminated board cannot be recycled, which is why most luxury packaging cannot be. Ours is stamped rather than printed.",
                },
                {
                  title: "Tape and seal — paper",
                  body: "Gummed paper tape and a paper seal with the monogram. This is the detail most plastic-free packaging quietly gets wrong, and it is also the cheapest one to get right.",
                },
                {
                  title: "Care card — soy ink on recycled stock",
                  body: "The short version of the care guide, printed in soy-based ink. Keep it in the wardrobe or recycle it; the full guide lives on this site and stays current.",
                },
                {
                  title: "Hang tag — seed paper",
                  body: "Cotton pulp with basil and marigold seed pressed through it. Plant it rather than binning it. If it arrives dry and crumbling, tell us and we will send another.",
                },
                {
                  title: "No swing tickets, no ribbon, no filler",
                  body: "Nothing decorative that exists to be thrown away in the first minute. The box is the presentation; there is nothing inside it that is not either the garment or usable.",
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
              eyebrow="Returns and reuse"
              title="The box is built to go back."
              lede="Which is why it is closed with paper rather than a tamper strip."
            />
          </Reveal>
          <Reveal delay={120}>
            <ColumnPair
              className="mt-12"
              items={[
                {
                  heading: "If you are returning something",
                  body: (
                    <p>
                      Use the same box. Peel the paper seal, refold the garment into
                      the same bag, and close it with the second seal in the care
                      card sleeve. We designed the box to survive two journeys
                      because most returns arrive in a second layer of plastic
                      otherwise.
                    </p>
                  ),
                },
                {
                  heading: "If you are keeping it",
                  body: (
                    <p>
                      The garment bag is worth keeping for storage — it breathes,
                      which is more than a polybag does, and wool in particular
                      should never be stored airtight. Plant the tag. Compost the
                      tissue. Recycle the board.
                    </p>
                  ),
                },
              ]}
            />
          </Reveal>
          <Reveal delay={160}>
            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4">
              <ArrowLink href="/shipping-returns">Shipping and returns</ArrowLink>
              <ArrowLink href="/care">The care guide</ArrowLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
