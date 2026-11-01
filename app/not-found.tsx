import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-[88rem] flex-col items-start px-5 py-28 md:px-10">
      <p className="cap text-berry">404</p>
      <h1 className="mt-4 font-display text-[clamp(2.5rem,5vw,4rem)] font-normal leading-tight text-bur">
        This piece isn’t on the rail.
      </h1>
      <p className="mt-4 max-w-md text-[0.9375rem] text-graphite">It may have sold out with the last of its fabric.</p>
      <div className="mt-9 flex gap-3">
        <Link href="/shop" className="btn border-bur bg-bur text-shell hover:bg-ink hover:border-ink">
          Shop the drop
        </Link>
        <Link href="/" className="btn text-ink hover:bg-ink hover:text-shell">
          Home
        </Link>
      </div>
    </section>
  );
}
