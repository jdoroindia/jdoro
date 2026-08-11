import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { ArrowLink, Eyebrow } from "@/components/ui";
import { cx } from "@/lib/cx";
import {
  categoryLabels,
  garmentsRemaining,
  products,
  type Product,
} from "@/lib/products";

export const metadata: Metadata = {
  title: "The collection",
  description:
    "Every piece we currently make, with the fabric it was cut from and how much of that fabric is left. Ready to ship, or cut to your measurements.",
  alternates: { canonical: "/collection" },
};

const filters = [
  { label: "Everything", key: null as string | null, param: "category" },
  { label: "Tailoring", key: "tailoring", param: "category" },
  { label: "Dresses", key: "dresses", param: "category" },
  { label: "Shirting", key: "shirting", param: "category" },
  { label: "Skirts", key: "skirts", param: "category" },
];

const availabilityFilters = [
  { label: "Ready to ship", key: "ready" },
  { label: "Final metres", key: "final-metres" },
];

function matches(
  product: Product,
  category?: string,
  availability?: string,
): boolean {
  if (category && product.category !== category) return false;

  if (availability === "ready") {
    return product.sizes.some((size) => size.state === "ready");
  }

  if (availability === "final-metres") {
    const left = garmentsRemaining(product);
    return left > 0 && left <= 2;
  }

  return true;
}

export default async function CollectionPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; availability?: string }>;
}) {
  const { category, availability } = await searchParams;
  const shown = products.filter((product) =>
    matches(product, category, availability),
  );

  const href = (next: { category?: string; availability?: string }) => {
    const params = new URLSearchParams();
    const merged = { category, availability, ...next };
    if (merged.category) params.set("category", merged.category);
    if (merged.availability) params.set("availability", merged.availability);
    const query = params.toString();
    return query ? `/collection?${query}` : "/collection";
  };

  return (
    <>
      <PageHero
        eyebrow={`The collection · ${products.length} pieces`}
        title="Small in number, and it stays that way."
        lede="Each piece below names the roll it was cut from and how many more can be made from what is left. Nothing here will be reissued in a different fabric once the roll is finished."
      />

      {/* Filters. Plain links, so the page works without JavaScript. */}
      <section className="hairline-t hairline-b bg-paper">
        <div className="shell flex flex-wrap items-center gap-x-8 gap-y-4 py-5">
          <Eyebrow className="mr-2">Refine</Eyebrow>

          {filters.map((filter) => {
            const active = (category ?? null) === filter.key;
            return (
              <Link
                key={filter.label}
                href={href({ category: filter.key ?? undefined })}
                className={cx(
                  "text-[0.6875rem] uppercase tracking-[0.2em] transition-colors duration-500",
                  active ? "text-oro" : "text-ink hover:text-oro",
                )}
              >
                <span className={active ? "link-drawn" : "link-draw"}>
                  {filter.label}
                </span>
              </Link>
            );
          })}

          <span className="hidden h-4 w-px bg-line sm:block" aria-hidden="true" />

          {availabilityFilters.map((filter) => {
            const active = availability === filter.key;
            return (
              <Link
                key={filter.key}
                href={href({
                  availability: active ? undefined : filter.key,
                })}
                className={cx(
                  "text-[0.6875rem] uppercase tracking-[0.2em] transition-colors duration-500",
                  active ? "text-oro" : "text-ash hover:text-oro",
                )}
              >
                <span className={active ? "link-drawn" : "link-draw"}>
                  {filter.label}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-bone">
        <div className="shell py-16 md:py-20">
          {shown.length ? (
            <>
              <p className="type-caption">
                {shown.length} {shown.length === 1 ? "piece" : "pieces"}
                {category ? ` in ${categoryLabels[category as Product["category"]] ?? category}` : ""}
              </p>

              <div className="mt-10 grid gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
                {shown.map((product, index) => (
                  <Reveal key={product.slug} delay={(index % 3) * 90}>
                    <ProductCard
                      product={product}
                      priority={index < 3}
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                    />
                  </Reveal>
                ))}
              </div>
            </>
          ) : (
            <div className="max-w-xl py-10">
              <h2 className="type-title text-ink">
                Nothing matches that combination.
              </h2>
              <p className="type-body mt-6">
                The collection is small enough that some filters come up empty.
                Clear them, or tell us what you are looking for and we will say
                whether the fabric exists.
              </p>
              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
                <ArrowLink href="/collection">See everything</ArrowLink>
                <ArrowLink href="/contact">Write to the atelier</ArrowLink>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="hairline-t bg-paper">
        <div className="shell grid gap-10 py-16 md:grid-cols-2 md:py-20">
          <div>
            <h2 className="type-title text-ink">
              Your size is not listed?
            </h2>
            <p className="type-body mt-6 max-w-lg">
              A size showing as sold out means the pieces we cut in it have gone,
              not that the piece is finished. If there is fabric left on the roll,
              we will cut it for you in three to five weeks at the same price.
            </p>
            <div className="mt-8">
              <ArrowLink href="/made-to-order">How that works</ArrowLink>
            </div>
          </div>
          <div>
            <h2 className="type-title text-ink">
              Not sure which size you are?
            </h2>
            <p className="type-body mt-6 max-w-lg">
              Send us three measurements — bust, waist, hip — and we will tell you
              which size to take, or whether it is worth cutting one for you. No
              obligation and no sales call.
            </p>
            <div className="mt-8">
              <ArrowLink href="/contact">Ask about fit</ArrowLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
