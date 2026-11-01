"use client";

import Link from "next/link";
import { useEffect } from "react";
import { site } from "@/lib/site";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => console.error(error), [error]);
  return (
    <section className="mx-auto flex max-w-[88rem] flex-col items-start px-5 py-28 md:px-10">
      <p className="cap text-berry">Something went wrong</p>
      <h1 className="mt-4 font-display text-[clamp(2.25rem,5vw,3.5rem)] font-normal leading-tight text-bur">That didn’t load. Your bag is safe.</h1>
      <p className="mt-4 max-w-md text-[0.9375rem] text-graphite">
        Try again in a moment. If it keeps happening, WhatsApp us on {site.contact.phone}.
      </p>
      <div className="mt-9 flex flex-wrap gap-3">
        <button onClick={reset} className="btn border-bur bg-bur text-shell hover:bg-ink">Try again</button>
        <Link href="/" className="btn text-ink hover:bg-ink hover:text-shell">Home</Link>
      </div>
    </section>
  );
}
