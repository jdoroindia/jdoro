import { ButtonLink, Eyebrow } from "@/components/ui";
import { errors } from "@/lib/microcopy";
import { siteMap } from "@/lib/site";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shell py-24 md:py-36">
      <Eyebrow>404</Eyebrow>
      <h1 className="type-display mt-7 max-w-2xl text-ink">
        {errors.notFoundHeading}
      </h1>
      <p className="type-body mt-7 max-w-xl">{errors.notFoundBody}</p>

      <div className="mt-11">
        <ButtonLink href="/collection">See the collection</ButtonLink>
      </div>

      <div className="mt-20 grid gap-10 border-t border-line pt-12 sm:grid-cols-2 lg:grid-cols-4">
        {siteMap.map((column) => (
          <nav key={column.heading} aria-label={column.heading}>
            <p className="eyebrow">{column.heading}</p>
            <ul className="mt-5 space-y-3">
              {column.links.map((link) => (
                <li key={`${column.heading}-${link.href}`}>
                  <Link
                    href={link.href}
                    className="text-sm text-graphite transition-colors duration-500 hover:text-oro"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
    </section>
  );
}
