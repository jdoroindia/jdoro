import type { ReactNode } from "react";

/** Shared layout for policy pages: plain, readable, one column. */
export function LegalPage({ title, updated, intro, children }: { title: string; updated: string; intro: string; children: ReactNode }) {
  return (
    <article className="mx-auto max-w-2xl px-5 py-16 md:py-20">
      <p className="cap text-olive">Last updated {updated}</p>
      <h1 className="mt-3 font-display text-[clamp(2.25rem,4vw,3.25rem)] font-normal leading-tight text-bur">{title}</h1>
      <p className="mt-5 text-[1rem] leading-relaxed text-graphite">{intro}</p>
      <div className="mt-10 space-y-10 text-[0.9375rem] leading-[1.8] text-graphite [&_a]:underline [&_a]:underline-offset-2 [&_b]:font-medium [&_b]:text-ink [&_li]:mt-1.5 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5">
        {children}
      </div>
    </article>
  );
}

export function Clause({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-2xl font-normal text-ink">{title}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}
