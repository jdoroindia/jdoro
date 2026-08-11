"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cx } from "@/lib/cx";

type RevealProps = {
  children: ReactNode;
  /** Milliseconds of delay, for staggering siblings. */
  delay?: number;
  as?: ElementType;
  className?: string;
};

/**
 * Fades content up as it enters the viewport, once. Movement is small on
 * purpose — the page should feel like paper settling, not a slideshow.
 * Anyone with reduced-motion preferences gets the content with no transition
 * (handled globally in globals.css).
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
      className={cx("reveal-base", shown && "reveal-in", className)}
    >
      {children}
    </Tag>
  );
}
