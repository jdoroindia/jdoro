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
  ShortAnswer,
  Steps,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Garment care",
  description:
    "How to wash, press, store and repair natural fibres so a garment lasts a decade — fibre by fibre, with the mistakes that shorten a garment's life most.",
  alternates: { canonical: "/care" },
};

const fibreCare = [
  {
    heading: "Cotton and linen",
    body: (
      <>
        <p>
          Machine wash cold on a gentle cycle. Line dry in shade — a tumble dryer
          is the single fastest way to age cotton, because the heat breaks fibres
          that abrasion then finishes off.
        </p>
        <p className="mt-4">
          Press while faintly damp for a crisp finish, or do not press at all.
          Linen is meant to crease and we have not treated ours to stop it.
        </p>
      </>
    ),
  },
  {
    heading: "Silk",
    body: (
      <>
        <p>
          Hand wash cold with a pH-neutral soap. Never wring it — press the water
          out between two towels and dry flat, away from sun. Heat and alkaline
          soap damage silk far more than water does.
        </p>
        <p className="mt-4">
          Steam rather than iron. If you must iron, use the reverse, a cloth
          between, and the lowest setting your iron has.
        </p>
      </>
    ),
  },
  {
    heading: "Wool",
    body: (
      <>
        <p>
          Wash it far less than you think. Air a wool garment overnight and most
          odour goes on its own; wool is naturally antibacterial and every clean
          shortens its life.
        </p>
        <p className="mt-4">
          Brush along the nap with a soft clothes brush rather than lint-rolling.
          Dry clean once a season at most, and spot-clean in between.
        </p>
      </>
    ),
  },
  {
    heading: "Hemp and bamboo",
    body: (
      <>
        <p>
          Machine wash cold, line dry. Hemp softens noticeably for its first ten
          washes and then stops changing — if a piece feels stiff when it arrives,
          it is not finished becoming itself yet.
        </p>
        <p className="mt-4">
          Bamboo is weaker wet than dry, so support the weight of the garment
          when you lift it out rather than letting it hang from one corner.
        </p>
      </>
    ),
  },
];

