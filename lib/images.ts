/**
 * Photography library.
 *
 * All images sourced from Unsplash (unsplash.com/license — free for commercial
 * use, no attribution required). Every URL below has been verified to return 200.
 *
 * To swap any image: change the URL here, nothing else in the codebase moves.
 */

export const photos = {
  /** Hero — fashion editorial, woman, clean neutral tones. */
  hero: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=80",

  /** Collection grid — tailoring / blazer. */
  tailoringCard:
    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80",

  /** Collection grid — trousers / wide leg. */
  trouserCard:
    "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80",

  /** Collection grid — shirting / linen. */
  shirtCard:
    "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=800&q=80",

  /** Collection grid — dress / editorial. */
  dressCard:
    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",

  /** Fabric rolls on shelf. */
  fabricRolls:
    "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1000&q=80",

  /** Close-up of weave / linen texture. */
  weaveDetail:
    "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=1000&q=80",

  /** Sewing machine / workroom detail. */
  craftDetail:
    "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1000&q=80",

  /** Workroom / creative workspace. */
  workroom:
    "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1000&q=80",

  /** Dress form / fitting. */
  fitting:
    "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1000&q=80",

  /** Packaging — natural textures, clean. */
  packaging:
    "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1000&q=80",

  /** Fabric / linen care. */
  linenCare:
    "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=1000&q=80",

  /** Fashion editorial — journal hero. */
  journalHero:
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=80",

  /** Woman at desk / founder portrait. */
  founder:
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1000&q=80",

  /** Garment rack / hanging clothes. */
  garmentRack:
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000&q=80",

  /** Nature / seed detail. */
  seedPaper:
    "https://images.unsplash.com/photo-1495385794356-15371f348c31?w=1000&q=80",

  /** Buttons / haberdashery detail. */
  buttons:
    "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=800&q=80",

  /** Woman editorial — skirt / wrap. */
  skirtCard:
    "https://images.unsplash.com/photo-1583846783214-7229a91b20ed?w=800&q=80",

  /** Slip dress / minimal editorial. */
  slipCard:
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
} as const;

export type PhotoKey = keyof typeof photos;
