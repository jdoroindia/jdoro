import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Media } from "@/components/media";
import { Reveal } from "@/components/reveal";
import { ArrowLink, Eyebrow } from "@/components/ui";
import { formatEntryDate, journal } from "@/lib/journal";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Notes from the workroom: fabric we have found, techniques we keep, and the decisions behind each piece — with the numbers attached.",
  alternates: { canonical: "/journal" },
};

export default function JournalPage() {
  const [lead, ...rest] = journal;

  return (
    <>
      <PageHero
        eyebrow="Journal"
        title="Notes from the workroom."
        lede="What we found, what it cost, and how it was made. Every entry has something specific in it — a number, a technique, a decision and its price."
      />

      {/* Lead entry */}
      <section className="hairline-t bg-paper">
        <div className="shell py-16 md:py-20">
          <Reveal>
            <Link
              href={`/journal/${lead.slug}`}
              className="group grid gap-10 lg:grid-cols-12 lg:gap-10"
            >
              <div className="lg:col-span-7">
                <Media
                  src={lead.image}
                  alt={lead.title}
                  texture={lead.texture}
                  tone={lead.tone}
                  ratio="16 / 10"
                  priority
                  showCaption={false}
                  sizes="(min-width: 1024px) 55vw, 100vw"
                />
              </div>
              <div className="lg:col-span-5 lg:pt-4">
                <Eyebrow>
                  {lead.category}
                  <span className="text-mist">
                    {" "}
                    · {formatEntryDate(lead.date)} · {lead.readingMinutes} min
                  </span>
                </Eyebrow>
                <h2 className="type-display mt-6 text-ink transition-colors duration-500 ease-editorial group-hover:text-oro">
                  {lead.title}
                </h2>
                <p className="type-lede mt-6">{lead.standfirst}</p>
                <p className="eyebrow mt-8 text-oro">
                  <span className="link-draw">Read the entry</span>
                </p>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* The rest */}
      <section className="hairline-t bg-bone">
        <div className="shell py-16 md:py-20">
          <div className="grid gap-x-6 gap-y-14 md:grid-cols-3">
            {rest.map((entry, index) => (
              <Reveal key={entry.slug} delay={index * 100}>
                <Link href={`/journal/${entry.slug}`} className="group block">
                  <Media
                    src={entry.image}
                    alt={entry.title}
                    texture={entry.texture}
                    tone={entry.tone}
                    ratio="4 / 3"
                    showCaption={false}
                    sizes="(min-width: 768px) 30vw, 100vw"
                  />
                  <Eyebrow className="mt-5">
                    {entry.category}
                    <span className="text-mist">
                      {" "}
                      · {formatEntryDate(entry.date)}
                    </span>
                  </Eyebrow>
                  <h3 className="type-subtitle mt-3 text-ink transition-colors duration-500 ease-editorial group-hover:text-oro">
                    {entry.title}
                  </h3>
                  <p className="type-caption mt-3">{entry.standfirst}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="hairline-t bg-paper">
        <div className="shell flex flex-wrap items-center justify-between gap-8 py-14">
          <p className="type-title max-w-xl text-ink">
            The letter carries these first, roughly once a month.
          </p>
          <ArrowLink href="/contact">Join the letter</ArrowLink>
        </div>
      </section>
    </>
  );
}
