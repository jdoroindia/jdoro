import type { Metadata } from "next";
import { FactList, PageHero } from "@/components/page-hero";
import { Media } from "@/components/media";
import { Reveal } from "@/components/reveal";
import {
  ArrowLink,
  ButtonLink,
  Contrast,
  Prose,
  PullQuote,
  SectionHead,
  ShortAnswer,
  Steps,
} from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Craftsmanship",
  description:
    "Bound seams, woven interlinings, deep hems and hand-finished edges. The construction decisions that decide how long a garment lasts, and what each one costs us.",
  alternates: { canonical: "/craftsmanship" },
};

export default function CraftsmanshipPage() {
  return (
    <>
      <PageHero
        eyebrow="Craftsmanship"
        title="Most of what you are paying for is on the inside."
        lede="A garment fails at its seams, its interlinings and its edges — never at the part you were shown in the photograph. So that is where the work goes, and this page shows you exactly what it consists of."
        aside={
          <FactList
            items={[
              { term: "Workroom", detail: "One cutter, four tailors, one presser" },
              { term: "Per garment", detail: "One tailor, start to finish. No production line" },
              { term: "By hand", detail: "Hems, plackets, armholes, rolled edges, buttonholes" },
              { term: "Never", detail: "Fusible interlining, overlocked raw edges, glued hems" },
            ]}
          />
        }
      />

      <section className="hairline-t bg-paper">
        <div className="shell grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <Reveal>
              <SectionHead
                eyebrow="The principle"
                title="Build it so it can be changed."
              />
            </Reveal>
            <Reveal delay={100}>
              <Prose className="mt-10">
                <p>
                  A garment can be built to be finished or built to be continued.
                  The difference is allowance: fabric left in the seams and hems
                  that has no purpose today and every purpose in five years.
                </p>
                <p>
                  Ours carry 4 cm at the side seams and 5 to 6 cm at the hems. That
                  costs roughly a fifth of a metre per garment, which on a run of
                  fifteen is three metres — a garment and a half we chose not to
                  make. It is the single most expensive decision in the workroom and
                  the one you are least likely to notice.
                </p>
                <p>
                  What it buys is range. A trouser that can be lengthened works with
                  flats and heels, survives a change in body, and can be handed to
                  somebody taller. A garment with no allowance has decided in advance
                  how long you get to keep it.
                </p>
              </Prose>
            </Reveal>
            <Reveal delay={160}>
              <div className="mt-10">
                <ArrowLink href="/care">How to keep it that long</ArrowLink>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal delay={120}>
              <Media
                texture="stitch"
                tone="shell"
                ratio="4 / 5"
                caption="Inside a side seam: 4 cm of allowance pressed open, bound in offcuts of the same cloth."
              />
            </Reveal>
            <Reveal delay={200}>
              <PullQuote attribution={`${site.founder}, founder`} className="mt-12">
                You can see a fused front from across a room after two years. That
                is the whole argument for doing it the slow way.
              </PullQuote>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="hairline-t bg-bone">
        <div className="shell py-20 md:py-28">
          <Reveal>
            <SectionHead
              eyebrow="Decision by decision"
              title="Where the money goes, and what the alternative would have been."
              lede="Nobody is named here. This is simply how clothing is usually built when the price has to come down, set against how we build it."
            />
          </Reveal>

          <Reveal delay={120}>
            <Contrast
              className="mt-14"
              headings={["The usual way", "How we do it"]}
              rows={[
                [
                  "Raw edges overlocked. Fast, and it frays and thickens with every wash.",
                  "French seams on light fabric, bound seams on heavy. No raw edge anywhere inside.",
                ],
                [
                  "Collars and fronts fused with adhesive interlining, which bubbles after a few cleans.",
                  "Woven cotton canvas, cut on the bias and stitched in. It softens rather than failing.",
                ],
                [
                  "Hems folded once at about a centimetre. Shortened once, never lengthened.",
                  "Hems 5–6 cm deep, so length can change twice across the garment's life.",
                ],
                [
                  "Side seams cut with 1 cm allowance. No room to adjust as a body changes.",
                  "4 cm at the side seams, enough to be let out twice.",
                ],
                [
                  "Buttonholes machined at speed, then cut open and left to fray.",
                  "Machined, then the edges finished by hand so they hold their shape.",
                ],
                [
                  "Bias pieces cut and sewn the same day, so they drop unevenly later.",
                  "Bias pieces hung 48 hours before hemming, so they settle before they are cut.",
                ],
                [
                  "One garment passes through eight pairs of hands on a line.",
                  "One tailor from first seam to last, so nothing is somebody else's problem.",
                ],
                [
                  "Pressed once at the end, to look right in the photograph.",
                  "Pressed at every stage. Most of what reads as quality is pressing.",
                ],
              ]}
            />
          </Reveal>
        </div>
      </section>

      <section className="hairline-t bg-paper">
        <div className="shell grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal>
              <Media
                texture="drape"
                tone="clay"
                ratio="3 / 4"
                caption="Pressing: a shoulder shaped over the ham in stages rather than flattened in one pass."
              />
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={100}>
              <SectionHead
                eyebrow="The hand-finished parts"
                title="Four places where a machine is faster and worse."
              />
            </Reveal>
            <Reveal delay={140}>
              <div className="mt-10">
                <ShortAnswer
                  question="Hems"
                  answer="Rolled and stitched by hand on anything fine, so no stitch shows from the front."
                >
                  <p>
                    A machined hem on silk puckers, because the feed dogs pull the
                    bias. A hand-rolled hem at 3 mm takes our tailor about forty
                    minutes on a full-length skirt and lies flat for the life of the
                    garment.
                  </p>
                </ShortAnswer>
                <ShortAnswer
                  question="Plackets"
                  answer="Turned and stitched by hand, two rows, twelve stitches to the inch."
                >
                  <p>
                    The placket is the vertical line down the front of a shirt and the
                    first thing the eye reads. Machined, it ripples between buttons.
                    Stitched by hand with the tension set by feel, it sits flat.
                  </p>
                </ShortAnswer>
                <ShortAnswer
                  question="Armholes"
                  answer="Set and finished by hand so the sleeve turns without pulling at the shoulder."
                >
                  <p>
                    A sleeve has more fabric in its head than the armhole it goes
                    into. Distributing that ease by machine produces small tucks; by
                    hand it produces a smooth curve that lets you raise your arm
                    without lifting the whole jacket.
                  </p>
                </ShortAnswer>
                <ShortAnswer
                  question="Buttonholes"
                  answer="Machined for strength, then finished by hand so the edges hold."
                >
                  <p>
                    A purely hand-worked buttonhole is beautiful and takes twenty
                    minutes. We compromise deliberately: machine the bar for
                    durability, then hand-finish the cut edge, which is the part that
                    frays.
                  </p>
                </ShortAnswer>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="hairline-t bg-bone">
        <div className="shell py-20 md:py-28">
          <Reveal>
            <SectionHead
              eyebrow="The workroom"
              title="Six people, and a piece that never leaves the room."
              lede="Small-batch is not a marketing term here. It is a description of the number of machines."
            />
          </Reveal>
          <Reveal delay={120}>
            <Steps
              className="mt-14"
              items={[
                {
                  title: "Cutting, single layer",
                  body: "Marked in chalk and cut one layer at a time. Slower than cutting six, but it is the only way to place a pattern around a flaw in surplus fabric — and it wastes less.",
                },
                {
                  title: "Offcuts sorted before sewing starts",
                  body: "Anything above a hand's width is labelled and shelved for facings, bindings, ties and pocket bags. Smaller scraps are bagged by fibre for a quilting collective.",
                },
                {
                  title: "One tailor, one garment",
                  body: "The same person sews it from first seam to last. It is slower and the accountability is total: there is nobody to hand an unfinished sleeve to.",
                },
                {
                  title: "Pressing at every stage",
                  body: "Seams pressed open as they are made, shoulders shaped over a ham, nothing flattened. Most of what reads as expensive tailoring is pressing rather than stitching.",
                },
                {
                  title: "Inspection inside and out",
                  body: "Checked on the reverse first. If a seam is not right it is unpicked and redone, which occasionally costs a week and always costs less than sending it out.",
                },
                {
                  title: "Logged against its fabric",
                  body: "Every finished piece is recorded against its roll and its button set, so we can repair or replace hardware years later without guessing.",
                },
              ]}
            />
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4">
              <ButtonLink href="/collection">See the pieces</ButtonLink>
              <ArrowLink href="/made-to-order">How ordering works</ArrowLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
