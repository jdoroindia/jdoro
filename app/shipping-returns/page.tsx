import type { Metadata } from "next";
import Link from "next/link";
import { Clause, LegalPage } from "@/components/legal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description: "Free shipping across India. Every piece is made to order in 10–14 days. Cancellations, alterations and returns explained.",
  alternates: { canonical: "/shipping-returns" },
};

export default function ShippingPage() {
  return (
    <LegalPage
      title="Shipping & Returns"
      updated="1 November 2026"
      intro="Every JD’ORO piece is cut once you order it, so the timings and rules are a little different from a warehouse brand. Here is exactly what to expect."
    >
      <Clause title="Making time">
        <p>Each order is cut and sewn for you. Allow <b>10–14 days</b> to make it, or <b>13–19 days</b> for made-to-measure pieces. We email you when work starts and when it ships.</p>
      </Clause>
      <Clause title="Shipping">
        <ul>
          <li><b>Free shipping</b> to every serviceable pincode in India.</li>
          <li>Delivery usually takes <b>3–7 working days</b> after dispatch, by a tracked courier.</li>
          <li>Your tracking number appears in your shipping email, on your order page and in <Link href="/account">Your orders</Link>.</li>
          <li>We don’t ship outside India yet.</li>
        </ul>
      </Clause>
      <Clause title="Cancelling an order">
        <p>You can cancel for a <b>full refund within 24 hours</b> of ordering, before we cut your fabric. After that the piece is already being made for you, so we can’t cancel it.</p>
      </Clause>
      <Clause title="If something isn’t right">
        <ul>
          <li><b>Damaged, faulty or wrong item:</b> tell us within <b>48 hours</b> of delivery with photos. We’ll replace it or refund you in full, and cover the return shipping.</li>
          <li><b>Standard size doesn’t fit:</b> tell us within <b>7 days</b> of delivery. We’ll alter it or remake it in another size, if fabric is left. You pay only the return shipping.</li>
          <li><b>Made to measure:</b> one free alteration if the fit is off from the measurements you gave us.</li>
          <li>Because every piece is made to order, we don’t accept returns for a change of mind.</li>
        </ul>
        <p>Items must be unworn, unwashed and with tags attached. Full details are in our <Link href="/refunds">refund and cancellation policy</Link>.</p>
      </Clause>
      <Clause title="Contact">
        <p>
          Email <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a> or WhatsApp <a href={`https://wa.me/${site.contact.whatsapp}`}>{site.contact.phone}</a> with your order number. {site.contact.replyTime}
        </p>
      </Clause>
    </LegalPage>
  );
}
