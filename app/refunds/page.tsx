import type { Metadata } from "next";
import { Clause, LegalPage } from "@/components/legal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description: "How cancellations, replacements and refunds work for made-to-order JD’ORO pieces.",
  alternates: { canonical: "/refunds" },
};

export default function RefundsPage() {
  return (
    <LegalPage
      title="Refund & Cancellation Policy"
      updated="1 November 2026"
      intro={`This policy applies to every order placed on ${site.url.replace("https://", "")}. ${site.name} is run by ${site.founder}, ${site.madeIn}.`}
    >
      <Clause title="1. Cancellation">
        <p>You may cancel an order within <b>24 hours</b> of placing it by emailing or WhatsApping us with your order number. You will receive a full refund. After 24 hours your fabric has been cut, and the order can no longer be cancelled.</p>
        <p>If we cannot make your piece (for example, the fabric runs out), we will cancel the order and refund you in full.</p>
      </Clause>
      <Clause title="2. Damaged, faulty or incorrect items">
        <p>Report the problem within <b>48 hours</b> of delivery, with clear photos of the item and the packaging. Once we confirm it, we will send a replacement or give you a full refund, as you prefer. We arrange and pay for the return pickup.</p>
      </Clause>
      <Clause title="3. Fit">
        <ul>
          <li><b>Standard sizes:</b> request an alteration or exchange within <b>7 days</b> of delivery. Exchanges depend on fabric being available. If it isn’t, we will offer an alteration or store credit. You pay the return shipping.</li>
          <li><b>Made to measure:</b> one free alteration if the finished piece doesn’t match the measurements you provided. Pieces made to measure can’t be refunded, because they are cut for one person.</li>
        </ul>
      </Clause>
      <Clause title="4. Items that can’t be returned">
        <p>Because every piece is made to order, we don’t accept returns or give refunds for a change of mind, or for items that have been worn, washed or altered elsewhere, or that come back without their tags.</p>
      </Clause>
      <Clause title="5. How refunds are paid">
        <p>Approved refunds go back to the <b>original payment method</b> (UPI, card, netbanking or wallet) within <b>5–7 working days</b> of approval. Your bank may take a few more days to show it. We email you when the refund is issued.</p>
      </Clause>
      <Clause title="6. Contact">
        <p>
          {site.legalName} · <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a> · <a href={`tel:${site.contact.phoneHref}`}>{site.contact.phone}</a> · {site.contact.hours}
        </p>
      </Clause>
    </LegalPage>
  );
}
