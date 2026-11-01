/** House identity, navigation and contact details. */

export const site = {
  name: "JD’ORO",
  legalName: "JD’ORO Atelier",
  plainName: "JD'ORO",
  url: "https://www.jdoro.in",
  locale: "en_IN",
  madeIn: "India",
  jurisdiction: "India",
  signature: "Made slow. Worn often.",
  summary:
    "JD’ORO is a clothing label by Jahnvi Deshlahra. Small drops, made to order, cut from rare-run fabrics. See how pieces work together in your bag before you buy.",
  founder: "Jahnvi Deshlahra",
  contact: {
    email: "hello@jdoro.in",
    press: "press@jdoro.in",
    careers: "careers@jdoro.in",
    phone: "+91 92032 95690",
    phoneHref: "+919203295690",
    whatsapp: "919203295690",
    studio: {
      lines: [] as string[],
      note: "Fittings by appointment. We share the studio address when we confirm your visit.",
    },
    hours: "Monday to Saturday, 10am – 6pm IST",
    replyTime: "We answer within one working day.",
  },
  instagram: { handle: "@jdoro.in", href: "https://www.instagram.com/jdoro.in/" },
  social: [{ label: "Instagram @jdoro.in", href: "https://www.instagram.com/jdoro.in/" }],
};

export const nav = {
  left: [
    { label: "Shop", href: "/shop", dot: false },
    { label: "New Drop", href: "/#drop", dot: true },
  ],
  right: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Account", href: "/account" },
  ],
};

export const footerNav = [
  { label: "Shop", href: "/shop" },
  { label: "Bag", href: "/fitting-room" },
  { label: "Your orders", href: "/account" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Shipping & Returns", href: "/shipping-returns" },
  { label: "Refunds", href: "/refunds" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];
