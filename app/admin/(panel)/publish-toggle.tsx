"use client";

import { useTransition } from "react";
import { setPublished } from "../actions";
import { cx } from "@/lib/cx";

export function PublishToggle({ slug, published }: { slug: string; published: boolean }) {
  const [pending, start] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => start(() => setPublished(slug, !published))}
      className={cx(
        "cap shrink-0 border px-2.5 py-1.5 text-[0.5625rem] disabled:opacity-50",
        published ? "border-olive bg-olive text-shell" : "border-mist text-ash",
      )}
      title={published ? "Live on the site. Tap to hide." : "Hidden. Tap to put it live."}
    >
      {published ? "Live" : "Hidden"}
    </button>
  );
}
