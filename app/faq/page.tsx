import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { ArrowLink, SectionHead, ShortAnswer } from "@/components/ui";
import { allQuestions, faq } from "@/lib/faq";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Questions",
  description:
    "Ordering, fit, fabric, returns and care — answered in one line each, with the longer version behind each answer.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allQuestions.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.detail ? `${item.answer} ${item.detail}` : item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        eyebrow="Questions"
        title="Short answers first. The long one is one tap away."
        lede="Nobody should have to read an essay to find out a lead time. Every question below answers itself in a line, and opens if you want the reasoning."
        aside={
          <nav aria-label="On this page">
            <p className="eyebrow">On this page</p>
            <ul className="mt-5 space-y-3">
              {faq.map((group) => (
                <li key={group.heading}>
                  <a
                    href={`#${group.heading.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                    className="text-sm text-graphite transition-colors duration-500 hover:text-oro"
                  >
                    {group.heading}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        }
      />

      {faq.map((group, index) => (
        <section
          key={group.heading}
          id={group.heading.toLowerCase().replace(/[^a-z]+/g, "-")}
          className={`hairline-t scroll-mt-32 ${index % 2 ? "bg-bone" : "bg-paper"}`}
        >
          <div className="shell grid gap-10 py-16 md:py-20 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Reveal>
                <SectionHead eyebrow={`0${index + 1}`} title={group.heading} />
                <p className="type-caption mt-5 max-w-xs">{group.intro}</p>
              </Reveal>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <Reveal delay={100}>
                {group.questions.map((item) => (
                  <ShortAnswer
                    key={item.question}
                    question={item.question}
                    answer={item.answer}
                  >
                    {item.detail ? <p>{item.detail}</p> : null}
                  </ShortAnswer>
                ))}
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      <section className="hairline-t bg-paper">
        <div className="shell flex flex-wrap items-center justify-between gap-8 py-16">
          <div className="max-w-xl">
            <h2 className="type-title text-ink">Not covered here?</h2>
            <p className="type-body mt-5">
              Write to us. {site.contact.replyTime} If the answer is that we do not
              know, we will say that instead of guessing.
            </p>
          </div>
          <ArrowLink href="/contact">Write to the atelier</ArrowLink>
        </div>
      </section>
    </>
  );
}
