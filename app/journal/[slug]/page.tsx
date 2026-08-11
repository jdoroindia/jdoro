import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Media } from "@/components/media";
import { Reveal } from "@/components/reveal";
import { ArrowLink, Eyebrow, Prose } from "@/components/ui";
import { findEntry, formatEntryDate, journal } from "@/lib/journal";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return journal.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = findEntry(slug);
  if (!entry) return { title: "Entry not found" };

  return {
    title: entry.title,
    description: entry.standfirst,
    alternates: { canonical: `/journal/${entry.slug}` },
    openGraph: {
      type: "article",
      title: entry.title,
      description: entry.standfirst,
      publishedTime: entry.date,
    },
  };
}

export default async function JournalEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = findEntry(slug);
  if (!entry) notFound();

  const others = journal.filter((item) => item.slug !== entry.slug).slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: entry.title,
    description: entry.standfirst,
    datePublished: entry.date,
    author: { "@type": "Organization", name: site.plainName },
    publisher: { "@type": "Organization", name: site.plainName },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article>
        <header className="shell pb-12 pt-12 md:pt-16">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-3 text-[0.6875rem] uppercase tracking-[0.2em] text-ash">
              <li>
                <Link href="/journal" className="link-draw hover:text-oro">
                  Journal
                </Link>
              </li>
              <li aria-hidden="true">·</li>
              <li className="text-ink">{entry.category}</li>
            </ol>
          </nav>

          <Reveal>
            <h1 className="type-display measure-wide mt-8 text-ink">
              {entry.title}
            </h1>
            <p className="type-lede measure mt-7">{entry.standfirst}</p>
            <Eyebrow className="mt-9">
              {formatEntryDate(entry.date)}
              <span className="text-mist">
                {" "}
                · {entry.readingMinutes} minute read
              </span>
            </Eyebrow>
          </Reveal>
        </header>

        <div className="shell">
          <Reveal>
            <Media
              texture={entry.texture}
              tone={entry.tone}
              ratio="16 / 9"
              priority
              showCaption={false}
              sizes="100vw"
            />
          </Reveal>
        </div>

        <div className="shell py-16 md:py-20">
          <Reveal>
            <Prose>
              {entry.body.map((paragraph, index) => (
                <p
                  key={index}
                  className={
                    index === 0
                      ? "first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-[3.25rem] first-letter:leading-[0.82] first-letter:text-ink"
                      : undefined
                  }
                >
                  {paragraph}
                </p>
              ))}
            </Prose>
          </Reveal>

          <Reveal delay={120}>
            <div className="measure mt-14 border-t border-line pt-8">
              <ArrowLink href="/collection">See what the fabric became</ArrowLink>
            </div>
          </Reveal>
        </div>
      </article>

      <section className="hairline-t bg-paper">
        <div className="shell py-16 md:py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="type-title text-ink">Also in the journal</h2>
            <ArrowLink href="/journal">All entries</ArrowLink>
          </div>

          <div className="mt-12 grid gap-x-6 gap-y-12 md:grid-cols-2">
            {others.map((item, index) => (
              <Reveal key={item.slug} delay={index * 100}>
                <Link href={`/journal/${item.slug}`} className="group block">
                  <Media
                    texture={item.texture}
                    tone={item.tone}
                    ratio="16 / 10"
                    showCaption={false}
                    sizes="(min-width: 768px) 45vw, 100vw"
                  />
                  <Eyebrow className="mt-5">{item.category}</Eyebrow>
                  <h3 className="type-subtitle mt-3 text-ink transition-colors duration-500 ease-editorial group-hover:text-oro">
                    {item.title}
                  </h3>
                  <p className="type-caption mt-3">{item.standfirst}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
