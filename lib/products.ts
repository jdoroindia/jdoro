import type { TextureName, TextureTone } from "@/components/textures";

/**
 * The collection.
 *
 * Modelled the way the house actually works: a piece belongs to a fabric, the
 * fabric has a finite length, and the length decides both how many were cut and
 * whether more can still be made. `metresLeft` at zero means the piece retires.
 *
 * Sizes carry their own state because the two are independent — a size can be
 * sold out of the cut run while the fabric is still there to make more.
 */

export type SizeState = "ready" | "measure" | "none";

export type Size = {
  label: string;
  state: SizeState;
  /** How many finished pieces are on the shelf in this size. */
  ready?: number;
};

export type Product = {
  slug: string;
  name: string;
  category: "tailoring" | "dresses" | "shirting" | "skirts";
  price: number;
  /** One line, for the collection grid. */
  line: string;
  /** The opening paragraph on the product page. */
  standfirst: string;
  fabric: {
    name: string;
    origin: string;
    composition: string;
    weight: string;
    /** Deadstock, or bought new as a natural fibre. Stated plainly. */
    source: "deadstock" | "natural";
  };
  trims: string;
  finishing: string[];
  care: string;
  fit: string;
  metresLeft: number;
  metresPerGarment: number;
  sizes: Size[];
  /** Primary product image URL. */
  image: string;
  texture: TextureName;
  tone: TextureTone;
  /** Shot notes for the product gallery. */
  shots: { texture: TextureName; tone: TextureTone; note: string; image?: string }[];
  featured?: boolean;
};

