/**
 * Product catalogue for the current drop.
 *
 * Names, prices and copy are placeholders for Jahnvi to replace. The shape
 * mirrors a Shopify product (handle, variants with size/colour options), so
 * swapping this file for a Storefront API fetch later only changes this module.
 */

export type Category = "tops" | "dresses" | "jackets";

export type Colour = {
  name: string;
  /** Swatch colour shown in the picker. */
  hex: string;
  image: string;
  back?: string;
};

export type Product = {
  slug: string;
  name: string;
  price: number;
  category: Category;
  detail: string;
  description: string;
  fabric: string;
  colours: Colour[];
  sizes: string[];
  /** Pieces left in the run. Small drops, so this is shown on the page. */
  left: number;
};

const SIZES = ["XS", "S", "M", "L", "XL"];

export const drop = {
  number: "01",
  name: "Stripes & Smocking",
  line: "Sweet, not sugary.",
  intro:
    "Smocked waists, bubble hems and buttons with a story. Style the pieces on the model before you buy.",
};

export const products: Product[] = [
  {
    slug: "candy-stripe-shirt",
    name: "Candy Stripe Shirt",
    price: 3800,
    category: "tops",
    detail: "Smocked waist",
    description:
      "A crisp candy-stripe shirt gathered at the waist with hand-run smocking, so it sits close without a single dart.",
    fabric: "100% cotton poplin, deadstock",
    colours: [{ name: "Candy", hex: "#EDB2BF", image: "/products/p1.jpg", back: "/products/p1-back.jpg" }],
    sizes: SIZES,
    left: 6,
  },
  {
    slug: "bubble-tie-top",
    name: "Bubble Tie Top",
    price: 3200,
    category: "tops",
    detail: "Pink · also in green stripe",
    description:
      "A bubble-hem top that ties at the front. Wear it loose over denim or knotted high with a skirt.",
    fabric: "Cotton seersucker, deadstock",
    colours: [
      { name: "Pink", hex: "#F27FAE", image: "/products/p4.jpg", back: "/products/p4-back.jpg" },
      { name: "Green stripe", hex: "#3E8A3A", image: "/products/p2.jpg", back: "/products/p2-back.jpg" },
    ],
    sizes: SIZES,
    left: 8,
  },
  {
    slug: "bell-sleeve-tie-top",
    name: "Bell Sleeve Tie Top",
    price: 3600,
    category: "tops",
    detail: "Candy stripe",
    description: "Full bell sleeves and a soft neck tie, cut from the last metres of the candy stripe.",
    fabric: "100% cotton poplin, deadstock",
    colours: [{ name: "Candy stripe", hex: "#EDB2BF", image: "/products/p11.jpg" }],
    sizes: SIZES,
    left: 4,
  },
  {
    slug: "wave-seam-dress",
    name: "Wave Seam Dress",
    price: 5900,
    category: "dresses",
    detail: "Rust",
    description: "A column dress with a curved seam that runs across the body like a wave line.",
    fabric: "Linen blend, deadstock",
    colours: [{ name: "Rust", hex: "#A4482B", image: "/products/p3.jpg" }],
    sizes: SIZES,
    left: 5,
  },
  {
    slug: "patchwork-denim-jacket",
    name: "Patchwork Denim Jacket",
    price: 6800,
    category: "jackets",
    detail: "Deadstock denim",
    description: "Pieced together from offcuts of three denims, so no two jackets carry the same patchwork.",
    fabric: "Cotton denim offcuts",
    colours: [{ name: "Indigo", hex: "#33476B", image: "/products/p5.jpg", back: "/products/p5-back.jpg" }],
    sizes: SIZES,
    left: 3,
  },
  {
    slug: "button-story-shirt",
    name: "Button Story Shirt",
    price: 4200,
    category: "tops",
    detail: "Blush",
    description: "Every button on the placket is different, collected from vintage cards and flea markets.",
    fabric: "Cotton voile, deadstock",
    colours: [{ name: "Blush", hex: "#E9C3BE", image: "/products/p8.jpg" }],
    sizes: SIZES,
    left: 7,
  },
  {
    slug: "shell-button-shirt",
    name: "Shell Button Shirt",
    price: 3900,
    category: "tops",
    detail: "Charcoal",
    description: "A relaxed charcoal shirt finished with real shell buttons.",
    fabric: "Cotton twill, deadstock",
    colours: [{ name: "Charcoal", hex: "#3A3637", image: "/products/p10.jpg" }],
    sizes: SIZES,
    left: 6,
  },
  {
    slug: "wave-placket-shirt",
    name: "Wave Placket Shirt",
    price: 3600,
    category: "tops",
    detail: "Mint / cream",
    description: "The wave line again, this time down the placket of a two-tone shirt.",
    fabric: "Cotton poplin, deadstock",
    colours: [{ name: "Mint", hex: "#BFDCCB", image: "/products/p9.jpg", back: "/products/p9-back.jpg" }],
    sizes: SIZES,
    left: 5,
  },
  {
    slug: "ruffle-sleeve-shirt",
    name: "Ruffle Sleeve Shirt",
    price: 3700,
    category: "tops",
    detail: "White",
    description: "A clean white shirt with a ruffle at the cuff.",
    fabric: "Cotton voile, deadstock",
    colours: [{ name: "White", hex: "#F3EFEA", image: "/products/p7.jpg" }],
    sizes: SIZES,
    left: 6,
  },
  {
    slug: "pearl-loop-vest",
    name: "Pearl Loop Vest",
    price: 3400,
    category: "tops",
    detail: "Closed with pearl loops",
    description: "A cropped vest that fastens with pearl buttons through hand-made loops.",
    fabric: "Cotton suiting, deadstock",
    colours: [{ name: "Ecru", hex: "#E6DCCB", image: "/products/p6.jpg", back: "/products/p6-back.jpg" }],
    sizes: SIZES,
    left: 4,
  },
];

export const categories: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "tops", label: "Tops" },
  { id: "dresses", label: "Dresses" },
  { id: "jackets", label: "Jackets" },
];

export function findProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}
