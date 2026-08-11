/**
 * Questions we are actually asked, grouped. Shared by the FAQ page and its
 * structured data, so the two can never drift apart.
 *
 * `answer` is the short version and carries the whole answer on its own.
 * `detail` is the longer one behind a disclosure.
 */

export type Question = {
  question: string;
  answer: string;
  detail?: string;
};

export type QuestionGroup = {
  heading: string;
  intro: string;
  questions: Question[];
};

export const faq: QuestionGroup[] = [
  {
    heading: "Ordering",
    intro: "How the two purchase routes work, and which one you are on.",
    questions: [
      {
        question: "What is the difference between ready to ship and cut to measure?",
        answer:
          "Ready to ship means we already cut that size and it leaves within two working days. Cut to measure means we make it from what is left of the same roll, in three to five weeks.",
        detail:
          "A roll of fabric makes a handful of garments. We cut a few in the most requested sizes so they can ship immediately, and hold the remaining metres back so the piece can still be made for anyone whose size was not cut. Same fabric, same tailor, same price — the only difference is the wait.",
      },
      {
        question: "Does made to measure cost more?",
        answer: "No. The price is identical either way.",
        detail:
          "Charging extra would be charging you for the privilege of waiting. Your measurements do not make the garment harder to sew; the only thing made to measure costs us is scheduling, which is our problem rather than yours.",
      },
      {
        question: "A size is struck through. Is the piece finished?",
        answer:
          "Usually not. It means the pieces cut in that size have sold, but there may still be fabric on the roll.",
        detail:
          "Select the size and the page will tell you which of the two situations you are in. If there is fabric left we can cut it for you. Only when the roll itself is empty does the piece retire — and then it retires permanently, because we will not remake it in a substitute fabric.",
      },
      {
        question: "How long does an order take?",
        answer:
          "Two working days to dispatch if it is ready to ship. Three to five weeks if we are cutting it for you.",
      },
      {
        question: "Can I see the fabric before I buy?",
        answer:
          "Yes. We post swatches within India at no charge, or you can visit the studio by appointment.",
        detail:
          "Write to us with the pieces you are considering and we will send a swatch of each. No charge, and no follow-up unless you ask for one.",
      },
    ],
  },
  {
    heading: "Fit and sizing",
    intro: "The part most people get wrong when buying online, and how we cover it.",
    questions: [
      {
        question: "What if it does not fit when it arrives?",
        answer:
          "We alter it once at no cost, including return shipping, within the first year.",
        detail:
          "Send it back and describe the problem in plain words — tight across the back, long in the sleeve. If it cannot be altered to fit, we remake it once from remaining fabric or refund you in full.",
      },
      {
        question: "Which measurements do you need?",
        answer:
          "Bust, waist, hip, your height without shoes, and the heel height you expect to wear with it.",
        detail:
          "There is a short guide to taking each one on the ordering page. You do not need to be measured professionally; you need to be measured consistently, over the underwear you would wear with the piece.",
      },
      {
        question: "I am between sizes. Which should I take?",
        answer:
          "Send us the three measurements and we will tell you, or advise cutting one for you instead.",
      },
      {
        question: "Will you alter something I bought a year ago?",
        answer:
          "Yes. The first alteration is free within a year, and after that we alter at cost indefinitely.",
        detail:
          "Side seams carry 4 cm of allowance and hems are left 5–6 cm deep specifically so this is possible. Bodies change, and a garment built with no allowance has decided in advance how long you get to keep it.",
      },
    ],
  },
  {
    heading: "Fabric and making",
    intro: "What the clothes are made of, and how the making is organised.",
    questions: [
      {
        question: "What is deadstock, exactly?",
        answer:
          "Finished, inspected fabric that nobody claimed — usually a mill overrun or a cancelled production order.",
        detail:
          "It is not offcuts, not factory seconds and not flawed cloth. It is a full roll of good fabric with nowhere to go, because material is committed months before a garment is.",
      },
      {
        question: "Why will you not name your suppliers?",
        answer:
          "Because naming them is how we stop being offered fabric. Surplus is sold quietly.",
        detail:
          "We will tell you the fibre, weight, width, region and how the fabric came to be surplus — everything that affects the garment you are buying. The supplier's name affects only our access to the next roll.",
      },
      {
        question: "Do you ever use synthetics?",
        answer:
          "Never by choice. The only exceptions are technical components with no natural equivalent, and they are named on the product page.",
        detail:
          "There is no natural-fibre zip, for instance. Most of our pieces avoid the problem by using ties, hooks and wraps instead. Where a zip is unavoidable we say so plainly rather than describing the piece as fully natural.",
      },
      {
        question: "Are you certified?",
        answer:
          "No. Audit schemes are priced for volume we do not have, and most certify a supply chain rather than a garment.",
        detail:
          "Instead we publish the method in detail and invite you to the studio. That is weaker as a badge and stronger as evidence.",
      },
      {
        question: "Where are the clothes made?",
        answer:
          "Cut, sewn, hand-finished and pressed in our own workroom in India. Nothing is outsourced to another factory.",
      },
    ],
  },
  {
    heading: "Delivery, returns and care",
    intro: "The commercial terms, stated once and plainly.",
    questions: [
      {
        question: "Can I return something?",
        answer:
          "A ready-to-ship piece, yes — unworn within fourteen days. A piece cut to your measurements can be altered or exchanged but not refunded.",
        detail:
          "This is the one place the two routes differ materially, and we say so before you pay rather than after. Anything cut to your measurements cannot be resold to anyone else, which is why the terms cannot be the same.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "Yes, worldwide. Shipping is complimentary over ₹25,000; duties and taxes are the recipient's responsibility.",
      },
      {
        question: "Is the packaging really plastic-free?",
        answer:
          "Yes, including the tape. Plant-starch garment bag, unbleached board, paper seal, soy ink.",
        detail:
          "The garment bag composts in three to six months. The hang tag is seed paper — soak it, plant it, keep it damp, and it germinates in eight to twelve days.",
      },
      {
        question: "What if something tears or a button goes missing?",
        answer:
          "Write to us. We repair anything we have made for as long as you own it, at cost.",
        detail:
          "Every piece is logged against its fabric roll and its button set, so we can usually match hardware years later. If we cannot match a single button we replace the full set rather than leave you with five that agree and one that does not.",
      },
      {
        question: "How should I wash it?",
        answer:
          "Fibre by fibre — the care guide covers each one, and the card in your box repeats the short version.",
      },
    ],
  },
];

export const allQuestions = faq.flatMap((group) => group.questions);
