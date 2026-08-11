import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Prose } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "What JD’oro collects, why, how long we keep it, and how to have it removed. Including how we handle body measurements.",
  alternates: { canonical: "/privacy" },
};

/* Drafted for clarity. Have this reviewed against the DPDP Act 2023 and, if you
   sell into the EU or UK, against the GDPR before trading. */

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="What we hold, why, and how to have it deleted."
        lede="We collect the minimum a workroom needs to make and send you a garment. We do not sell data, we do not run advertising trackers, and measurements are treated as the sensitive information they are."
      />

      <section className="hairline-t bg-paper">
        <div className="shell py-16 md:py-20">
          <Prose className="measure-wide">
            <h2>What we collect</h2>
            <ul>
              <li>
                <strong>Order details</strong> — name, delivery and billing address,
                email, phone number, and what you bought.
              </li>
              <li>
                <strong>Measurements</strong> — only where you give them, and only for
                pieces cut to your measure or a fit enquiry.
              </li>
              <li>
                <strong>Correspondence</strong> — the messages you send us and our
                replies.
              </li>
              <li>
                <strong>Email address alone</strong> — if you subscribe to the letter
                without ordering.
              </li>
              <li>
                <strong>Basic analytics</strong> — aggregate page views with no
                cross-site tracking and no advertising profile built about you.
              </li>
            </ul>
            <p>
              We never see or store your card details. Payment is handled by our
              payment processor, which receives them directly.
            </p>

            <h2>Why we hold it</h2>
            <p>
              To make and deliver your order, to answer you, to honour alterations and
              repairs years later, and to meet Indian tax and accounting obligations.
              Measurements are kept for one reason: so that when you come back, or
              when something needs altering, we do not have to ask you to measure
              yourself again.
            </p>

            <h2>How long</h2>
            <ul>
              <li>Order and invoice records: eight years, as tax law requires.</li>
              <li>
                Measurements: until you ask us to delete them, or three years after
                your last order.
              </li>
              <li>Letter subscription: until you unsubscribe. One click leaves.</li>
              <li>Correspondence: three years, then deleted.</li>
            </ul>

            <h2>Who else sees it</h2>
            <p>
              Only the parties needed to complete the work: our payment processor, our
              shipping carrier, our email provider and our accountant. Each receives
              the minimum required and none of them may use it for anything else. We
              do not sell, rent or trade personal data, and we do not share it with
              advertising networks.
            </p>

            <h2>Your rights</h2>
            <p>
              You can ask us for a copy of what we hold, ask us to correct it, or ask
              us to delete it. Write to {site.contact.email} and we will act within
              thirty days, usually within two. Deletion of measurements is immediate
              on request; order records we are legally required to retain, and we will
              say so rather than pretending otherwise.
            </p>

            <h2>Cookies</h2>
            <p>
              We use a session cookie to keep your bag between pages and a preference
              cookie to remember whether you have dismissed a notice. There are no
              advertising or cross-site tracking cookies on this site, so there is
              nothing to consent to beyond what makes the shop function.
            </p>

            <h2>Security</h2>
            <p>
              The site runs over HTTPS throughout. Order data is held on managed
              infrastructure with access limited to the people who need it, which in
              a workroom of six is a short list.
            </p>

            <h2>Contact</h2>
            <p>
              Questions or complaints about privacy go to {site.contact.email}. We
              will provide a postal address on request if you would rather write.
            </p>
          </Prose>
        </div>
      </section>
    </>
  );
}
