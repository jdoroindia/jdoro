"use client";

import { useActionState } from "react";
import { subscribe } from "@/app/newsletter/actions";
import { cx } from "@/lib/cx";

/** Email sign-up. `tone="dark"` for the footer. */
export function Newsletter({ tone = "light", source }: { tone?: "light" | "dark"; source: string }) {
  const [state, action, pending] = useActionState(subscribe, null);
  const dark = tone === "dark";

  if (state?.ok)
    return (
      <p role="status" className={cx("text-[0.9375rem]", dark ? "text-shell" : "text-olive")}>
        ✓ {state.message}
      </p>
    );

  return (
    <form action={action} className="w-full max-w-md">
      <input type="hidden" name="source" value={source} />
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      <div className={cx("flex border-b", dark ? "border-shell/40 focus-within:border-shell" : "border-ink/30 focus-within:border-bur")}>
        <label htmlFor={`nl-${source}`} className="sr-only">
          Email address
        </label>
        <input
          id={`nl-${source}`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Your email"
          className={cx("min-w-0 flex-1 bg-transparent py-3 text-[0.9375rem] outline-none", dark ? "text-shell placeholder:text-shell/50" : "")}
        />
        <button disabled={pending} className={cx("cap shrink-0 px-2 disabled:opacity-50", dark ? "text-shell" : "text-bur")}>
          {pending ? "…" : "Sign up →"}
        </button>
      </div>
      {state && !state.ok && (
        <p role="alert" className={cx("mt-2 text-[0.8125rem]", dark ? "text-candy" : "text-error-ink")}>
          {state.message}
        </p>
      )}
      <p className={cx("mt-2 text-[0.6875rem]", dark ? "text-shell/50" : "text-ash")}>New drops and last-metre pieces. Once or twice a month. Unsubscribe anytime.</p>
    </form>
  );
}
