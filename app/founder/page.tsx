import type { Metadata } from "next";
import { FactList, PageHero } from "@/components/page-hero";
import { Media } from "@/components/media";
import { Reveal } from "@/components/reveal";
import {
  ArrowLink,
  Prose,
  PullQuote,
  SectionHead,
  ShortAnswer,
} from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.founder}, founder`,
  description: `${site.founder} on why JD’oro buys fabric before it designs anything, what she learned in a pattern-cutting room, and the decisions she refuses to make.`,
  alternates: { canonical: "/founder" },
};

export default function FounderPage() {
  return (
    <>
      <PageHero
        eyebrow="The founder"
        title={`${site.founder}`}
        lede="Pattern cutter first, founder second. She still cuts every first sample herself, which is the reason the collection is small and the reason it fits."
        aside={
          <FactList
            items={[
              { term: "Trained", detail: "Pattern cutting and tailoring" },
              { term: "Before this", detail: "Six years in production for two Indian labels" },
              { term: "At JD’oro", detail: "Buys the fabric, cuts the first sample, runs the workroom" },
              { term: "Based", detail: site.madeIn },
            ]}
          />
        }
      />

      <section className="hairline-t bg-paper">
        <div className="shell grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal>
              <Media
                texture="studio"
                tone="shell"
                ratio="4 / 5"
                caption="Portrait: at the cutting table, mid-morning, a sleeve pattern weighted down in front of her."
              />
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={100}>
              <Prose>
                <h2>In her own words</h2>
                <p>
                  I spent six years in production before I made anything of my own,
                  which is the least glamorous route into this industry and the most
                  useful one. Production is where you find out what a garment costs
                  — not what it is priced at, what it costs — and where you watch
                  good design get compromised at nine in the evening because a
                  delivery date will not move.
                </p>
                <p>
                  The thing I could not get past was the fabric. Every label I worked
                  with had a shelf of it. Rolls ordered above the minimum, colours
                  dropped after dyeing, whole collections cancelled after the cloth
                  arrived. It sat there for years, and the longer it sat the less
                  anybody wanted to think about it.
                </p>
                <p>
                  I started buying it. Not with a plan — I bought four part-rolls of
                  wool suiting because I could not stand watching them go to a
                  shredder, and then I had to work out what to do with them. That is
                  genuinely how this began, and it is still how it works.
                </p>
              </Prose>
            </Reveal>

            <Reveal delay={160}>
              <PullQuote className="mt-12" attribution={site.founder}>
                I do not design a garment and then find fabric for it. I buy fabric
                and then find out what it is for.
              </PullQuote>
            </Reveal>

            <Reveal delay={200}>
              <Prose className="mt-12">
                <h2>Why I still cut the first sample</h2>
                <p>
                  Because a pattern is where a garment is decided. Everything after
                  it is execution. If the armhole is wrong you can sew it beautifully
                  and it will still pull when you raise your arm, and no amount of
                  hand-finishing will rescue that.
                </p>
                <p>
                  It also keeps the collection honest. If I had to hand a design to
                  someone else to cut, I would draw more of them. Cutting them myself
                  means I only start something I believe is worth the fabric — and
                  with surplus, the fabric is the thing you cannot get more of.
                </p>
              </Prose>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="hairline-t bg-bone">
        <div className="shell grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Reveal>
              <SectionHead
                eyebrow="Straight questions"
                title="The ones she is asked most."
              />
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal delay={100}>
              <ShortAnswer
                question="Is a made-to-order house scalable?"
                answer="Not in the way investors mean, and I have stopped apologising for that."
              >
                <p>
                  Our production is capped by how much surplus fabric exists in the
                  weights we can use. If we grew ten times, we would run out of
                  material and start commissioning new cloth with a nicer story
                  attached. I would rather run a workroom of six that is honest than
                  a brand of sixty that is not.
                </p>
              </ShortAnswer>

              <ShortAnswer
                question="What is the hardest part?"
                answer="Telling someone a piece they love has retired, and meaning it."
              >
                <p>
                  It happens most weeks. The commercially sensible response is to
                  remake it in something similar, and every time I decline I am
                  turning down money. But a dress cut in a different silk is a
                  different dress, and if I do that once I will do it every time.
                </p>
              </ShortAnswer>

              <ShortAnswer
                question="Why not lean harder on sustainability in the marketing?"
                answer="Because the word has been used up, and specifics survive scrutiny where adjectives do not."
              >
                <p>
                  Everyone claims it now, so the claim carries no information. I would
                  rather tell you that side seams carry four centimetres of allowance
                  and that a roll of forty metres makes eleven dresses. You can check
                  both of those. You cannot check a feeling.
                </p>
              </ShortAnswer>

              <ShortAnswer
                question="Who is this for?"
                answer="People who intend to keep things. That is the only qualification."
              >
                <p>
                  Most of our customers are working women between their mid-twenties
                  and mid-forties — architects, founders, doctors, people who need
                  clothes that hold up to being worn constantly. But the deciding
                  trait is not an age or an income. It is whether you buy expecting to
                  still own it in five years.
                </p>
              </ShortAnswer>
            </Reveal>

            <Reveal delay={160}>
              <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4">
                <ArrowLink href="/story">How the house started</ArrowLink>
                <ArrowLink href="/contact">Write to her directly</ArrowLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
