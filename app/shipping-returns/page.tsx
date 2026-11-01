import type { Metadata } from "next";
import { FactList, PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import {
  ArrowLink,
  ColumnPair,
  Prose,
  SectionHead,
  ShortAnswer,
  Steps,
} from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shipping & returns",
  description:
    "Delivery times and costs within India and worldwide, and the return terms — which differ between a ready-to-ship piece and one cut to your measurements.",
  alternates: { canonical: "/shipping-returns" },
};

export default function ShippingReturnsPage() {
  return (
    <>
      <PageHero
        eyebrow="Shipping & returns"
        title="The terms differ by how the piece was made. Both are here."
        lede="A piece from the cut run can be returned. A piece cut to your measurements cannot be resold to anyone else, so it can be altered or exchanged instead. We would rather you read this now than discover it later."
        aside={
          <FactList
            items={[
              { term: "India", detail: "2–4 working days after dispatch" },
              { term: "Worldwide", detail: "5–9 working days after dispatch" },
              { term: "Complimentary", detail: "Over ₹25,000. Below that, ₹450 India / ₹2,900 worldwide" },
              { term: "Returns window", detail: "14 days from arrival, ready-to-ship pieces" },
            ]}
          />
        }
      />

      <section className="hairline-t bg-paper">
        <div className="shell py-20 md:py-28">
          <Reveal>
            <SectionHead
              eyebrow="Delivery"
              title="When it leaves, and when it arrives."
            />
          </Reveal>

          <Reveal delay={100}>
            <ColumnPair
              className="mt-12"
              items={[
                {
                  heading: "Ready to ship",
                  body: (
                    <>
                      <p>
                        Packed and dispatched within two working days. India: two to
                        four working days after that. Worldwide: five to nine.
                      </p>
                      <p className="mt-4">
                        Tracked and signed for in both cases. We do not offer
                        next-day delivery, because that promise exists only to force
                        air freight on a single parcel.
                      </p>
                    </>
                  ),
                },
                {
                  heading: "Cut to your measurements",
                  body: (
                    <>
                      <p>
                        Three to five weeks from the day we confirm your
                        measurements, then the delivery times above.
                      </p>
                      <p className="mt-4">
                        You will hear from us twice in between: once when your piece
                        is cut, and once when it is finished and about to be packed.
                      </p>
                    </>
                  ),
                },
              ]}
            />
          </Reveal>

          <Reveal delay={160}>
            <Prose className="mt-14 measure-wide">
              <h2>Costs and duties</h2>
              <p>
                Shipping is complimentary on orders over ₹25,000. Below that it is
                ₹450 within India and ₹2,900 worldwide, charged at cost rather than
                as a margin.
              </p>
              <p>
                Duties and import taxes outside India are the recipient&apos;s
                responsibility and are collected by the carrier on delivery. We
                declare the full value on every parcel — under-declaring is illegal
                and shifts the risk to you.
              </p>
            </Prose>
          </Reveal>
        </div>
      </section>

      <section className="hairline-t bg-bone">
        <div className="shell py-20 md:py-28">
          <Reveal>
            <SectionHead
              eyebrow="Returns"
              title="Two sets of terms, stated plainly."
              lede="This is the one place the two purchase routes genuinely differ, and the difference is not arbitrary."
            />
          </Reveal>

          <Reveal delay={100}>
            <ColumnPair
              className="mt-12"
              items={[
                {
                  heading: "A ready-to-ship piece",
                  body: (
                    <>
                      <p>
                        Returnable unworn within fourteen days of arrival, in the
                        box it came in, with the tags attached. Refunded in full to
                        the original payment method within five working days of us
                        receiving it.
                      </p>
                      <p className="mt-4">
                        Return shipping within India is on us. International returns
                        are at your cost unless the fault is ours.
                      </p>
                    </>
                  ),
                },
                {
                  heading: "A piece cut to your measurements",
                  body: (
                    <>
                      <p>
                        Not returnable for a refund, because it was cut to
                        dimensions that fit you and nobody else. It can be altered
                        at no cost, or exchanged for another piece if the fabric
                        allows.
                      </p>
                      <p className="mt-4">
                        If it cannot be altered to fit, we remake it once from
                        remaining fabric or refund you in full. That is a promise
                        about our own error, and we honour it without argument.
                      </p>
                    </>
                  ),
                },
              ]}
            />
          </Reveal>

          <Reveal delay={160}>
            <Steps
              className="mt-16"
              items={[
                {
                  title: "Write to us first",
                  body: `Email ${site.contact.email} with your order number and what is wrong. ${site.contact.replyTime} We will send the return address and, within India, a prepaid label.`,
                },
                {
                  title: "Use the same box",
                  body: "Peel the paper seal, refold the garment into the same bag, and close it with the second seal in the care card sleeve. The box is built to survive two journeys.",
                },
                {
                  title: "We inspect and confirm",
                  body: "We check it the day it arrives and write to tell you what we found, whether that is a refund, an alteration or a disagreement.",
                },
                {
                  title: "Refund or alteration",
                  body: "Refunds go back within five working days. Alterations take one to two weeks and come back to you at our cost.",
                },
              ]}
            />
          </Reveal>
        </div>
      </section>

      <section className="hairline-t bg-paper">
        <div className="shell py-16 md:py-20">
          <Reveal>
            <div className="mt-2">
              <ShortAnswer
                question="What if it arrives damaged?"
                answer="Photograph it before doing anything else and write to us the same day."
              >
                <p>
                  We replace or repair at our cost, and we take it up with the
                  carrier ourselves rather than asking you to. Do not attempt to
                  clean or repair it first — that makes a carrier claim impossible.
                </p>
              </ShortAnswer>

              <ShortAnswer
                question="Can I cancel an order that is being cut for you?"
                answer="Yes, in full, until cutting begins — which is within two working days of ordering."
              >
                <p>
                  Once the fabric has been cut it cannot be returned to the roll, so
                  after that point we can only offer an exchange. If you change your
                  mind, tell us immediately rather than waiting.
                </p>
              </ShortAnswer>

              <ShortAnswer
                question="Do you offer exchanges?"
                answer="Yes, for either route, provided the fabric for the replacement still exists."
              >
                <p>
                  The collection is small and rolls run out, so an exchange depends on
                  what is left. We will tell you what is genuinely available rather
                  than holding a credit against something that may never return.
                </p>
              </ShortAnswer>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4">
              <ArrowLink href="/contact">Ask us anything</ArrowLink>
              <ArrowLink href="/fitting-room">Back to your Fitting Room</ArrowLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
