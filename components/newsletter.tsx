"use client";

import { useState } from "react";
import { buttons, errors, forms } from "@/lib/microcopy";
import { cx } from "@/lib/cx";

/**
 * The letter sign-up. Validates in the browser and confirms in place.
 * The submit handler is the single point to wire to an email provider later —
 * nothing else in the component needs to change.
 */
export function Newsletter({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  const dark = tone === "dark";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setState("error");
      return;
    }
    setState("sending");
    // TODO: post to the mailing provider. Confirming optimistically for now.
    setState("done");
  }

  if (state === "done") {
    return (
      <p
        role="status"
        className={cx(
          "type-body max-w-sm",
          dark ? "text-paper/75" : "text-graphite",
        )}
      >
        {forms.newsletterSuccess}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-sm">
      <label
        htmlFor="letter-email"
        className={cx("eyebrow block", dark && "text-paper/55")}
      >
        {forms.emailLabel}
      </label>

      <div
        className={cx(
          "mt-4 flex items-center gap-4 border-b pb-3 transition-colors duration-500",
          dark
            ? "border-paper/25 focus-within:border-paper/70"
            : "border-line focus-within:border-ink",
        )}
      >
        <input
          id="letter-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (state === "error") setState("idle");
          }}
          placeholder={forms.emailPlaceholder}
          aria-invalid={state === "error"}
          aria-describedby={state === "error" ? "letter-email-error" : undefined}
          className={cx(
            "w-full bg-transparent text-sm tracking-wide outline-none placeholder:text-mist",
            dark ? "text-paper" : "text-ink",
          )}
        />
        <button
          type="submit"
          disabled={state === "sending"}
          className={cx(
            "shrink-0 text-[0.6875rem] uppercase tracking-[0.2em] transition-colors duration-500",
            dark
              ? "text-paper/70 hover:text-oro-soft"
              : "text-ink hover:text-oro",
          )}
        >
          {state === "sending" ? buttons.submitting : buttons.subscribe}
        </button>
      </div>

      {state === "error" ? (
        <p
          id="letter-email-error"
          role="alert"
          className={cx("mt-3 text-[0.8125rem]", dark ? "text-oro-soft" : "text-oro")}
        >
          {errors.invalidEmail}
        </p>
      ) : null}

      <p
        className={cx(
          "mt-4 text-[0.75rem] leading-relaxed",
          dark ? "text-paper/45" : "text-ash",
        )}
      >
        {forms.consent}
      </p>
    </form>
  );
}
