const imageUrl = (id: string, width = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

const hero1 = imageUrl("photo-1539109136881-3be0616acf4b", 2400);
const hero2 = imageUrl("photo-1496747611176-843222e1e57c", 2400);
const p1 = imageUrl("photo-1515886657613-9f3515b0c78f");
const p2 = imageUrl("photo-1529139574466-a303027c1d8b");
const p3 = imageUrl("photo-1539533018447-63fcce2678e3");
const p4 = imageUrl("photo-1551028719-00167b16eac5");
const lb1 = imageUrl("photo-1566174053879-31528523f8ae", 2200);
const lb2 = imageUrl("photo-1506629082955-511b1aa562c8", 2200);
const lb3 = imageUrl("photo-1483985988355-763728e1935b", 2200);
const atelier = imageUrl("photo-1445205170230-053b83016050", 2200);
const editorial1 = imageUrl("photo-1525507119028-ed4c629a60a3", 2200);

export const images = { hero1, hero2, p1, p2, p3, p4, lb1, lb2, lb3, atelier, editorial1 };

export interface Product {
  slug: string;
  name: string;
  collection: string;
  category: string;
  price: number;
  image: string;
  gallery: string[];
  sizes: string[];
  colors: string[];
  description: string;
  details: string[];
  composition: string;
  isNew?: boolean;
  bestSeller?: boolean;
}

export interface Collection {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
}

export const collections: Collection[] = [
  {
    slug: "atelier-ss26",
    name: "Atelier SS26",
    tagline: "The Quiet Hour",
    description:
      "A study in silence — sculpted silhouettes in ivory silk, draped against the warmth of late afternoon light.",
    image: hero1,
  },
  {
    slug: "noir",
    name: "Noir",
    tagline: "An Architecture of Black",
    description:
      "Tailored coats, fluid gowns and uncompromising lines — Maison Makeeva's signature codes rendered in deep ink.",
    image: hero2,
  },
  {
    slug: "ivoire",
    name: "Ivoire",
    tagline: "Soft Power",
    description:
      "Cream silks, hand-finished trousers and weightless blouses for the modern wardrobe.",
    image: p3,
  },
  {
    slug: "heritage",
    name: "Heritage",
    tagline: "House Codes",
    description:
      "Permanent pieces — the camel coat, the silk slip, the tailored trouser. Considered, then refined again.",
    image: p4,
  },
];

export const categories = [
  { slug: "ready-to-wear", name: "Ready to Wear" },
  { slug: "dresses", name: "Dresses" },
  { slug: "outerwear", name: "Outerwear" },
  { slug: "tailoring", name: "Tailoring" },
  { slug: "accessories", name: "Accessories" },
];

export const products: Product[] = [
  {
    slug: "ivoire-draped-gown",
    name: "Ivoire Draped Gown",
    collection: "Atelier SS26",
    category: "dresses",
    price: 2480,
    image: hero1,
    gallery: [hero1, lb1, p1],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Ivory", "Bone"],
    description:
      "A floor-length gown in liquid silk crêpe with an architectural draped back and concealed train. Cut by hand in the Maison atelier.",
    details: [
      "Bias-cut floor length silhouette",
      "Hand-draped open back with self-tie",
      "Concealed centre-back zip",
      "Made in Italy",
    ],
    composition: "100% silk crêpe. Lining: 100% silk.",
    isNew: true,
    bestSeller: true,
  },
  {
    slug: "noir-tailored-coat",
    name: "Noir Tailored Coat",
    collection: "Noir",
    category: "outerwear",
    price: 3150,
    image: hero2,
    gallery: [hero2, lb3, p4],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Noir", "Camel"],
    description:
      "A sculpted double-faced wool coat with a sharp peak lapel and clean fall — the house's defining outerwear silhouette.",
    details: [
      "Single-breasted double-faced wool",
      "Peak lapel, set-in sleeves",
      "Welt pockets, half-canvas construction",
      "Made in Italy",
    ],
    composition: "92% virgin wool, 8% cashmere.",
    bestSeller: true,
  },
  {
    slug: "champagne-silk-blouse",
    name: "Champagne Silk Blouse",
    collection: "Ivoire",
    category: "ready-to-wear",
    price: 890,
    image: p3,
    gallery: [p3, lb2, p1],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Champagne", "Ivory"],
    description:
      "A weightless silk satin blouse with relaxed shoulders and a hand-finished collar. Designed to slip under a coat or rest alone.",
    details: ["Relaxed cut", "Mother-of-pearl buttons", "French seams"],
    composition: "100% silk satin.",
    isNew: true,
  },
  {
    slug: "ivoire-pleated-trouser",
    name: "Ivoire Pleated Trouser",
    collection: "Ivoire",
    category: "tailoring",
    price: 980,
    image: p3,
    gallery: [p3, p1],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Ivory", "Noir"],
    description: "High-rise pleated wool trouser with a fluid leg and hand-finished hem.",
    details: ["High rise", "Front pleats", "Side pockets"],
    composition: "100% virgin wool.",
  },
  {
    slug: "camel-architect-coat",
    name: "Camel Architect Coat",
    collection: "Heritage",
    category: "outerwear",
    price: 2890,
    image: p4,
    gallery: [p4, lb3],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Camel"],
    description:
      "A full-length coat in warm camel wool — the Maison's most enduring silhouette, refined for the season.",
    details: ["Notch lapel", "Concealed front placket", "Half-belted back"],
    composition: "100% virgin wool.",
    bestSeller: true,
  },
  {
    slug: "noir-evening-cape",
    name: "Noir Evening Cape",
    collection: "Noir",
    category: "dresses",
    price: 3680,
    image: p2,
    gallery: [p2, hero1],
    sizes: ["One Size"],
    colors: ["Noir"],
    description:
      "A floor-grazing evening cape in silk chiffon, hand-pleated and trailing — pure cinema.",
    details: ["Hand-pleated chiffon", "Floor length", "Made to order"],
    composition: "100% silk chiffon.",
    isNew: true,
  },
  {
    slug: "ivoire-slip-dress",
    name: "Ivoire Slip Dress",
    collection: "Atelier SS26",
    category: "dresses",
    price: 1290,
    image: p1,
    gallery: [p1, lb1],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Ivory", "Champagne"],
    description:
      "The signature bias slip — cut on the bias in heavy silk satin, with delicate spaghetti straps.",
    details: ["Bias cut", "Adjustable straps", "Slip lining"],
    composition: "100% silk satin.",
    bestSeller: true,
  },
  {
    slug: "bone-cashmere-knit",
    name: "Bone Cashmere Knit",
    collection: "Heritage",
    category: "ready-to-wear",
    price: 1180,
    image: p3,
    gallery: [p3],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Bone", "Noir"],
    description: "Fine-gauge cashmere knit in warm bone, with hand-linked seams.",
    details: ["Fine gauge", "Hand-linked"],
    composition: "100% cashmere.",
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const getCollection = (slug: string) => collections.find((c) => c.slug === slug);

export const productsByCollection = (slug: string) =>
  products.filter((p) => {
    const c = getCollection(slug);
    return c ? p.collection === c.name : false;
  });

export const productsByCategory = (slug: string) => products.filter((p) => p.category === slug);

export const formatPrice = (n: number) =>
  `€ ${n.toLocaleString("en-US", { minimumFractionDigits: 0 })}`;
