"use client";

import { useActionState } from "react";
import { saveDrop } from "../../actions";
import { Field, inputCls } from "../products/product-form";

export function DropForm({ initial }: { initial: { number: string; name: string; line: string; intro: string } }) {
  const [state, action, pending] = useActionState(saveDrop, null);
  return (
    <form action={action} className="mt-8 grid max-w-xl gap-6">
      <div className="grid grid-cols-[6rem_1fr] gap-4">
        <Field label="Drop no.">
          <input name="number" defaultValue={initial.number} className={inputCls} />
        </Field>
        <Field label="Drop name">
          <input name="name" defaultValue={initial.name} className={inputCls} />
        </Field>
      </div>
      <Field label="Headline (home page)" hint="The big line, e.g. “Made slow. Worn often.”">
        <input name="line" defaultValue={initial.line} className={inputCls} />
      </Field>
      <Field label="Intro" hint="One or two sentences under the headline.">
        <textarea name="intro" rows={3} defaultValue={initial.intro} className={inputCls} />
      </Field>
      {state && (
        <p role="status" className={state.ok ? "text-olive" : "border border-error bg-error-soft px-4 py-3 text-error-ink"}>
          {state.message}
        </p>
      )}
      <button disabled={pending} className="btn w-fit border-bur bg-bur text-shell hover:bg-ink disabled:opacity-60">
        {pending ? "Saving…" : "Save drop text"}
      </button>
    </form>
  );
}
