"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

/** Saved pieces, kept in the browser so no sign-in is needed. */
type Ctx = { slugs: string[]; ready: boolean; has: (s: string) => boolean; toggle: (s: string) => void };
const WishlistContext = createContext<Ctx | null>(null);
const KEY = "jdoro.wishlist.v1";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate once from storage
      if (raw) setSlugs(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) localStorage.setItem(KEY, JSON.stringify(slugs));
  }, [slugs, ready]);

  const toggle = useCallback((s: string) => setSlugs((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s])), []);
  const value = useMemo(() => ({ slugs, ready, has: (s: string) => slugs.includes(s), toggle }), [slugs, ready, toggle]);
  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const c = useContext(WishlistContext);
  if (!c) throw new Error("useWishlist must be inside WishlistProvider");
  return c;
}
