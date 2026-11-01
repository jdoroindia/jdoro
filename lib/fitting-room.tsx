"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useCatalog } from "@/lib/catalog-context";

/** One piece in the look. Stored in localStorage so it survives reloads. */
export type LookItem = {
  slug: string;
  colour: string;
  /** A standard size, or "Custom" for made to measure. */
  size: string;
  /** Present when size is "Custom", e.g. "Bust 34″, Waist 28″, Hip 38″". */
  measurements?: string;
};

type Ctx = {
  items: LookItem[];
  ready: boolean;
  add: (item: LookItem) => void;
  remove: (slug: string) => void;
  update: (slug: string, patch: Partial<LookItem>) => void;
  toggle: (slug: string) => void;
  has: (slug: string) => boolean;
  total: number;
  clear: () => void;
};

const FittingRoomContext = createContext<Ctx | null>(null);
const KEY = "jdoro.fitting-room.v1";

export function FittingRoomProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<LookItem[]>([]);
  const [ready, setReady] = useState(false);
  const { find: findProduct } = useCatalog();

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as LookItem[];
        // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate once from storage
        setItems(parsed.filter((i) => findProduct(i.slug)));
      }
    } catch {}
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- hydrate once
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(KEY, JSON.stringify(items));
  }, [items, ready]);

  const add = useCallback((item: LookItem) => {
    setItems((prev) => [...prev.filter((i) => i.slug !== item.slug), item]);
  }, []);
  const remove = useCallback((slug: string) => setItems((prev) => prev.filter((i) => i.slug !== slug)), []);
  const update = useCallback(
    (slug: string, patch: Partial<LookItem>) =>
      setItems((prev) => prev.map((i) => (i.slug === slug ? { ...i, ...patch } : i))),
    [],
  );
  const toggle = useCallback((slug: string) => {
    setItems((prev) => {
      if (prev.some((i) => i.slug === slug)) return prev.filter((i) => i.slug !== slug);
      const p = findProduct(slug);
      if (!p) return prev;
      return [...prev, { slug, colour: p.colours[0]?.name ?? "", size: "S" }];
    });
  }, [findProduct]);

  const value = useMemo<Ctx>(() => {
    const total = items.reduce((sum, i) => sum + (findProduct(i.slug)?.price ?? 0), 0);
    return {
      items,
      ready,
      add,
      remove,
      update,
      toggle,
      has: (slug) => items.some((i) => i.slug === slug),
      total,
      clear: () => setItems([]),
    };
  }, [items, ready, add, remove, update, toggle, findProduct]);

  return <FittingRoomContext.Provider value={value}>{children}</FittingRoomContext.Provider>;
}

export function useFittingRoom() {
  const ctx = useContext(FittingRoomContext);
  if (!ctx) throw new Error("useFittingRoom must be used inside FittingRoomProvider");
  return ctx;
}
