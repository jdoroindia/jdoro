import Image from "next/image";
import { cx } from "@/lib/cx";
import wordmarkInk from "@/public/jdoro-wordmark.png";
import wordmarkPaper from "@/public/jdoro-wordmark-paper.png";

/**
 * The logotype, used as artwork rather than set type — the mark has a
 * connected J–D, an extended top hairline and a descending J tail that no web
 * font reproduces. Two tones are shipped from the same alpha channel: warm ink
 * for light surfaces, bone for dark ones.
 *
 * The mark is 2.86:1, so widths are derived from the height to keep it exact.
 */

const heights = {
  xs: 14,
  sm: 18,
  md: 22,
  lg: 40,
  xl: 84,
} as const;

const RATIO = 1200 / 419;

export function Wordmark({
  size = "md",
  tone = "ink",
  className,
  priority = false,
}: {
  size?: keyof typeof heights;
  tone?: "ink" | "paper";
  className?: string;
  priority?: boolean;
}) {
  const height = heights[size];

  return (
    <Image
      src={tone === "paper" ? wordmarkPaper : wordmarkInk}
      alt="JD’oro"
      height={height}
      width={Math.round(height * RATIO)}
      priority={priority}
      className={cx("select-none", className)}
    />
  );
}

/**
 * Oversized display use of the mark — hero and section breaks. Scales with the
 * viewport instead of a fixed pixel height.
 */
export function WordmarkDisplay({
  tone = "ink",
  className,
  priority = false,
}: {
  tone?: "ink" | "paper";
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={tone === "paper" ? wordmarkPaper : wordmarkInk}
      alt="JD’oro"
      width={1200}
      height={419}
      priority={priority}
      sizes="(min-width: 1024px) 60vw, 88vw"
      className={cx("h-auto w-full select-none", className)}
    />
  );
}

/**
 * Compact monogram for seals, tabs and the care label. Set in the display
 * face rather than cut from the logo, since the lockup does not reduce well.
 */
export function Monogram({ className }: { className?: string }) {
  return (
    <span
      className={cx(
        "inline-flex items-baseline font-display text-[0.9375rem] uppercase leading-none tracking-[0.16em]",
        className,
      )}
    >
      JD
    </span>
  );
}
