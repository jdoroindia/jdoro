import type { Metadata } from "next";
import { FactList, PageHero } from "@/components/page-hero";
import { Media } from "@/components/media";
import { Reveal } from "@/components/reveal";
import {
  ArrowLink,
  ButtonLink,
  ColumnPair,
  SectionHead,
  ShortAnswer,
  Steps,
} from "@/components/ui";
import { trust, ways } from "@/lib/microcopy";

export const metadata: Metadata = {
  title: "The two ways to buy",
  description:
    "Take a finished piece from the run, sent in two working days. Or have the same piece cut to your measurements in three to five weeks. Same fabric, same price.",
  alternates: { canonical: "/made-to-order" },
};

export default function MadeToOrderPage() {
  return (
    <>
      <PageHero
        eyebrow="Ordering"
        title="Two ways to have it. The fabric decides which."
        lede="A roll makes a handful of garments, so we cut a few in the most requested sizes and hold the rest of the fabric back. If your size is on the shelf, it ships. If it is not, we cut it for you."
        aside={
          <FactList
            items={[
              { term: "Ready to ship", detail: trust.readyLeadTime },
              { term: "Cut to your measure", detail: trust.measureLeadTime },
              { term: "Price", detail: "Identical either way. Made to measure carries no premium." },
              { term: "Alterations", detail: trust.alterations },
            ]}
          />
        }
      />

      <section className="hairline-t bg-paper">
        <div className="shell py-16 md:py-20">
          <Reveal>
            <ColumnPair
              items={[
                {
                  heading: ways.readyLabel,
                  body: (
                    <>
                      <p>
                        The pieces we already cut, in the sizes we cut them. They
                        are finished, pressed and boxed, and they leave us within
                        two working days.
                      </p>
                      <p className="mt-4">
                        Returnable unworn within fourteen days. One alteration to
                        fit at no cost in the first year, which is usually all a
                        piece needs.
                      </p>
                    </>
                  ),
                },
                {
                  heading: ways.measureLabel,
                  body: (
                    <>
                      <p>
                        Your measurements, cut from what remains of the same roll.
                        Three to five weeks, because the piece waits its turn in a
                        workroom that finishes one thing before starting the next.
                      </p>
                      <p className="mt-4">
                        Because it is cut for you, it can be altered or exchanged
                        but not returned for a refund. We say so before you pay,
                        not after.
                      </p>
                    </>
                  ),
                },
              ]}
            />
          </Reveal>
        </div>
      </section>

      <section id="steps" className="hairline-t bg-bone scroll-mt-32">
        <div className="shell py-20 md:py-28">
          <Reveal>
            <SectionHead
              eyebrow="If we are cutting it for you"
              title="Nine steps, three to five weeks."
              lede="Nothing here is automated. Each stage is a person deciding something, which is both why it takes weeks and why it fits."
            />
          </Reveal>

          <Reveal delay={120}>
            <Steps
              className="mt-14"
              items={[
                {
                  title: "You order",
                  body: "You choose the piece and the closest size. Payment is taken in full; the fabric is reserved in your name that day.",
                },
                {
                  title: "We confirm the measurements",
                  body: "Within one working day we write to check three or four measurements. If you would rather be talked through it, we will call.",
                },
                {
                  title: "The pattern is adjusted",
                  body: "We start from the house block in your size and alter it — length, rise, sleeve, bust — rather than drafting from nothing. It is more accurate that way.",
                },
                {
                  title: "The fabric is cut",
                  body: "Laid flat, marked in chalk, cut in a single layer. Cutting one layer wastes less than cutting six and is the only way to work around a flaw in surplus fabric.",
                },
                {
                  title: "The offcuts are set aside",
                  body: "Anything above a hand's width is kept for facings, bindings, ties and pocket bags on later pieces. Smaller pieces go to a quilting collective we work with.",
                },
                {
                  title: "It is sewn by one tailor",
                  body: "The same person takes it from first seam to last. No line, no stations, no handing an unfinished sleeve to somebody else.",
                },
                {
                  title: "Hand-finishing",
                  body: "Hems, plackets, armholes and any rolled edge are done by hand. This is the slowest stage and the one you can see across a room.",
                },
                {
                  title: "Pressing and inspection",
                  body: "Pressed in stages, then checked inside and out. If a seam is not right it is unpicked, which occasionally costs us a week.",
                },
                {
                  title: "Packed and sent",
                  body: "Folded into a plant-starch garment bag, boxed in unbleached board, sealed with paper. The seed-paper tag goes in loose so it survives the journey.",
                },
              ]}
            />
          </Reveal>
        </div>
      </section>

      <section id="measurements" className="hairline-t bg-paper scroll-mt-32">
        <div className="shell grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal>
              <Media
                texture="stitch"
                tone="shell"
                ratio="4 / 5"
                caption="Fitting: the toile marked in chalk where the shoulder needs to come in."
              />
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={100}>
              <SectionHead
                eyebrow="Measuring at home"
                title="Four numbers, a soft tape, and someone to hold the other end."
                lede="You do not need to be measured professionally. You need to be measured consistently, over the underwear you would wear with the piece."
              />
            </Reveal>

            <Reveal delay={160}>
              <div className="mt-10">
                <ShortAnswer
                  question="Bust"
                  answer="Around the fullest part, tape level all the way round and not pulled tight."
                >
                  <p>
                    Breathe normally and let the tape sit where it wants to. The
                    most common error is pulling it up at the back, which loses two
                    centimetres and produces a jacket that will not close.
                  </p>
                </ShortAnswer>

                <ShortAnswer
                  question="Waist"
                  answer="The narrowest part of your torso, usually just above the navel."
                >
                  <p>
                    Bend sideways — the crease that forms is your natural waist.
                    That is where our trousers and skirts sit unless you tell us
                    otherwise.
                  </p>
                </ShortAnswer>

                <ShortAnswer
                  question="Hip"
                  answer="Around the fullest part, roughly 20 cm below the waist."
                >
                  <p>
                    Keep your feet together. For a bias-cut piece this is the
                    measurement that decides whether it hangs or clings, so it is
                    worth taking twice.
                  </p>
                </ShortAnswer>

                <ShortAnswer
                  question="Height, and the shoes you will wear"
                  answer="Your height without shoes, plus the heel height you expect to wear with it."
                >
                  <p>
                    We set hems to the shoe. If you tell us flats and heels both,
                    we will cut to the heel and leave the hem deep enough to take
                    up later.
                  </p>
                </ShortAnswer>
              </div>
            </Reveal>

            <Reveal delay={220}>
              <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
                <ButtonLink href="/collection">See the collection</ButtonLink>
                <ArrowLink href="/contact">Ask us about fit first</ArrowLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="hairline-t bg-bone">
        <div className="shell py-16 md:py-20">
          <Reveal>
            <SectionHead
              eyebrow="Worth knowing"
              title="The awkward questions, answered before you ask them."
            />
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-10">
              <ShortAnswer
                question="What if it arrives and it does not fit?"
                answer="We alter it once at no cost, including return shipping, within the first year."
              >
                <p>
                  Send it back and tell us what is wrong in plain words — tight
                  across the back, too long in the sleeve. If it cannot be altered
                  to fit, we will remake it once from remaining fabric, or refund
                  you in full. That has happened twice, and both times it was our
                  measuring error rather than yours.
                </p>
              </ShortAnswer>

              <ShortAnswer
                question="Why does made to measure cost the same?"
                answer="Because it is the same work. Nothing about your measurements makes the garment harder to sew."
              >
                <p>
                  Charging a premium for it would be charging for the privilege of
                  waiting. The only thing made to measure costs us is scheduling,
                  and that is our problem to solve rather than yours to fund.
                </p>
              </ShortAnswer>

              <ShortAnswer
                question="Can you cut it in a different fabric?"
                answer="Occasionally, if something suitable is on the shelf. Ask and we will tell you honestly."
              >
                <p>
                  Every piece is designed around the weight and behaviour of one
                  specific fabric, so most substitutions produce a worse garment.
                  When it would work we will say so, and when it would not we will
                  say that instead.
                </p>
              </ShortAnswer>

              <ShortAnswer
                question="Can I see the fabric before I commit?"
                answer="Yes. We post swatches within India, or you can come to the studio."
              >
                <p>
                  Write to us with the pieces you are weighing up and we will send
                  swatches of each. There is no charge and no follow-up unless you
                  ask for one.
                </p>
              </ShortAnswer>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-12">
              <ArrowLink href="/faq">Everything else</ArrowLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