export default function CarePage() {
  return (
    <>
      <PageHero
        eyebrow="Garment care"
        title="A decade is a realistic target. Here is what it takes."
        lede="Almost every garment that fails early fails for one of four reasons: washed too often, washed too hot, dried in a machine, or stored badly. None of those are difficult to avoid."
        aside={
          <FactList
            items={[
              { term: "Wash less", detail: "Air first. Most things do not need cleaning, only resting" },
              { term: "Wash cold", detail: "30°C or below, gentle cycle, half the detergent you think" },
              { term: "Never tumble dry", detail: "Heat plus abrasion is what ages natural fibre fastest" },
              { term: "Repairs", detail: "We repair anything we made, at cost, for as long as you own it" },
            ]}
          />
        }
      />

      <section className="hairline-t bg-paper">
        <div className="shell grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <Reveal>
              <SectionHead
                eyebrow="The short version"
                title="Four habits, and the rest is detail."
              />
            </Reveal>
            <Reveal delay={100}>
              <Prose className="mt-9">
                <p>
                  Hang the garment up when you take it off and give it a day before
                  you decide it needs washing. Wash cold, gently, with about half the
                  detergent the bottle suggests — excess detergent does not rinse out
                  and stiffens fabric over time.
                </p>
                <p>
                  Dry flat or on a line, in shade. Store on a wide hanger or folded,
                  never sealed in plastic, which traps moisture against the fibre.
                </p>
                <p>
                  Then repair rather than replace. A split seam is twenty minutes of
                  someone&apos;s time. A missing button is five. Neither is a reason to
                  stop wearing something.
                </p>
              </Prose>
            </Reveal>
            <Reveal delay={150}>
              <div className="mt-9">
                <ArrowLink href="/contact">Send us something to repair</ArrowLink>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal delay={120}>
              <Media
                texture="weave"
                tone="bone"
                ratio="4 / 5"
                caption="Care: a linen shirt drying flat in shade, seams straightened by hand while damp."
              />
            </Reveal>
            <Reveal delay={180}>
              <PullQuote className="mt-12">
                Airing is not a compromise on washing. For wool it is better than
                washing.
              </PullQuote>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="hairline-t bg-bone">
        <div className="shell py-20 md:py-28">
          <Reveal>
            <SectionHead
              eyebrow="Fibre by fibre"
              title="What each material actually wants."
              lede="The care card in your box carries the short version for your piece. This is the full account."
            />
          </Reveal>
          <Reveal delay={120}>
            <ColumnPair className="mt-14" items={fibreCare} />
          </Reveal>
        </div>
      </section>

      <section className="hairline-t bg-paper">
        <div className="shell py-20 md:py-28">
          <Reveal>
            <SectionHead
              eyebrow="Storage"
              title="Six months in a wardrobe does more damage than six months of wear."
            />
          </Reveal>
          <Reveal delay={120}>
            <Steps
              className="mt-14"
              items={[
                {
                  title: "Clean before storing, not after",
                  body: "Moths and silverfish are drawn to body oils and food traces rather than to the fabric itself. A garment put away dirty is the one that comes out with holes.",
                },
                {
                  title: "Let it breathe",
                  body: "Cotton or the plant-starch garment bag your piece arrived in — both breathe. Never a sealed plastic box or a vacuum bag, which hold moisture against the fibre and set creases permanently.",
                },
                {
                  title: "Fold knits, hang tailoring",
                  body: "Anything knitted or heavy stretches on a hanger. Jackets and coats need a wide wooden hanger that supports the shoulder; a wire hanger will deform a shoulder in a season.",
                },
                {
                  title: "Cedar or lavender, not mothballs",
                  body: "Both work as deterrents and neither leaves a smell you have to wash out. Refresh cedar by sanding it lightly once a year.",
                },
                {
                  title: "Keep it dark and dry",
                  body: "Sunlight fades and weakens fibre, and humidity encourages mildew. A closed wardrobe away from an outside wall is enough.",
                },
                {
                  title: "Unfold it twice a year",
                  body: "Refold along different lines. A permanent crease eventually becomes a permanent weakness, particularly in silk.",
                },
              ]}
            />
          </Reveal>
        </div>
      </section>

      <section className="hairline-t bg-bone">
        <div className="shell py-16 md:py-20">
          <Reveal>
            <SectionHead
              eyebrow="Repairs"
              title="When something goes wrong."
              lede="We would rather see a garment back in the workroom than replaced."
            />
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-10">
              <ShortAnswer
                question="A seam has split"
                answer="Stop wearing it and send it to us. Restitching is quick and cheap; a split that has run is neither."
              >
                <p>
                  Every piece is logged against its fabric roll, so we can usually
                  repair with the same fabric rather than an approximation. Write
                  first and we will tell you where to send it.
                </p>
              </ShortAnswer>

              <ShortAnswer
                question="A button is missing"
                answer="We keep the remainder of every button set we have used. Ask and we will post one."
              >
                <p>
                  If we genuinely cannot match it — reclaimed horn is never uniform —
                  we replace the whole set rather than leave you with five that agree
                  and one that does not.
                </p>
              </ShortAnswer>

              <ShortAnswer
                question="It does not fit any more"
                answer="Side seams carry 4 cm of allowance and hems 5–6 cm. Most pieces can be altered twice."
              >
                <p>
                  The first alteration is free within a year of purchase. After that
                  we alter at cost, indefinitely, whether the change you need is
                  larger or smaller.
                </p>
              </ShortAnswer>

              <ShortAnswer
                question="There is a stain and I have made it worse"
                answer="Send it before trying anything else. Most home remedies set a stain rather than lifting it."
              >
                <p>
                  Do not use hot water on protein stains, do not rub silk, and do not
                  bleach anything. Blot, let it dry, and tell us what it was — the
                  substance matters more than the mark.
                </p>
              </ShortAnswer>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
