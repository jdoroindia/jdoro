import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact the atelier",
  description:
    "Ask about fit, a fabric, a repair or an order. We answer within one working day. Studio visits and fittings by appointment.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Write to us. A person reads it."
        lede={`${site.contact.replyTime} If you are asking about fit, include your bust, waist and hip and we will answer with a size rather than a brochure.`}
      />

      <section className="hairline-t bg-paper">
        <div className="shell grid gap-14 py-16 md:py-20 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionHead eyebrow="Send a message" title="What do you need?" />
            </Reveal>
            <Reveal delay={100}>
              <div className="mt-10">
                <ContactForm />
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={140}>
              <div className="space-y-10">
                <div className="border-t border-line pt-6">
                  <p className="eyebrow">Direct</p>
                  <ul className="mt-5 space-y-2 text-[0.9375rem]">
                    <li>
                      <a
                        href={`mailto:${site.contact.email}`}
                        className="link-draw text-ink hover:text-oro"
                      >
                        {site.contact.email}
                      </a>
                    </li>
                    <li>
                      <a href={`https://wa.me/${site.contact.whatsapp}`} className="link-draw text-ink hover:text-oro">
                        WhatsApp us
                      </a>
                    </li>
                    <li>
                      <a
                        href={`tel:${site.contact.phoneHref}`}
                        className="link-draw text-ink hover:text-oro"
                      >
                        {site.contact.phone}
                      </a>
                    </li>
                  </ul>
                  <p className="type-caption mt-4">{site.contact.hours}</p>
                </div>

                <div className="border-t border-line pt-6">
                  <p className="eyebrow">The studio</p>
                  {site.contact.studio.lines.length ? (
                    <address className="mt-5 space-y-1 text-[0.9375rem] not-italic text-graphite">
                      {site.contact.studio.lines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </address>
                  ) : null}
                  <p className="type-caption mt-4">{site.contact.studio.note}</p>
                </div>

                <div className="border-t border-line pt-6">
                  <p className="eyebrow">Press and stockists</p>
                  <p className="type-caption mt-4">
                    Lookbooks, fabric details and high-resolution imagery on
                    request.
                  </p>
                  <a
                    href={`mailto:${site.contact.press}`}
                    className="link-draw mt-3 inline-block text-[0.9375rem] text-ink hover:text-oro"
                  >
                    {site.contact.press}
                  </a>
                </div>

                <div className="border-t border-line pt-6">
                  <p className="eyebrow">Working with us</p>
                  <p className="type-caption mt-4">
                    We hire tailors and pattern cutters rarely, and always by
                    trial rather than by CV.
                  </p>
                  <a
                    href={`mailto:${site.contact.careers}`}
                    className="link-draw mt-3 inline-block text-[0.9375rem] text-ink hover:text-oro"
                  >
                    {site.contact.careers}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

    </>
  );
}
