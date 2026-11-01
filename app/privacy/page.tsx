import type { Metadata } from "next";
import { Clause, LegalPage } from "@/components/legal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "What JD’ORO collects, why, who it is shared with, and how to have it deleted.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="1 November 2026"
      intro={`We collect only what we need to make and deliver your clothes. We never sell your data. This policy follows India’s Digital Personal Data Protection Act, 2023.`}
    >
      <Clause title="What we collect">
        <ul>
          <li><b>Order details:</b> name, email, mobile number, delivery address and what you bought.</li>
          <li><b>Measurements:</b> only if you order made to measure, used only to make your piece.</li>
          <li><b>Payments:</b> handled entirely by Razorpay. We never see or store your card, UPI PIN or bank details. We keep only the payment reference.</li>
          <li><b>Your Fitting Room:</b> stored in your own browser, not on our servers.</li>
        </ul>
      </Clause>
      <Clause title="Why we use it">
        <p>To make, ship and support your order; to email you order updates; and to keep the accounting records the law requires. We don’t send marketing emails unless you ask for them.</p>
      </Clause>
      <Clause title="Who we share it with">
        <p>Only the services that run the shop, and only what each one needs:</p>
        <ul>
          <li><b>Razorpay</b> for payments</li>
          <li><b>Supabase</b> to store orders and your account</li>
          <li><b>Resend</b> to send order emails</li>
          <li>Our <b>courier partner</b>, who needs your name, phone and address to deliver</li>
        </ul>
      </Clause>
      <Clause title="How long we keep it">
        <p>Order and payment records are kept for 8 years, as Indian tax law requires. Measurements are deleted 12 months after your last order unless you ask us to keep them.</p>
      </Clause>
      <Clause title="Your rights">
        <p>You can ask to see, correct or delete your personal data, or withdraw consent, at any time. Email <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a> and we will reply within 7 days. Records we are legally required to keep will be kept but not used for anything else.</p>
      </Clause>
      <Clause title="Cookies">
        <p>We use only the cookies needed to keep you signed in. No advertising or tracking cookies.</p>
      </Clause>
      <Clause title="Contact">
        <p>{site.founder}, {site.legalName}, {site.madeIn} · <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a></p>
      </Clause>
    </LegalPage>
  );
}
