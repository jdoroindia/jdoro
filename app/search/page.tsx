import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchResults } from "./search-results";

export const metadata: Metadata = { title: "Search", robots: { index: false } };

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-[88rem] px-5 py-14 md:px-10 lg:py-20">
      <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-normal leading-none text-bur">Search</h1>
      <Suspense>
        <SearchResults />
      </Suspense>
    </div>
  );
}
