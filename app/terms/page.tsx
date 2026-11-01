import type { Metadata } from "next";
import Link from "next/link";
import { Clause, LegalPage } from "@/components/legal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms for buying from JD’ORO.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      updated="1 November 2026"
      intro={`These terms apply when you use ${site.url.replace("https://", "")} or buy from ${site.name}, a clothing label run by ${site.founder} in ${site.madeIn}. By placing an order you agree to them.`}
    >
      <Clause title="Orders">
        <p>An order is confirmed once payment succeeds and you receive our confirmation email. Each piece is made to order in a small run. If we can’t make your piece, we will tell you and refund you in full.</p>
      </Clause>
      <Clause title="Prices and payment">
        <p>Prices are in Indian Rupees and include applicable taxes. Shipping within India is free. Payments are processed securely by Razorpay. We may correct obvious pricing errors before an order ships, and will offer a full refund if we do.</p>
      </Clause>
      <Clause title="Products">
        <p>Our fabrics come in limited rolls, and colours may look slightly different on your screen. Small variations between pieces are part of being made by hand, not a defect. Measurements in our size chart are a guide.</p>
      </Clause>
      <Clause title="Made to measure">
        <p>You are responsible for giving accurate measurements. We will confirm your measurements with you before cutting.</p>
      </Clause>
      <Clause title="Shipping, cancellations and refunds">
        <p>
          See <Link href="/shipping-returns">Shipping & Returns</Link> and our <Link href="/refunds">Refund & Cancellation Policy</Link>, which form part of these terms.
        </p>
      </Clause>
      <Clause title="Your account">
        <p>You sign in with a link sent to your email. Keep access to that email secure. You can ask us to delete your account at any time.</p>
      </Clause>
      <Clause title="Content">
        <p>All designs, photos and text on this site belong to {site.name}. Please don’t copy them for commercial use without permission.</p>
      </Clause>
      <Clause title="Liability">
        <p>Our responsibility for any order is limited to the amount you paid for it. Nothing in these terms limits your rights under the Consumer Protection Act, 2019.</p>
      </Clause>
      <Clause title="Law and disputes">
        <p>These terms are governed by the laws of India, and disputes are subject to the courts of {site.jurisdiction}. Please contact us first; we’ll try to resolve any problem quickly.</p>
      </Clause>
      <Clause title="Contact">
        <p>
          {site.legalName} · <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a> · <a href={`tel:${site.contact.phoneHref}`}>{site.contact.phone}</a>
        </p>
      </Clause>
    </LegalPage>
  );
}
