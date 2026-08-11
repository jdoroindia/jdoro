import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cx } from "@/lib/cx";

/* -------------------------------------------------------------------------- */
/* Section markers                                                            */
/* -------------------------------------------------------------------------- */

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={cx("eyebrow", className)}>{children}</p>;
}

/** A numbered hairline marker, used down the left of editorial sections. */
export function Marker({
  index,
  label,
  className,
}: {
  index: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={cx("flex items-baseline gap-4", className)}>
      <span className="eyebrow text-oro">{index}</span>
      <span className="h-px flex-1 bg-line" aria-hidden="true" />
      <span className="eyebrow">{label}</span>
    </div>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lede,
  align = "left",
  as: Heading = "h2",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <div
      className={cx(
        align === "center" ? "mx-auto text-center" : "",
        "max-w-3xl",
        className,
      )}
    >
      {eyebrow ? <Eyebrow className="mb-6">{eyebrow}</Eyebrow> : null}
      <Heading className={Heading === "h1" ? "type-display" : "type-title"}>
        {title}
      </Heading>
      {lede ? <div className="type-lede mt-6">{lede}</div> : null}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Actions                                                                    */
/* -------------------------------------------------------------------------- */

type Variant = "solid" | "outline" | "light" | "quiet";

const base =
  "inline-flex items-center justify-center gap-3 text-[0.6875rem] font-normal uppercase tracking-[0.2em] transition-colors duration-500 ease-editorial disabled:cursor-not-allowed disabled:opacity-45";

const variants: Record<Variant, string> = {
  solid:
    "bg-ink px-8 py-4 text-paper hover:bg-oro border border-ink hover:border-oro",
  outline:
    "border border-line-dark/70 px-8 py-4 text-ink hover:border-ink hover:bg-ink hover:text-paper",
  light:
    "border border-paper/45 px-8 py-4 text-paper hover:border-paper hover:bg-paper hover:text-ink",
  quiet: "text-ink hover:text-oro",
};

export function buttonStyles(variant: Variant = "solid", className?: string) {
  return cx(base, variants[variant], className);
}

export function ButtonLink({
  href,
  children,
  variant = "solid",
  className,
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">) {
  return (
    <Link href={href} className={buttonStyles(variant, className)} {...rest}>
      {children}
      {variant === "quiet" ? <Arrow /> : null}
    </Link>
  );
}

/** Text link with the drawn underline. The house default for inline links. */
export function TextLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cx(
        "link-draw text-ink transition-colors duration-500 ease-editorial hover:text-oro",
        className,
      )}
    >
      {children}
    </Link>
  );
}

