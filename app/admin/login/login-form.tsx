"use client";

import { useActionState } from "react";
import { sendLoginLink } from "../actions";

export function LoginForm() {
  const [state, action, pending] = useActionState(sendLoginLink, null);

  if (state?.sent)
    return (
      <p role="status" className="mt-8 border border-olive/50 bg-white px-4 py-4 text-[0.9375rem] text-ink">
        If that email is on the admin list, a sign-in link is on its way. Open it on this device. Check spam if it isn’t there in a minute.
      </p>
    );

  return (
    <form action={action} className="mt-8">
      <label className="cap text-ash" htmlFor="email">
        Email
      </label>
      <input
        id="email"
        name="email"
        type="email"
        required
        autoComplete="email"
        className="mt-2 block w-full border-b border-line bg-transparent py-3 text-[1rem] outline-none focus:border-bur"
      />
      {state?.error && (
        <p role="alert" className="mt-4 border border-error bg-error-soft px-4 py-3 text-[0.875rem] text-error-ink">
          {state.error}
        </p>
      )}
      <button disabled={pending} className="btn mt-8 w-full border-bur bg-bur text-shell hover:bg-ink disabled:opacity-60">
        {pending ? "Sending…" : "Send sign-in link"}
      </button>
    </form>
  );
}
