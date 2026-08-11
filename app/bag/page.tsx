import type { Metadata } from "next";
import { ButtonLink, Eyebrow, Rule } from "@/components/ui";
import { bag, trust } from "@/lib/microcopy";

export const metadata: Metadata = {
  title: "Your bag",
  robots: { index: false, follow: false },
};

/**
 * Empty state only, for now. The live bag arrives with the commerce phase;
 * this page exists so the copy and layout of the empty state are settled first.
 */
export default function BagPage() {
  return (
    <section className="shell py-20 md:py-28">
      <Eyebrow>{bag.label}</Eyebrow>
      <Rule className="mt-6" />

      <div className="grid gap-12 py-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h1 className="type-display text-ink">{bag.emptyHeading}</h1>
          <p className="type-body mt-7 max-w-xl">{bag.emptyBody}</p>

          <div className="mt-11 flex flex-wrap items-center gap-x-8 gap-y-4">
            <ButtonLink href={bag.emptyPrimary.href}>
              {bag.emptyPrimary.label}
            </ButtonLink>
            <ButtonLink href={bag.emptySecondary.href} variant="outline">
              {bag.emptySecondary.label}
            </ButtonLink>
          </div>
        </div>

        <aside className="lg:col-span-4 lg:col-start-9">
          <p className="eyebrow">Worth knowing</p>
          <ul className="mt-6 space-y-4">
            {[
              trust.readyLeadTime,
              trust.measureLeadTime,
              trust.alterations,
              trust.packaging,
            ].map(
              (line) => (
                <li key={line} className="type-body border-t border-line pt-4">
                  {line}
                </li>
              ),
            )}
          </ul>
        </aside>
      </div>
    </section>
  );
}
