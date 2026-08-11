import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Prose } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of sale",
  description:
    "The terms on which JD’oro sells: pricing, the two purchase routes, cancellation, returns, alterations, repairs and liability.",
  alternates: { canonical: "/terms" },
};

/* Drafted in the house voice and reviewed for clarity, not for law. Have a
   solicitor check this against the Consumer Protection (E-Commerce) Rules
   before trading. */

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Terms of sale"
        title="What you are agreeing to when you order."
        lede="Written to be read. Where a term is unusual — and made-to-measure returns are unusual — it is stated in the same plain language as everything else on this site."
      />

      <section className="hairline-t bg-paper">
        <div className="shell py-16 md:py-20">
          <Prose className="measure-wide">
            <h2>Who you are dealing with</h2>
            <p>
              {site.legalName}, registered in {site.madeIn}. Enquiries
              to {site.contact.email}. All prices are in Indian rupees and include
              applicable Indian taxes. Duties and import taxes outside India are
              the recipient&apos;s responsibility.
            </p>

            <h2>The two purchase routes</h2>
            <p>
              A piece described as ready to ship has already been cut and finished
              in that size. A piece described as cut to your measure is made after
              you order, from the remaining fabric of the same roll. The price is
              identical. The terms that follow differ between the two, and the
              route that applies to your order is shown at checkout and repeated in
              your confirmation email.
            </p>

            <h2>Orders and acceptance</h2>
            <p>
              Placing an order is an offer to buy. We accept it when we send your
              confirmation email, at which point the fabric is reserved in your
              name. If we cannot fulfil an order — most often because the fabric
              was committed to another order moments earlier — we will tell you
              within one working day and refund you in full.
            </p>

            <h2>Cancellation</h2>
            <p>
              A ready-to-ship order can be cancelled at any time before dispatch. An
              order being cut to your measurements can be cancelled in full until
              cutting begins, which is within two working days of the order. Once
              fabric has been cut it cannot be returned to the roll, and from that
              point we can offer an exchange or alteration but not a cancellation.
            </p>

            <h2>Returns</h2>
            <p>
              Ready-to-ship pieces may be returned unworn within fourteen days of
              arrival, with tags attached, for a full refund to the original payment
              method within five working days of receipt. Return shipping within
              India is at our cost; international return shipping is at yours unless
              the fault is ours.
            </p>
            <p>
              Pieces cut to your measurements are exempt from that right, because
              they are made to dimensions that fit you and cannot be resold. They
              may be altered at no cost or exchanged where fabric allows. If a piece
              cannot be altered to fit you, we will remake it once from remaining
              fabric or refund you in full — that undertaking covers our measuring
              or making error and we honour it without argument.
            </p>

            <h2>Alterations and repairs</h2>
            <p>
              One alteration to fit is included at no cost within twelve months of
              purchase, including return shipping within India. After that we alter
              at cost, indefinitely. We repair anything we have made at cost for as
              long as you own it, subject to the fabric or a suitable substitute
              still existing.
            </p>

            <h2>Description of goods</h2>
            <p>
              Fabric is bought as surplus, so weights and colours are described from
              our own measurement rather than a mill specification. Natural fibres
              vary between rolls and photography varies between screens. Where a
              piece contains a synthetic component we name it on the product page.
              Small variations in colour, weave and hardware are characteristics of
              the material and not faults.
            </p>

            <h2>Availability</h2>
            <p>
              Production is limited by the length of each fabric roll. When a roll is
              finished the piece is withdrawn permanently and will not be remade in
              a substitute fabric. Nothing on this site should be read as a promise
              that a piece will return.
            </p>

            <h2>Liability</h2>
            <p>
              Nothing here limits your statutory rights under Indian consumer law,
              or the equivalent law where you live if it gives you more protection.
              Our liability for any order is limited to the value of that order.
            </p>

            <h2>Governing law</h2>
            <p>
              These terms are governed by the laws of India and subject to the
              jurisdiction of the courts of {site.jurisdiction}.
            </p>

            <h2>Changes</h2>
            <p>
              We may update these terms. The version that applies to your purchase
              is the one published when you ordered, and we keep previous versions
              on request.
            </p>
          </Prose>
        </div>
      </section>
    </>
  );
}
