"use client";

import { useActionState } from "react";
import { sendCustomerLink } from "./actions";

export function AccountLogin() {
  const [state, action, pending] = useActionState(sendCustomerLink, null);
  if (state?.sent)
    return (
      <p role="status" className="mt-8 border border-olive/50 bg-white px-4 py-4 text-[0.9375rem]">
        Check your inbox for a sign-in link and open it on this device. It can take a minute; check spam too.
      </p>
    );
  return (
    <form action={action} className="mt-8">
      <label className="cap text-ash" htmlFor="email">Email</label>
      <input id="email" name="email" type="email" required autoComplete="email" className="mt-2 block w-full border-b border-line bg-transparent py-3 outline-none focus:border-bur" />
      {state?.error && (
        <p role="alert" className="mt-4 border border-error bg-error-soft px-4 py-3 text-[0.875rem] text-error-ink">{state.error}</p>
      )}
      <button disabled={pending} className="btn mt-8 w-full border-bur bg-bur text-shell hover:bg-ink disabled:opacity-60">
        {pending ? "Sending…" : "Send sign-in link"}
      </button>
    </form>
  );
}
