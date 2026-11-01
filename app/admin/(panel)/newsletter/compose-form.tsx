"use client";

import { useActionState, useRef } from "react";
import { sendNewsletter } from "../../actions";
import { inputCls } from "../products/product-form";

export function ComposeForm({ count }: { count: number }) {
  const [state, action, pending] = useActionState(sendNewsletter, null);
  const mode = useRef<HTMLInputElement>(null);

  return (
    <form action={action} className="mt-8 grid max-w-2xl gap-5 border border-line bg-white p-6">
      <input ref={mode} type="hidden" name="mode" value="test" />
      <label className="block">
        <span className="cap text-[0.625rem] text-ash">Subject</span>
        <input name="subject" required className={inputCls} placeholder="Drop 02 is here" />
      </label>
      <label className="block">
        <span className="cap text-[0.625rem] text-ash">Message</span>
        <textarea name="body" required rows={8} className={inputCls} placeholder={"Write it like a note to a friend.\n\nLeave a blank line between paragraphs. Paste links as they are."} />
      </label>
      {state && (
        <p role="status" className={state.ok ? "text-[0.875rem] text-olive" : "border border-error bg-error-soft px-3 py-2 text-[0.875rem] text-error-ink"}>
          {state.message}
        </p>
      )}
      <div className="flex flex-wrap gap-3">
        <button disabled={pending} onClick={() => mode.current && (mode.current.value = "test")} className="btn text-ink hover:bg-ink hover:text-shell disabled:opacity-50">
          Send me a test
        </button>
        <button
          disabled={pending || count === 0}
          onClick={(e) => {
            if (!confirm(`Send this to all ${count} subscribers? This can’t be undone.`)) return e.preventDefault();
            if (mode.current) mode.current.value = "all";
          }}
          className="btn border-bur bg-bur text-shell hover:bg-ink disabled:opacity-50"
        >
          {pending ? "Sending…" : `Send to ${count} subscriber${count === 1 ? "" : "s"}`}
        </button>
      </div>
    </form>
  );
}
