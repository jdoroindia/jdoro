/**
 * Generated textile fields, used wherever photography will eventually sit.
 *
 * They are drawn rather than photographed on purpose: nothing here is licensed
 * from anyone, nothing loads over the network, and the palette is the house
 * palette by construction. Each one stands in for a specific kind of shot, and
 * the <Media> caption says which.
 *
 * Filter and gradient ids are keyed by name + tone, so two instances of the
 * same texture share identical definitions and never collide.
 */

export type TextureName =
  | "weave"
  | "drape"
  | "roll"
  | "stitch"
  | "seed"
  | "studio";

export type TextureTone = "bone" | "shell" | "clay" | "umber";

const palette: Record<
  TextureTone,
  { base: string; deep: string; light: string; thread: string; grain: number }
> = {
  bone: {
    base: "#f1ede4",
    deep: "#ded6c6",
    light: "#faf8f3",
    thread: "#b9ad96",
    grain: 0.16,
  },
  shell: {
    base: "#e8e2d5",
    deep: "#cfc4ad",
    light: "#f4f0e8",
    thread: "#a89a80",
    grain: 0.18,
  },
  clay: {
    base: "#c6a888",
    deep: "#9d7d5c",
    light: "#dcc4a9",
    thread: "#7d5f42",
    grain: 0.2,
  },
  umber: {
    base: "#2b241d",
    deep: "#14110e",
    light: "#4a3f34",
    thread: "#6b5a48",
    grain: 0.26,
  },
};

function Grain({ id, amount }: { id: string; amount: number }) {
  return (
    <>
      <filter id={id} x="0" y="0" width="100%" height="100%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.9"
          numOctaves={3}
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect
        width="100%"
        height="100%"
        filter={`url(#${id})`}
        opacity={amount}
        style={{ mixBlendMode: "multiply" }}
      />
    </>
  );
}

