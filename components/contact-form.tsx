"use client";

import { useState } from "react";
import { buttonStyles } from "@/components/ui";
import { cx } from "@/lib/cx";
import { buttons, errors, forms } from "@/lib/microcopy";

const subjects = [
  "A question about fit or sizing",
  "A question about a fabric",
  "A repair or alteration",
  "An order I have placed",
  "Press or stockist enquiry",
  "Something else",
];

/**
 * The enquiry form. Validated in the browser and confirmed in place.
 * `handleSubmit` is the single point to wire to a mail service or route handler.
 */
export function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [invalid, setInvalid] = useState<string[]>([]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const missing: string[] = [];
    if (!String(data.get("name") ?? "").trim()) missing.push("name");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(data.get("email") ?? "")))
      missing.push("email");
    if (!String(data.get("message") ?? "").trim()) missing.push("message");

    setInvalid(missing);
    if (missing.length) return;

    setState("sending");
    // TODO: post to a route handler that forwards to the atelier inbox.
    setState("done");
  }

  if (state === "done") {
    return (
      <div role="status" className="border-t border-line pt-8">
        <h2 className="type-title text-ink">{buttons.sent}</h2>
        <p className="type-body mt-5 max-w-lg">{forms.contactSuccess}</p>
      </div>
    );
  }

  const field =
    "mt-3 w-full border-b border-line bg-transparent pb-3 text-[0.9375rem] text-ink outline-none transition-colors duration-500 placeholder:text-mist focus:border-ink";

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-xl">
      <div className="space-y-9">
        <div>
          <label htmlFor="name" className="eyebrow">
            Your name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder={forms.namePlaceholder}
            aria-invalid={invalid.includes("name")}
            className={cx(field, invalid.includes("name") && "border-oro")}
          />
          {invalid.includes("name") ? (
            <p className="mt-2 text-[0.8125rem] text-oro">
              {errors.requiredField}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="email" className="eyebrow">
            {forms.emailLabel}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder={forms.emailPlaceholder}
            aria-invalid={invalid.includes("email")}
            className={cx(field, invalid.includes("email") && "border-oro")}
          />
          {invalid.includes("email") ? (
            <p className="mt-2 text-[0.8125rem] text-oro">
              {errors.invalidEmail}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="subject" className="eyebrow">
            What it is about
          </label>
          <select
            id="subject"
            name="subject"
            defaultValue={subjects[0]}
            className={cx(field, "appearance-none")}
          >
            {subjects.map((subject) => (
              <option key={subject}>{subject}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="message" className="eyebrow">
            Your message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder={forms.messagePlaceholder}
            aria-invalid={invalid.includes("message")}
            className={cx(field, "resize-none", invalid.includes("message") && "border-oro")}
          />
          {invalid.includes("message") ? (
            <p className="mt-2 text-[0.8125rem] text-oro">
              {errors.requiredField}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="measurements" className="eyebrow">
            Bust, waist, hip{" "}
            <span className="text-mist">{forms.optionalSuffix}</span>
          </label>
          <input
            id="measurements"
            name="measurements"
            type="text"
            placeholder="86 · 68 · 94 cm"
            className={field}
          />
          <p className="type-caption mt-3">
            Only if you are asking about fit. We keep measurements against your
            order and nothing else.
          </p>
        </div>
      </div>

      <div className="mt-11">
        <button
          type="submit"
          disabled={state === "sending"}
          className={buttonStyles("solid", "w-full sm:w-auto")}
        >
          {state === "sending" ? buttons.submitting : buttons.sendMessage}
        </button>
      </div>
    </form>
  );
}