export const products: Product[] = [
  {
    slug: "lodhi-jacket",
    name: "Lodhi Jacket",
    category: "tailoring",
    price: 32400,
    line: "Single-breasted, unlined, in surplus wool suiting.",
    standfirst:
      "A jacket with the structure taken out of it. No shoulder pad, no fusing, no lining — just a clean wool suiting held in shape by the way it is cut and pressed. It moves like a shirt and reads like tailoring.",
    fabric: {
      name: "Charcoal wool suiting",
      origin: "Surplus from a suiting mill in northern India",
      composition: "100% wool",
      weight: "290 gsm",
      source: "deadstock",
    },
    trims: "Reclaimed horn buttons, sorted and matched by hand from a tailor's chest",
    finishing: [
      "Seams bound in offcuts of the same wool rather than tape",
      "Armholes finished by hand so the sleeve turns without pulling",
      "Side seams carry 4 cm of allowance, enough to be let out twice",
    ],
    care: "Air it after wearing and press with a cloth between iron and wool. Dry clean once a season at most.",
    fit: "Straight through the body, sleeve ending at the wrist bone. Size down for a close fit.",
    metresLeft: 9.4,
    metresPerGarment: 2.3,
    sizes: [
      { label: "XS", state: "ready", ready: 1 },
      { label: "S", state: "none" },
      { label: "M", state: "ready", ready: 2 },
      { label: "L", state: "measure" },
      { label: "XL", state: "measure" },
    ],
    texture: "drape",
    tone: "umber",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80",
    shots: [
      { texture: "drape", tone: "umber", note: "Front, worn open over a shirt, arms down.", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1000&q=80" },
      { texture: "stitch", tone: "umber", note: "Detail: bound seam at the armhole, taken in the same wool." },
      { texture: "weave", tone: "shell", note: "Fabric close-up: the suiting at 1:1, showing the twill." },
      { texture: "studio", tone: "shell", note: "Full length on the body, three-quarter turn, bare studio wall." },
    ],
    featured: true,
  },
  {
    slug: "kota-trouser",
    name: "Kota Trouser",
    category: "tailoring",
    price: 18600,
    line: "High waist, wide leg, in a silk-cotton left over from a mill run.",
    standfirst:
      "Cut high on the waist and left wide from the hip down, so the leg falls in one line to the floor. The fabric is a silk-cotton with enough body to hold the crease and enough give to sit down in.",
    fabric: {
      name: "Undyed silk-cotton",
      origin: "End of a mill run, bought as one 40-metre roll",
      composition: "62% cotton, 38% mulberry silk",
      weight: "210 gsm",
      source: "deadstock",
    },
    trims: "Vintage brass hook-and-bar closure, sourced from a haberdasher's remaining stock",
    finishing: [
      "French seams throughout, so there is no raw edge anywhere inside",
      "Waistband interlined with cotton canvas, never fusible",
      "Hems left 6 cm deep so the length can be changed for flat shoes or heels",
    ],
    care: "Wash cold by hand or on a wool cycle, line dry in shade, press while faintly damp.",
    fit: "Sits at the natural waist. Order your usual waist size; we set the length to you at no cost.",
    metresLeft: 6.1,
    metresPerGarment: 1.9,
    sizes: [
      { label: "XS", state: "measure" },
      { label: "S", state: "ready", ready: 2 },
      { label: "M", state: "ready", ready: 1 },
      { label: "L", state: "ready", ready: 1 },
      { label: "XL", state: "measure" },
    ],
    texture: "weave",
    tone: "bone",
    image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80",
    shots: [
      { texture: "weave", tone: "bone", note: "Front, standing, trouser breaking just above the floor.", image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=1000&q=80" },
      { texture: "stitch", tone: "shell", note: "Detail: french seam opened flat to show the inside finish." },
      { texture: "roll", tone: "shell", note: "The remaining roll on the shelf, metres marked in chalk." },
    ],
    featured: true,
  },
  {
    slug: "chanderi-shirt",
    name: "Chanderi Shirt",
    category: "shirting",
    price: 14200,
    line: "Oversized, hand-finished placket, in a silk-cotton handloom.",
    standfirst:
      "A shirt cut two sizes past your own, in a handloom silk-cotton light enough to see the weave against a window. The placket and cuffs are finished by hand, which is why the front sits flat instead of rippling.",
    fabric: {
      name: "Chanderi silk-cotton",
      origin: "Woven to order by a handloom cluster in Madhya Pradesh",
      composition: "50% cotton, 50% mulberry silk",
      weight: "85 gsm",
      source: "natural",
    },
    trims: "Reclaimed mother-of-pearl buttons, thrifted in mismatched sets and graded to match",
    finishing: [
      "Placket turned and stitched by hand, two rows, 12 stitches to the inch",
      "Side seams flat-felled so the shirt can be worn open without fraying",
      "Collar interlined with woven cotton, cut on the bias to keep its roll",
    ],
    care: "Hand wash cold, dry flat in shade. Press on the reverse while damp. Never wring silk-cotton.",
    fit: "Deliberately oversized. Take your usual size for the intended fit, one down for a closer one.",
    metresLeft: 22.8,
    metresPerGarment: 2.1,
    sizes: [
      { label: "XS", state: "ready", ready: 1 },
      { label: "S", state: "ready", ready: 3 },
      { label: "M", state: "ready", ready: 2 },
      { label: "L", state: "ready", ready: 1 },
      { label: "XL", state: "measure" },
    ],
    texture: "weave",
    tone: "shell",
    image: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=800&q=80",
    shots: [
      { texture: "weave", tone: "shell", note: "Front, worn open over a slip, sleeves rolled once.", image: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=1000&q=80" },
      { texture: "stitch", tone: "shell", note: "Detail: the hand-stitched placket, raking light across it." },
      { texture: "drape", tone: "bone", note: "The shirt held against a window to show the weave." },
    ],
    featured: true,
  },
  {
    slug: "anara-dress",
    name: "Anara Dress",
    category: "dresses",
    price: 26800,
    line: "Column dress, bias-cut skirt, in a heavyweight surplus linen.",
    standfirst:
      "One long line from shoulder to ankle, with the skirt cut on the bias so it swings without adding width. The linen is heavy enough to hang rather than cling, and it softens with every wash.",
    fabric: {
      name: "Stone-washed linen",
      origin: "Surplus from a European mill's overrun, bought as three part-rolls",
      composition: "100% linen",
      weight: "255 gsm",
      source: "deadstock",
    },
    trims: "Deadstock cotton tape at the shoulder seams; no zip, no hardware",
    finishing: [
      "Bias skirt hung for 48 hours before hemming so it settles before it is cut",
      "Shoulder seams taped with cotton to stop the weight dragging them out of line",
      "Hem finished with a hand-rolled edge, 3 mm, no visible stitch from the front",
    ],
    care: "Machine wash cold on a gentle cycle, line dry. Linen is meant to crease; press only if you want it flat.",
    fit: "Skims the body, no waist seam. True to size. Length set to your height.",
    metresLeft: 3.2,
    metresPerGarment: 3.1,
    sizes: [
      { label: "XS", state: "none" },
      { label: "S", state: "ready", ready: 1 },
      { label: "M", state: "none" },
      { label: "L", state: "measure" },
      { label: "XL", state: "none" },
    ],
    texture: "drape",
    tone: "clay",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
    shots: [
      { texture: "drape", tone: "clay", note: "Full length, side on, skirt caught mid-movement.", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1000&q=80" },
      { texture: "stitch", tone: "clay", note: "Detail: hand-rolled hem, 3 mm, held between two fingers." },
      { texture: "studio", tone: "clay", note: "Back view against a bare wall, morning light." },
    ],
    featured: true,
  },
  {
    slug: "noor-slip",
    name: "Noor Slip",
    category: "dresses",
    price: 22500,
    line: "Bias slip with a hand-rolled edge, in surplus mulberry silk.",
    standfirst:
      "Cut on the true bias from a silk that was woven for a collection that never shipped. It is the plainest thing we make and the hardest to sew — bias silk moves under the needle, so it is set by hand before it is stitched.",
    fabric: {
      name: "Sand mulberry silk",
      origin: "Surplus from a cancelled production run",
      composition: "100% mulberry silk",
      weight: "78 gsm",
      source: "deadstock",
    },
    trims: "Reclaimed silk thread and a single vintage hook at the back neck",
    finishing: [
      "Straps cut from the same silk, turned by hand rather than topstitched",
      "Every seam a french seam, 4 mm, so nothing shows through the silk",
      "Hem rolled and stitched by hand after the dress has hung for two days",
    ],
    care: "Hand wash cold with a pH-neutral soap, dry flat away from sun. Steam rather than iron.",
    fit: "Close through the hip, falling to mid-calf. Size up if you prefer it loose.",
    metresLeft: 0,
    metresPerGarment: 2.4,
    sizes: [
      { label: "XS", state: "none" },
      { label: "S", state: "none" },
      { label: "M", state: "none" },
      { label: "L", state: "none" },
      { label: "XL", state: "none" },
    ],
    texture: "drape",
    tone: "bone",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
    shots: [
      { texture: "drape", tone: "bone", note: "Front, standing still, light raking across the bias.", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1000&q=80" },
      { texture: "stitch", tone: "bone", note: "Detail: rolled hem and french seam meeting at the side." },
    ],
  },
  {
    slug: "sabi-skirt",
    name: "Sabi Skirt",
    category: "skirts",
    price: 16900,
    line: "Long wrap skirt in a hemp-cotton twill, no closure but a tie.",
    standfirst:
      "A wrap skirt with nothing to break — no zip, no button, no hook. It ties, and the tie is cut from the same twill. The hemp gives it weight; the cotton keeps it against the skin.",
    fabric: {
      name: "Indigo hemp-cotton twill",
      origin: "Surplus from a workwear mill, the last two rolls of a discontinued shade",
      composition: "55% hemp, 45% cotton",
      weight: "320 gsm",
      source: "deadstock",
    },
    trims: "None. The only fastening is a self-fabric tie.",
    finishing: [
      "All seams flat-felled, the way workwear is built",
      "Waistband topstitched twice in a matched reclaimed thread",
      "Hem 5 cm deep, so the skirt can be shortened without losing its weight",
    ],
    care: "Machine wash cold, line dry. Hemp softens for the first ten washes and then stays put.",
    fit: "Wraps to fit a range of sizes. Ties at the natural waist or lower, as you prefer.",
    metresLeft: 14.5,
    metresPerGarment: 2.6,
    sizes: [
      { label: "XS–S", state: "ready", ready: 2 },
      { label: "M–L", state: "ready", ready: 2 },
      { label: "XL–2XL", state: "measure" },
    ],
    texture: "weave",
    tone: "umber",
    image: "https://images.unsplash.com/photo-1583846783214-7229a91b20ed?w=800&q=80",
    shots: [
      { texture: "weave", tone: "umber", note: "Front, worn with the tie showing, hands in the wrap.", image: "https://images.unsplash.com/photo-1583846783214-7229a91b20ed?w=1000&q=80" },
      { texture: "stitch", tone: "umber", note: "Detail: flat-felled seam and the double-stitched waistband." },
      { texture: "roll", tone: "umber", note: "What is left of the roll, standing in the corner of the workroom." },
    ],
  },
];

export const findProduct = (slug: string) =>
  products.find((product) => product.slug === slug);

export const featured = products.filter((product) => product.featured);

/** Pieces still buyable in some form, newest intent first. */
export const available = products.filter(
  (product) =>
    product.metresLeft >= product.metresPerGarment ||
    product.sizes.some((size) => size.state === "ready"),
);

export const retired = products.filter(
  (product) =>
    product.metresLeft < product.metresPerGarment &&
    !product.sizes.some((size) => size.state === "ready"),
);

export const formatPrice = (value: number) =>
  `₹${value.toLocaleString("en-IN")}`;

/** How many more can be cut from what is left. */
export const garmentsRemaining = (product: Product) =>
  Math.floor(product.metresLeft / product.metresPerGarment);

export const categoryLabels: Record<Product["category"], string> = {
  tailoring: "Tailoring",
  dresses: "Dresses",
  shirting: "Shirting",
  skirts: "Skirts",
};
