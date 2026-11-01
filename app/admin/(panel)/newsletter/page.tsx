import { serverClient } from "@/lib/supabase/server";
import { ComposeForm } from "./compose-form";

export default async function NewsletterAdmin() {
  const supabase = await serverClient();
  const [{ data: subs }, { data: sent }] = await Promise.all([
    supabase.from("subscribers").select("email, created_at, unsubscribed_at, source").order("created_at", { ascending: false }),
    supabase.from("newsletters").select("subject, sent_to, sent_at, sent_by").order("sent_at", { ascending: false }).limit(20),
  ]);
  const active = (subs ?? []).filter((s) => !s.unsubscribed_at);
  const csv = "data:text/csv;charset=utf-8," + encodeURIComponent("email,signed_up,source\n" + active.map((s) => `${s.email},${s.created_at.slice(0, 10)},${s.source ?? ""}`).join("\n"));

  return (
    <>
      <h1 className="font-display text-3xl font-normal text-bur">Newsletter</h1>
      <p className="mt-1 text-[0.8125rem] text-ash">
        {active.length} subscribed · {(subs ?? []).length - active.length} unsubscribed ·{" "}
        <a href={csv} download="jdoro-subscribers.csv" className="underline">Download list</a>
      </p>

      <ComposeForm count={active.length} />

      <div className="mt-14 grid gap-10 md:grid-cols-2">
        <section>
          <h2 className="cap text-ash">Sent</h2>
          {!sent?.length && <p className="mt-3 text-[0.875rem] text-graphite">Nothing sent yet.</p>}
          <ul className="mt-3 divide-y divide-line border-y border-line text-[0.875rem]">
            {(sent ?? []).map((n, i) => (
              <li key={i} className="py-2.5">
                {n.subject}
                <span className="block text-[0.75rem] text-ash">
                  {new Date(n.sent_at).toLocaleDateString("en-IN", { dateStyle: "medium" })} · {n.sent_to} people · {n.sent_by}
                </span>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="cap text-ash">Latest sign-ups</h2>
          <ul className="mt-3 divide-y divide-line border-y border-line text-[0.875rem]">
            {active.slice(0, 15).map((s) => (
              <li key={s.email} className="flex justify-between gap-3 py-2.5">
                <span className="truncate">{s.email}</span>
                <span className="shrink-0 text-[0.75rem] text-ash">{new Date(s.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
