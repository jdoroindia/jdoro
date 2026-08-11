/**
 * Single source of truth for house identity, navigation and contact details.
 * Copy lives here so it stays consistent across every page and every phase.
 */

export const site = {
  name: "JD’oro",
  legalName: "JD’oro Atelier",
  /** Used in <title> templates and structured data. */
  plainName: "JD'oro",
  url: "https://jdoro.in",
  locale: "en_IN",

  /**
   * ─── SET THIS ────────────────────────────────────────────────────────────
   * Every "made in" line on the site reads from here, so changing it once
   * changes the footer, product specs, FAQ, contact page and metadata.
   * Defaults to the country because it is true wherever the workroom sits.
   * Replace with your city — e.g. "Jaipur" — when you want to be specific.
   */
  madeIn: "India",

  /** Used only in the governing-law clause. Set to your city before trading. */
  jurisdiction: "India",

  /** The line that opens the house. Used in the hero and in metadata. */
  signature: "Fewer clothes, made far better.",

  /** The line that closes it, set beneath the mark above the footer. */
  closingLine: "When the fabric runs out, the piece retires.",

  /** Search results and share cards. Kept under 160 characters so it is never
      truncated by Google. */
  summary:
    "JD’oro makes womenswear from surplus fabric left behind by mills and fashion houses. One roll makes a handful of garments, then it is gone.",

  /** Homepage and about-page standfirst. Two sentences, no more. */
  standfirst:
    "Womenswear cut from surplus fabric — the rolls mills and fashion houses leave behind. One roll makes a handful of garments, then it is gone.",

  founder: "Jahnvi Deshlahra",

  contact: {
    email: "hello@jdoro.in",
    press: "press@jdoro.in",
    careers: "careers@jdoro.in",
    phone: "+91 92032 95690",
    phoneHref: "+919203295690",
    whatsapp: "+919203295690",
    studio: {
      /**
       * ─── SET THIS ──────────────────────────────────────────────────────────
       * Left empty deliberately. The footer and contact page render the studio
       * block only when there are lines here, so nothing looks broken while it
       * is blank. Add your address when you are ready to publish it.
       */
      lines: [] as string[],
      note: "Fittings and fabric viewings by appointment. We share the studio address when we confirm your visit.",
    },
    hours: "Monday to Saturday, 10am – 6pm IST",
    replyTime: "We answer within one working day.",
  },

  social: [
    { label: "Instagram", href: "https://www.instagram.com/jdoro" },
    { label: "Pinterest", href: "https://www.pinterest.com/jdoro" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/jdoro" },
  ],
};

export type NavLink = {
  label: string;
  href: string;
  /** Shown in the drawer and mega panels to give each link a reason to exist. */
  note?: string;
};

export type NavGroup = {
  label: string;
  href: string;
  links?: NavLink[];
};

/**
 * Primary navigation. Five doors, no more. The drawer carries the full map.
 */
export const primaryNav: NavGroup[] = [
  {
    label: "Collection",
    href: "/collection",
    links: [
      {
        label: "Everything in the collection",
        href: "/collection",
        note: "The current pieces, each one naming the fabric it was cut from.",
      },
      {
        label: "Ready to ship",
        href: "/collection?availability=ready",
        note: "Cut, finished and boxed. Leaves us within two working days.",
      },
      {
        label: "Tailoring",
        href: "/collection?category=tailoring",
        note: "Jackets, trousers and skirts cut on the house block.",
      },
      {
        label: "Dresses",
        href: "/collection?category=dresses",
        note: "Long lines, low fuss, made to your measurements.",
      },
      {
        label: "Shirting",
        href: "/collection?category=shirting",
        note: "Cotton, linen and silk, finished by hand at the placket.",
      },
      {
        label: "The last of the fabric",
        href: "/collection?availability=final-metres",
        note: "Pieces with only a few metres left on the roll.",
      },
    ],
  },
  {
    label: "Made to Order",
    href: "/made-to-order",
    links: [
      {
        label: "The two ways to buy",
        href: "/made-to-order",
        note: "Take a finished piece, or have the same one cut to your measure.",
      },
      {
        label: "How ordering works",
        href: "/made-to-order#steps",
        note: "From your measurements to the finished piece, in nine steps.",
      },
      {
        label: "Size and fit",
        href: "/made-to-order#measurements",
        note: "How to measure at home, and what we adjust at no cost.",
      },
      {
        label: "Lead times",
        href: "/made-to-order#timing",
        note: "Three to five weeks, and why we do not rush it.",
      },
    ],
  },
  {
    label: "Materials",
    href: "/materials",
    links: [
      {
        label: "The fabric we use",
        href: "/materials",
        note: "Deadstock first, then natural fibre. Nothing else.",
      },
      {
        label: "Why deadstock matters",
        href: "/deadstock",
        note: "What happens to surplus fabric when nobody claims it.",
      },
      {
        label: "Trims and hardware",
        href: "/materials#trims",
        note: "Reclaimed buttons, vintage buckles, salvaged metal.",
      },
    ],
  },
  {
    label: "Our Practice",
    href: "/sustainability",
    links: [
      {
        label: "How we work",
        href: "/sustainability",
        note: "Every claim we make, with the method behind it.",
      },
      {
        label: "Craftsmanship",
        href: "/craftsmanship",
        note: "The seams, the linings, the finishing you rarely see.",
      },
      {
        label: "Packaging",
        href: "/packaging",
        note: "Plastic-free, biodegradable, and a hang tag you can plant.",
      },
      {
        label: "Garment care",
        href: "/care",
        note: "Keeping a piece wearable for a decade or longer.",
      },
    ],
  },
  {
    label: "Journal",
    href: "/journal",
    links: [
      {
        label: "All entries",
        href: "/journal",
        note: "Notes from the workroom, the mills and the archive.",
      },
      {
        label: "The house",
        href: "/story",
        note: "Why JD’oro exists, and what it refuses to do.",
      },
      {
        label: "The founder",
        href: "/founder",
        note: "Jasleen Dhillon, in her own words.",
      },
    ],
  },
];

/** Everything, grouped for the drawer and the footer. */
export const siteMap: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Shop",
    links: [
      { label: "Collection", href: "/collection" },
      { label: "Ready to ship", href: "/collection?availability=ready" },
      { label: "Tailoring", href: "/collection?category=tailoring" },
      { label: "Dresses", href: "/collection?category=dresses" },
      { label: "Shirting", href: "/collection?category=shirting" },
      { label: "Made to your measure", href: "/made-to-order" },
    ],
  },
  {
    heading: "The House",
    links: [
      { label: "Our story", href: "/story" },
      { label: "The founder", href: "/founder" },
      { label: "Craftsmanship", href: "/craftsmanship" },
      { label: "Journal", href: "/journal" },
    ],
  },
  {
    heading: "How We Work",
    links: [
      { label: "Our practice", href: "/sustainability" },
      { label: "Materials", href: "/materials" },
      { label: "Why deadstock", href: "/deadstock" },
      { label: "Packaging", href: "/packaging" },
    ],
  },
  {
    heading: "Service",
    links: [
      { label: "Garment care", href: "/care" },
      { label: "Shipping & returns", href: "/shipping-returns" },
      { label: "Questions", href: "/faq" },
      { label: "Contact the atelier", href: "/contact" },
    ],
  },
];

export const legalNav: NavLink[] = [
  { label: "Terms of sale", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
  { label: "Accessibility", href: "/accessibility" },
];
