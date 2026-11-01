/** House identity, navigation and contact details. */

export const site = {
  name: "JD’ORO",
  legalName: "JD’ORO Atelier",
  plainName: "JD'ORO",
  url: "https://jdoro.in",
  locale: "en_IN",
  madeIn: "India",
  jurisdiction: "India",
  signature: "Sweet, not sugary.",
  summary:
    "JD’ORO is a womenswear label by Jahnvi Deshlahra. Small drops, made to order, cut from deadstock fabric. Style each piece in the Fitting Room before you buy.",
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
  social: [{ label: "Instagram", href: "https://www.instagram.com/jdoro" }],
};

export const nav = {
  left: [
    { label: "Shop", href: "/shop", dot: false },
    { label: "New Drop", href: "/#drop", dot: true },
  ],
  right: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
};

export const footerNav = [
  { label: "Shop", href: "/shop" },
  { label: "Fitting Room", href: "/fitting-room" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Shipping & Returns", href: "/shipping-returns" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];