/** Small standalone link with an arrow. For section footers. */
export function ArrowLink({
  href,
  children,
  className,
  tone = "ink",
}: {
  href: string;
  children: ReactNode;
  className?: string;
  tone?: "ink" | "paper";
}) {
  return (
    <Link
      href={href}
      className={cx(
        "group inline-flex items-center gap-3 text-[0.6875rem] uppercase tracking-[0.2em] transition-colors duration-500 ease-editorial",
        tone === "ink" ? "text-ink hover:text-oro" : "text-paper/80 hover:text-paper",
        className,
      )}
    >
      <span className="link-draw">{children}</span>
      <Arrow />
    </Link>
  );
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 8"
      aria-hidden="true"
      className={cx(
        "h-2 w-6 shrink-0 transition-transform duration-500 ease-editorial group-hover:translate-x-1.5",
        className,
      )}
      fill="none"
    >
      <path d="M0 4h22.5M18.5 0.5 22.8 4l-4.3 3.5" stroke="currentColor" strokeWidth="0.9" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Structure                                                                  */
/* -------------------------------------------------------------------------- */

export function Rule({ className }: { className?: string }) {
  return <hr className={cx("border-0 border-t border-line", className)} />;
}

/** Pull quote for editorial pages. */
export function PullQuote({
  children,
  attribution,
  className,
}: {
  children: ReactNode;
  attribution?: string;
  className?: string;
}) {
  return (
    <figure className={cx("border-l border-oro/60 pl-6 md:pl-10", className)}>
      <blockquote className="quote-mark text-ink">{children}</blockquote>
      {attribution ? (
        <figcaption className="eyebrow mt-6">{attribution}</figcaption>
      ) : null}
    </figure>
  );
}

/* Image slots live in components/media.tsx. */

/* -------------------------------------------------------------------------- */
/* Proof                                                                      */
/* -------------------------------------------------------------------------- */

/**
 * Numbers first. This audience has been sold sustainability claims their whole
 * adult life, so anywhere we make one, we put the count next to it.
 */
export function Receipts({
  items,
  tone = "ink",
  className,
}: {
  items: { figure: string; label: string; note?: string }[];
  tone?: "ink" | "paper";
  className?: string;
}) {
  const dark = tone === "paper";

  return (
    <dl
      className={cx(
        "grid gap-px",
        items.length === 4
          ? "sm:grid-cols-2 lg:grid-cols-4"
          : "sm:grid-cols-3",
        dark ? "bg-paper/15" : "bg-line",
        className,
      )}
    >
      {items.map((item) => (
        <div
          key={item.label}
          className={cx("px-6 py-8 md:px-8", dark ? "bg-umber" : "bg-bone")}
        >
          <dd
            className={cx(
              "type-display",
              dark ? "text-paper" : "text-ink",
            )}
          >
            {item.figure}
          </dd>
          <dt className={cx("eyebrow mt-5", dark && "text-paper/55")}>
            {item.label}
          </dt>
          {item.note ? (
            <p
              className={cx(
                "mt-3 text-[0.8125rem] leading-relaxed",
                dark ? "text-paper/50" : "text-ash",
              )}
            >
              {item.note}
            </p>
          ) : null}
        </div>
      ))}
    </dl>
  );
}

/**
 * The short answer on top, the full one a tap away. Long-form copy is right for
 * this house, but nobody should have to read an essay to learn the lead time.
 */
export function ShortAnswer({
  question,
  answer,
  children,
  moreLabel = "The longer answer",
  className,
}: {
  question: string;
  answer: ReactNode;
  children?: ReactNode;
  moreLabel?: string;
  className?: string;
}) {
  return (
    <div className={cx("border-t border-line py-8", className)}>
      <h3 className="type-subtitle text-ink">{question}</h3>
      <p className="type-body mt-4 max-w-2xl">{answer}</p>

      {children ? (
        <details className="group mt-5">
          <summary className="inline-flex items-center gap-3 text-[0.6875rem] uppercase tracking-[0.2em] text-ink transition-colors duration-500 hover:text-oro">
            <span className="link-draw">{moreLabel}</span>
            <span
              aria-hidden="true"
              className="text-oro transition-transform duration-500 ease-editorial group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <div className="type-body mt-6 max-w-2xl space-y-5">{children}</div>
        </details>
      ) : null}
    </div>
  );
}

/**
 * Side-by-side comparison without naming anyone. Used to explain price and
 * method against the way most clothing is made.
 */
export function Contrast({
  rows,
  headings,
  className,
}: {
  headings: [string, string];
  rows: [string, string][];
  className?: string;
}) {
  return (
    <div className={cx("hairline-t", className)}>
      <div className="grid grid-cols-2 gap-6 py-5 md:gap-12">
        <p className="eyebrow">{headings[0]}</p>
        <p className="eyebrow text-oro">{headings[1]}</p>
      </div>
      {rows.map(([left, right]) => (
        <div
          key={right}
          className="grid grid-cols-2 gap-6 border-t border-line py-6 md:gap-12"
        >
          <p className="type-body text-ash">{left}</p>
          <p className="type-body text-ink">{right}</p>
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Long-form                                                                  */
/* -------------------------------------------------------------------------- */

/** A numbered sequence. Used for process, ordering and care. */
export function Steps({
  items,
  className,
}: {
  items: { title: string; body: ReactNode }[];
  className?: string;
}) {
  return (
    <ol className={cx("hairline-t", className)}>
      {items.map((item, index) => (
        <li
          key={item.title}
          className="grid gap-4 border-b border-line py-8 md:grid-cols-12 md:gap-8"
        >
          <p className="eyebrow text-oro md:col-span-1">
            {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="type-subtitle text-ink md:col-span-4">{item.title}</h3>
          <div className="type-body md:col-span-7">{item.body}</div>
        </li>
      ))}
    </ol>
  );
}

/** Body copy for essays. Keeps rhythm consistent across every written page. */
export function Prose({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "measure space-y-6 [&_a]:text-ink [&_a]:underline [&_a]:decoration-oro [&_a]:decoration-1 [&_a]:underline-offset-4 [&_h2]:type-title [&_h2]:mt-14 [&_h2]:mb-6 [&_h2]:text-ink [&_h3]:type-subtitle [&_h3]:mt-10 [&_h3]:mb-4 [&_h3]:text-ink [&_li]:type-body [&_p]:type-body [&_ul]:space-y-3 [&_ul]:pl-5 [&_ul]:list-disc [&_ul]:marker:text-oro",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Two columns of copy for pages that need to compare or pair ideas. */
export function ColumnPair({
  items,
  className,
}: {
  items: { heading: string; body: ReactNode }[];
  className?: string;
}) {
  return (
    <div className={cx("grid gap-10 md:grid-cols-2 md:gap-14", className)}>
      {items.map((item) => (
        <div key={item.heading} className="border-t border-line pt-6">
          <h3 className="type-subtitle text-ink">{item.heading}</h3>
          <div className="type-body mt-4">{item.body}</div>
        </div>
      ))}
    </div>
  );
}
