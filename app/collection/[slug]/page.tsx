import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Media } from "@/components/media";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { SizeSelector } from "@/components/size-selector";
import { ArrowLink, Eyebrow, ShortAnswer } from "@/components/ui";
import { badges, labels } from "@/lib/microcopy";
import {
  findProduct,
  formatPrice,
  garmentsRemaining,
  products,
} from "@/lib/products";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = findProduct(slug);
  if (!product) return { title: "Piece not found" };

  return {
    title: product.name,
    description: `${product.line} ${product.fabric.composition}, ${product.fabric.weight}. ${
      product.fabric.source === "deadstock"
        ? "Cut from surplus fabric."
        : "Cut from natural fibre."
    } Ready to ship or made to your measurements.`,
    alternates: { canonical: `/collection/${product.slug}` },
    openGraph: {
      title: `${product.name} — ${site.name}`,
      description: product.line,
      type: "website",
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = findProduct(slug);
  if (!product) notFound();

  const remaining = garmentsRemaining(product);
  const others = products
    .filter((item) => item.slug !== product.slug)
    .slice(0, 3);

  /* Structured data, so search results show the price and availability. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.standfirst,
    brand: { "@type": "Brand", name: site.plainName },
    material: product.fabric.composition,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "INR",
      availability:
        remaining > 0 || product.sizes.some((size) => size.state === "ready")
          ? "https://schema.org/InStock"
          : "https://schema.org/Discontinued",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav aria-label="Breadcrumb" className="shell pt-8">
        <ol className="flex flex-wrap items-center gap-3 text-[0.6875rem] uppercase tracking-[0.2em] text-ash">
          <li>
            <Link href="/collection" className="link-draw hover:text-oro">
              The collection
            </Link>
          </li>
          <li aria-hidden="true">·</li>
          <li className="text-ink">{product.name}</li>
        </ol>
      </nav>

      <section className="shell grid gap-12 py-10 md:py-14 lg:grid-cols-12 lg:gap-10">
        {/* Gallery */}
        <div className="lg:col-span-7">
          <div className="grid gap-4 sm:grid-cols-2">
            {product.shots.map((shot, index) => (
              <Media
                key={shot.note}
                src={shot.image}
                alt={shot.note}
                texture={shot.texture}
                tone={shot.tone}
                ratio={index === 0 ? "3 / 4" : "1 / 1"}
                priority={index === 0}
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                caption={shot.note}
                className={index === 0 ? "sm:col-span-2" : undefined}
              />
            ))}
          </div>
        </div>

        {/* Purchase column */}
        <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
          <Eyebrow className="text-oro">
            {product.fabric.source === "deadstock"
              ? badges.deadstock
              : badges.naturalFibre}
          </Eyebrow>

          <h1 className="type-display mt-5 text-ink">{product.name}</h1>

          <p className="mt-5 text-[1rem] tracking-wide text-graphite">
            {formatPrice(product.price)}
            <span className="type-caption ml-3">Inclusive of all taxes</span>
          </p>

          <p className="type-lede mt-7">{product.standfirst}</p>

          <p className="type-caption mt-6">
            {remaining > 0
              ? `${remaining} more can be cut from what is left of this roll — ${product.metresLeft} metres, at ${product.metresPerGarment} metres a garment.`
              : "The roll is finished. What was cut is all there will ever be."}
          </p>

          <div className="mt-9">
            <SizeSelector product={product} />
          </div>
        </div>
      </section>

      {/* Specification */}
      <section className="hairline-t bg-paper">
        <div className="shell grid gap-12 py-16 md:py-20 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <h2 className="type-title text-ink">The fabric</h2>
            <dl className="mt-8 space-y-5">
              {[
                { term: labels.cloth, detail: product.fabric.name },
                { term: labels.origin, detail: product.fabric.origin },
                { term: labels.composition, detail: product.fabric.composition },
                { term: labels.weight, detail: product.fabric.weight },
                { term: labels.trims, detail: product.trims },
                {
                  term: labels.madeIn,
                  detail: `Cut, sewn and pressed in ${site.madeIn}`,
                },
              ].map((row) => (
                <div key={row.term} className="border-t border-line pt-4">
                  <dt className="eyebrow">{row.term}</dt>
                  <dd className="mt-2 text-[0.9375rem] leading-relaxed text-graphite">
                    {row.detail}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <h2 className="type-title text-ink">{labels.finishing}</h2>
            <ul className="mt-8 space-y-5">
              {product.finishing.map((line) => (
                <li key={line} className="border-t border-line pt-4">
                  <p className="type-body">{line}</p>
                </li>
              ))}
            </ul>

            <div className="mt-12">
              <ShortAnswer
                question={labels.measurementsHeading}
                answer={product.fit}
              >
                <p>
                  If you are between sizes, send us your bust, waist and hip and
                  we will tell you which to take. Where a size has sold out of the
                  cut run, we can make it for you from what is left of the roll at
                  the same price — the only difference is the wait.
                </p>
              </ShortAnswer>

              <ShortAnswer question={labels.careHeading} answer={product.care}>
                <p>
                  The full guide covers washing, pressing, storage and what to do
                  when something tears. We repair anything we have made, for as
                  long as you own it, at cost.
                </p>
                <p>
                  <ArrowLink href="/care">Open the care guide</ArrowLink>
                </p>
              </ShortAnswer>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-sell */}
      <section className="hairline-t bg-bone">
        <div className="shell py-16 md:py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="type-title text-ink">Also on the table</h2>
            <ArrowLink href="/collection">See everything</ArrowLink>
          </div>
          <div className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((item, index) => (
              <Reveal key={item.slug} delay={index * 90}>
                <ProductCard
                  product={item}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