export function Texture({
  name,
  tone,
}: {
  name: TextureName;
  tone: TextureTone;
}) {
  const c = palette[tone];
  const key = `${name}-${tone}`;

  const shared = {
    viewBox: "0 0 400 500",
    preserveAspectRatio: "none" as const,
    className: "absolute inset-0 h-full w-full",
    "aria-hidden": true as const,
  };

  if (name === "weave") {
    /* Close-up of an open plain weave — linen, hemp, raw cotton. */
    return (
      <svg {...shared}>
        <defs>
          <linearGradient id={`${key}-g`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={c.light} />
            <stop offset="55%" stopColor={c.base} />
            <stop offset="100%" stopColor={c.deep} />
          </linearGradient>
          <pattern
            id={`${key}-p`}
            width="9"
            height="9"
            patternUnits="userSpaceOnUse"
          >
            <rect width="9" height="9" fill="none" />
            <path
              d="M0 0v9M4.5 0v9"
              stroke={c.thread}
              strokeWidth="1.1"
              opacity="0.22"
            />
            <path
              d="M0 2.25h9M0 6.75h9"
              stroke={c.thread}
              strokeWidth="1.6"
              opacity="0.14"
            />
          </pattern>
        </defs>
        <rect width="400" height="500" fill={`url(#${key}-g)`} />
        <rect width="400" height="500" fill={`url(#${key}-p)`} />
        <Grain id={`${key}-n`} amount={c.grain} />
      </svg>
    );
  }

  if (name === "drape") {
    /* Hanging cloth, lit from one side. Folds fall as soft vertical bands. */
    return (
      <svg {...shared}>
        <defs>
          <linearGradient id={`${key}-g`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={c.deep} />
            <stop offset="18%" stopColor={c.base} />
            <stop offset="34%" stopColor={c.light} />
            <stop offset="48%" stopColor={c.base} />
            <stop offset="62%" stopColor={c.deep} />
            <stop offset="76%" stopColor={c.base} />
            <stop offset="100%" stopColor={c.deep} />
          </linearGradient>
          <radialGradient id={`${key}-h`} cx="0.34" cy="0.22" r="0.75">
            <stop offset="0%" stopColor={c.light} stopOpacity="0.75" />
            <stop offset="100%" stopColor={c.light} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="500" fill={`url(#${key}-g)`} />
        <rect width="400" height="500" fill={`url(#${key}-h)`} />
        <Grain id={`${key}-n`} amount={c.grain * 0.8} />
      </svg>
    );
  }

  if (name === "roll") {
    /* Bolts stacked on the shelf, seen end-on. */
    return (
      <svg {...shared}>
        <defs>
          <linearGradient id={`${key}-g`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={c.light} />
            <stop offset="100%" stopColor={c.deep} />
          </linearGradient>
        </defs>
        <rect width="400" height="500" fill={`url(#${key}-g)`} />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <g key={i}>
            <rect
              x="0"
              y={18 + i * 68}
              width="400"
              height="54"
              fill={i % 2 ? c.base : c.light}
              opacity={0.55}
            />
            <rect
              x="0"
              y={18 + i * 68}
              width="400"
              height="54"
              fill="none"
              stroke={c.thread}
              strokeWidth="0.9"
              opacity="0.3"
            />
            <ellipse
              cx={90 + ((i * 73) % 220)}
              cy={45 + i * 68}
              rx="26"
              ry="21"
              fill={c.deep}
              opacity="0.22"
            />
          </g>
        ))}
        <Grain id={`${key}-n`} amount={c.grain} />
      </svg>
    );
  }

  if (name === "stitch") {
    /* Finishing detail: a single seam crossing a dark, pressed field. */
    return (
      <svg {...shared}>
        <defs>
          <linearGradient id={`${key}-g`} x1="0.1" y1="0" x2="0.9" y2="1">
            <stop offset="0%" stopColor={c.base} />
            <stop offset="70%" stopColor={c.deep} />
            <stop offset="100%" stopColor={c.base} />
          </linearGradient>
        </defs>
        <rect width="400" height="500" fill={`url(#${key}-g)`} />
        <path
          d="M-20 330 C 120 300, 260 360, 420 300"
          fill="none"
          stroke={c.light}
          strokeWidth="1.4"
          strokeDasharray="7 6"
          opacity="0.55"
        />
        <path
          d="M-20 344 C 120 314, 260 374, 420 314"
          fill="none"
          stroke={c.thread}
          strokeWidth="1"
          opacity="0.4"
        />
        <path
          d="M-20 250 C 140 230, 250 280, 420 240"
          fill="none"
          stroke={c.light}
          strokeWidth="0.8"
          opacity="0.18"
        />
        <Grain id={`${key}-n`} amount={c.grain * 0.7} />
      </svg>
    );
  }

  if (name === "seed") {
    /* Seed paper: pressed pulp with husk and seed flecks through it. */
    return (
      <svg {...shared}>
        <defs>
          <linearGradient id={`${key}-g`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={c.light} />
            <stop offset="100%" stopColor={c.base} />
          </linearGradient>
          <filter id={`${key}-f`}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.045"
              numOctaves={4}
            />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="table" tableValues="0 0.5" />
            </feComponentTransfer>
          </filter>
        </defs>
        <rect width="400" height="500" fill={`url(#${key}-g)`} />
        <rect
          width="400"
          height="500"
          filter={`url(#${key}-f)`}
          opacity="0.5"
          style={{ mixBlendMode: "multiply" }}
        />
        {Array.from({ length: 34 }, (_, i) => {
          const x = (i * 97) % 380 + 10;
          const y = (i * 149) % 470 + 15;
          return (
            <ellipse
              key={i}
              cx={x}
              cy={y}
              rx={i % 3 ? 2.2 : 3.1}
              ry={i % 3 ? 1.4 : 2}
              fill={c.thread}
              opacity={0.5}
              transform={`rotate(${(i * 37) % 180} ${x} ${y})`}
            />
          );
        })}
        <Grain id={`${key}-n`} amount={c.grain * 0.6} />
      </svg>
    );
  }

  /* studio — a figure's worth of empty wall, floor line low in the frame. */
  return (
    <svg {...shared}>
      <defs>
        <linearGradient id={`${key}-g`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c.light} />
          <stop offset="62%" stopColor={c.base} />
          <stop offset="64%" stopColor={c.deep} />
          <stop offset="100%" stopColor={c.base} />
        </linearGradient>
        <radialGradient id={`${key}-v`} cx="0.5" cy="0.42" r="0.72">
          <stop offset="0%" stopColor={c.light} stopOpacity="0.55" />
          <stop offset="100%" stopColor={c.deep} stopOpacity="0.45" />
        </radialGradient>
      </defs>
      <rect width="400" height="500" fill={`url(#${key}-g)`} />
      <rect width="400" height="500" fill={`url(#${key}-v)`} />
      <Grain id={`${key}-n`} amount={c.grain} />
    </svg>
  );
}
