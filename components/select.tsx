"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { cx } from "@/lib/cx";

export type SelectOption = { value: string; label: string; hint?: string };

/**
 * Themed replacement for the native <select>, which renders an OS-styled list
 * (blue highlight, system font) that can't be styled. Follows the WAI-ARIA
 * listbox pattern: arrow keys, Home/End, Enter/Space, Escape and type-ahead.
 * When `name` is set a hidden input carries the value, so it works inside forms.
 */
export function Select({
  value,
  onChange,
  options,
  label,
  name,
  size = "sm",
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  /** Accessible name. */
  label: string;
  name?: string;
  size?: "sm" | "md";
  className?: string;
}) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const typed = useRef({ text: "", at: 0 });
  const current = options.find((o) => o.value === value) ?? options[0];

  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [open]);

  function show() {
    setActive(Math.max(0, options.findIndex((o) => o.value === value)));
    setOpen(true);
  }

  function choose(i: number) {
    onChange(options[i].value);
    setOpen(false);
    button.current?.focus();
  }

  function onKey(e: KeyboardEvent) {
    const last = options.length - 1;
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        show();
      }
      return;
    }
    if (e.key === "ArrowDown") setActive((a) => Math.min(last, a + 1));
    else if (e.key === "ArrowUp") setActive((a) => Math.max(0, a - 1));
    else if (e.key === "Home") setActive(0);
    else if (e.key === "End") setActive(last);
    else if (e.key === "Enter" || e.key === " ") choose(active);
    else if (e.key === "Escape" || e.key === "Tab") {
      setOpen(false);
      if (e.key === "Tab") return;
    } else if (e.key.length === 1) {
      const now = Date.now();
      typed.current = { text: (now - typed.current.at < 600 ? typed.current.text : "") + e.key.toLowerCase(), at: now };
      const hit = options.findIndex((o) => o.label.toLowerCase().startsWith(typed.current.text));
      if (hit >= 0) setActive(hit);
      return;
    } else return;
    e.preventDefault();
  }

  const md = size === "md";

  return (
    <div ref={root} className={cx("relative inline-block", md && "block w-full", className)}>
      {name && <input type="hidden" name={name} value={value} />}
      <button
        ref={button}
        type="button"
        role="combobox"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-activedescendant={open ? `${id}-${active}` : undefined}
        onClick={() => (open ? setOpen(false) : show())}
        onKeyDown={onKey}
        className={cx(
          "group flex items-center justify-between gap-2 border-b text-left text-ink transition-colors",
          open ? "border-bur" : "border-line hover:border-ink",
          md ? "w-full py-3 text-[0.9375rem]" : "min-w-[4.5rem] py-0.5 text-[0.75rem]",
        )}
      >
        <span className="truncate">{current?.label}</span>
        <svg
          aria-hidden
          viewBox="0 0 10 6"
          className={cx("shrink-0 text-ash transition-transform duration-300", md ? "w-2.5" : "w-2", open && "rotate-180 text-bur")}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          <path d="M1 1l4 4 4-4" />
        </svg>
      </button>

      {open && (
        <ul
          id={`${id}-list`}
          role="listbox"
          aria-label={label}
          className={cx(
            "absolute left-0 top-full z-40 mt-1.5 max-h-72 min-w-full overflow-auto border border-line bg-bone py-1.5 shadow-[0_14px_34px_-10px_rgba(74,20,18,0.28)]",
            md ? "w-full" : "w-max",
          )}
        >
          {options.map((o, i) => {
            const selected = o.value === value;
            return (
              <li
                key={o.value}
                id={`${id}-${i}`}
                role="option"
                aria-selected={selected}
                onPointerEnter={() => setActive(i)}
                onClick={() => choose(i)}
                className={cx(
                  "flex cursor-pointer items-center justify-between gap-6 px-3.5 py-2",
                  md ? "text-[0.875rem]" : "text-[0.75rem]",
                  i === active ? "bg-candy/45 text-bur" : "text-ink",
                )}
              >
                <span>
                  {o.label}
                  {o.hint && <span className="ml-2 text-[0.6875rem] text-ash">{o.hint}</span>}
                </span>
                {selected && <span aria-hidden className="text-bur">✓</span>}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
