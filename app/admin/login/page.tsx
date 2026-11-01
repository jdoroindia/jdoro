import type { Metadata } from "next";
import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: "Admin login", robots: { index: false } };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <section className="mx-auto max-w-md px-5 py-20">
      <p className="cap text-olive">JD’ORO admin</p>
      <h1 className="mt-3 font-display text-4xl font-normal text-bur">Sign in</h1>
      <p className="mt-3 text-[0.9375rem] text-graphite">Enter your email and we’ll send you a sign-in link. No password needed.</p>
      {error && (
        <p role="alert" className="mt-6 border border-error bg-error-soft px-4 py-3 text-[0.875rem] text-error-ink">
          That link has expired or was already used. Ask for a new one.
        </p>
      )}
      <LoginForm />
    </section>
  );
}
