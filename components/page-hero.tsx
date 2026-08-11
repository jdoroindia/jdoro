import { Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { cx } from "@/lib/cx";
import type { ReactNode } from "react";

/**
 * The opening of every interior page. Kept to one shape so the site reads as
 * one publication: marker, headline, standfirst, then the page.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  aside,
  tone = "bone",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  /** Optional right-hand column: a fact list, a quote, a contents list. */
  aside?: ReactNode;
  tone?: "bone" | "paper" | "umber";
  className?: string;
}) {
  const tones = {
    bone: "bg-bone text-ink",
    paper: "bg-paper text-ink",
    umber: "bg-umber text-paper",
  } as const;

  const dark = tone === "umber";

  return (
    <section className={cx(tones[tone], className)}>
      <div className="shell grid gap-10 pb-14 pt-14 md:pb-20 md:pt-20 lg:grid-cols-12">
        <div className={aside ? "lg:col-span-7" : "lg:col-span-9"}>
          <Reveal>
            <Eyebrow className={dark ? "text-paper/50" : undefined}>
              {eyebrow}
            </Eyebrow>
            <h1 className={cx("type-display mt-7", dark && "text-paper")}>
              {title}
            </h1>
          </Reveal>
          {lede ? (
            <Reveal delay={120}>
              <div
                className={cx(
                  "type-lede mt-8 max-w-2xl",
                  dark && "text-paper/70",
                )}
              >
                {lede}
              </div>
            </Reveal>
          ) : null}
        </div>

        {aside ? (
          <div className="lg:col-span-4 lg:col-start-9 lg:pt-4">
            <Reveal delay={180}>{aside}</Reveal>
          </div>
        ) : null}
      </div>
    </section>
  );
}

/** A short list of facts, set as a definition list. Used in page asides. */
export function FactList({
  items,
  tone = "ink",
}: {
  items: { term: string; detail: string }[];
  tone?: "ink" | "paper";
}) {
  const dark = tone === "paper";

  return (
    <dl className="space-y-5">
      {items.map((item) => (
        <div
          key={item.term}
          className={cx(
            "border-t pt-4",
            dark ? "border-paper/20" : "border-line",
          )}
        >
          <dt className={cx("eyebrow", dark && "text-paper/50")}>
            {item.term}
          </dt>
          <dd
            className={cx(
              "mt-2 text-[0.9375rem] leading-relaxed",
              dark ? "text-paper/70" : "text-graphite",
            )}
          >
            {item.detail}
          </dd>
        </div>
      ))}
    </dl>
  );
}
