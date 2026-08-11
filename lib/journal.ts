import type { TextureName, TextureTone } from "@/components/textures";

/**
 * The journal. Notes from the workroom rather than campaign copy — the point is
 * to show the method, so each entry has something specific in it: a number, a
 * technique, a decision and its cost.
 */

export type JournalEntry = {
  slug: string;
  title: string;
  standfirst: string;
  category: "The workroom" | "Fabric" | "Method" | "The house";
  date: string;
  readingMinutes: number;
  texture: TextureName;
  tone: TextureTone;
  /** Cover image URL. */
  image?: string;
  /** Body copy, paragraph by paragraph. */
  body: string[];
  featured?: boolean;
};

export const journal: JournalEntry[] = [
  {
    slug: "forty-metres-of-silk-nobody-wanted",
    title: "Forty metres of silk nobody wanted",
    standfirst:
      "A cancelled order left a mill with silk it could not sell. We bought the lot, and it became eleven dresses and a set of straps.",
    category: "Fabric",
    date: "2026-06-18",
    readingMinutes: 4,
    texture: "drape",
    tone: "bone",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1000&q=80",
    body: [
      "The call came on a Tuesday. A mill had woven 40 metres of mulberry silk for a label that then cancelled the collection, which happens more often than anyone outside the industry would guess. The silk was finished, inspected and rolled. It had nowhere to go.",
      "Surplus like this has three normal endings. It sits in a warehouse until the moisture marks it. It is sold by weight to a jobber who resells it as an unnamed fabric. Or it is shredded for filling. None of those endings involve anybody wearing it.",
      "We measured what we could get out of it. At 2.4 metres per dress cut on the bias, 40 metres gave eleven pieces with a metre and a half spare for straps and facings. Eleven is not a production run by any commercial standard. It is what the fabric allowed, so it is what we made.",
      "The bias is what made it difficult. Silk cut on the true bias moves under the needle, so each panel has to be pinned, set and left to hang before it is stitched. A run of eleven took our tailor nine working days. A factory would have fused the seams and finished in a morning, and the dress would have hung differently within a year.",
      "All eleven have gone. We will not remake the Noor Slip in another silk, because it would be a different dress wearing the same name.",
    ],
    featured: true,
  },
  {
    slug: "why-we-buy-buttons-from-tailors-chests",
    title: "Why we buy buttons out of retired tailors' chests",
    standfirst:
      "New buttons are cheap and endless. Reclaimed ones take a week to match and are better in every way that matters.",
    category: "Method",
    date: "2026-05-27",
    readingMinutes: 5,
    texture: "seed",
    tone: "shell",
    image: "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=1000&q=80",
    body: [
      "A jacket needs six buttons that agree with each other. Ordering them new takes ten minutes and costs almost nothing. We do not do that, and the reason is not sentiment.",
      "Most new buttons are polyester moulded to look like horn or shell. They are dimensionally perfect and they wear badly: the coating hazes, the edges chip pale, and after two years they no longer match the garment they were sewn to. Real horn, real shell and real brass age at roughly the same rate as good fabric.",
      "So we buy old ones. Retired tailors sell their chests. Haberdashers close and clear their drawers. Thrift markets sell buttons by the bowl, cut from garments that have already failed elsewhere. We buy in bulk and sort by material, diameter, hole count and shank.",
      "Then comes the slow part. A set of six matched horn buttons might take a week to assemble out of a bowl of two hundred, because horn is never uniform — every button is a slightly different brown. We grade them into sets that look deliberate rather than accidental, which means matching tone and grain direction, not just size.",
      "It is genuinely inefficient. It also means the hardware on your jacket has already survived one garment and will outlast this one.",
    ],
    featured: true,
  },
  {
    slug: "what-a-deep-hem-is-for",
    title: "What a deep hem is actually for",
    standfirst:
      "Six centimetres of folded fabric at the bottom of a trouser is the difference between altering a garment and replacing it.",
    category: "The workroom",
    date: "2026-04-30",
    readingMinutes: 3,
    texture: "stitch",
    tone: "shell",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=1000&q=80",
    body: [
      "Turn up the hem of an inexpensive trouser and you will usually find about a centimetre of fabric folded twice and overlocked. That is the cheapest hem to make and it is unalterable. The trouser can be shortened once, and never lengthened.",
      "Ours are 6 cm deep, which costs us roughly a fifth of a metre of fabric per garment. On a run of fifteen trousers that is three metres — one and a half garments we chose not to make.",
      "What it buys you is range. A 6 cm hem can be let down twice, so the same trouser works with flat shoes and with a heel, and it survives being handed to someone taller. It also hangs better: the extra weight at the hem pulls the leg into a straight line instead of letting it float.",
      "The same logic runs through the side seams, which carry 4 cm of allowance rather than the usual 1 cm. Bodies change across a decade. A garment built with no allowance has decided in advance how long you get to keep it.",
    ],
  },
  {
    slug: "the-hang-tag-you-can-plant",
    title: "The hang tag you can plant",
    standfirst:
      "Seed paper is not a gesture. It is a deadline we set ourselves, and it is printed on the tag.",
    category: "The house",
    date: "2026-03-14",
    readingMinutes: 3,
    texture: "seed",
    tone: "bone",
    image: "https://images.unsplash.com/photo-1495385794356-15371f348c31?w=1000&q=80",
    body: [
      "Every piece leaves the workroom with a tag pressed from seed paper — cotton pulp with basil and marigold seed set through it while wet. Soak it overnight, lay it under a centimetre of soil, keep it damp, and it germinates in eight to twelve days.",
      "The line printed on the reverse is the whole reason it exists: by the time your seed grows into a plant, your garment should still be part of your wardrobe. It sets a clock we can be measured against. A basil plant on a windowsill lives for years with attention. So should a jacket.",
      "The rest of the packaging follows the same test. Garment bags are made from a plant-starch film that composts rather than persisting; boxes are unbleached board with no plastic tape, closed with a paper seal; the care card is printed in soy ink on the same recycled stock.",
      "None of this is difficult and none of it costs much. It is just a series of small decisions that most brands have not been asked to make.",
    ],
  },
];

export const findEntry = (slug: string) =>
  journal.find((entry) => entry.slug === slug);

export const formatEntryDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
