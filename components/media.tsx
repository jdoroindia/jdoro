import Image from "next/image";
import { cx } from "@/lib/cx";
import {
  Texture,
  type TextureName,
  type TextureTone,
} from "@/components/textures";

/**
 * Every image slot on the site goes through here.
 *
 * With no `src`, the frame renders an explicit photography placeholder: crop
 * marks, a label, and the shot brief. It has to be obviously a placeholder —
 * a subtle texture on its own reads as a broken image, which is worse than
 * useless during a design review.
 *
 * Pass `src` and the placeholder disappears with no change to layout.
 */

const darkTones: TextureTone[] = ["umber"];

export function Media({
  texture = "weave",
  tone = "shell",
  ratio = "3 / 4",
  src,
  alt,
  caption,
  showCaption = true,
  priority = false,
  sizes = "(min-width: 1024px) 45vw, 100vw",
  className,
  frameClassName,
  overlay,
}: {
  texture?: TextureName;
  tone?: TextureTone;
  ratio?: string;
  /** Real photograph. When present, the placeholder is not drawn. */
  src?: string;
  /** Required when `src` is set. */
  alt?: string;
  /** The shot brief. Shown inside the placeholder, and as a caption after. */
  caption?: string;
  showCaption?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
  frameClassName?: string;
  /** Rendered above the image — badges, a label, a play affordance. */
  overlay?: React.ReactNode;
}) {
  const dark = darkTones.includes(tone);

  return (
    <figure className={cx("group/media", className)}>
      <div
        style={{ aspectRatio: ratio }}
        className={cx(
          "relative w-full overflow-hidden bg-shell",
          frameClassName,
        )}
      >
        {src ? (
          <Image
            src={src}
            alt={alt ?? ""}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover transition-transform duration-[1600ms] ease-editorial group-hover/media:scale-[1.03]"
          />
        ) : (
          <>
            <div className="absolute inset-0 opacity-70">
              <Texture name={texture} tone={tone} />
            </div>
            <Placeholder caption={caption} ratio={ratio} dark={dark} />
          </>
        )}

        {overlay ? (
          <div className="pointer-events-none absolute inset-0">{overlay}</div>
        ) : null}
      </div>

      {/* Once photography exists the brief becomes a normal caption. */}
      {src && caption && showCaption ? (
        <figcaption className="type-caption mt-3 max-w-[46ch]">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

/** Crop marks, a label and the shot brief. Reads as a plan, not a failure. */
function Placeholder({
  caption,
  ratio,
  dark,
}: {
  caption?: string;
  ratio: string;
  dark: boolean;
}) {
  const line = dark ? "border-paper/25" : "border-ink/20";
  const text = dark ? "text-paper/60" : "text-ink/55";
  const strong = dark ? "text-paper/85" : "text-ink/75";

  return (
    <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-5">
      {/* Corner crop marks */}
      <div className="pointer-events-none absolute inset-3 md:inset-4">
        {[
          "left-0 top-0 border-l border-t",
          "right-0 top-0 border-r border-t",
          "left-0 bottom-0 border-l border-b",
          "right-0 bottom-0 border-r border-b",
        ].map((position) => (
          <span
            key={position}
            aria-hidden="true"
            className={cx("absolute h-5 w-5", line, position)}
          />
        ))}
      </div>

      <p
        className={cx(
          "relative text-[0.625rem] uppercase tracking-[0.22em]",
          strong,
        )}
      >
        Photography
        <span className={text}> · {ratio.replace(" / ", ":")}</span>
      </p>

      {caption ? (
        <p
          className={cx(
            "relative max-w-[34ch] text-[0.8125rem] leading-relaxed",
            text,
          )}
        >
          {caption}
        </p>
      ) : null}
    </div>
  );
}
