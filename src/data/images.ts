const unsplash = (photoId: string, width: number, extras = ""): string =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${String(width)}&q=80${extras}`;

export type SiteImage = {
  id: string;
  alt: string;
  src: string;
  srcSet: string;
  sizes: string;
  width: number;
  height: number;
};

const image = (
  id: string,
  photoId: string,
  alt: string,
  width: number,
  height: number,
  sizes: string,
  extras = "",
): SiteImage => ({
  id,
  alt,
  src: unsplash(photoId, Math.min(width, 1800), extras),
  srcSet: [800, 1200, 1600, 2000, 2400]
    .filter((w) => w <= Math.max(width, 1600) + 400)
    .map((w) => `${unsplash(photoId, w, extras)} ${String(w)}w`)
    .join(", "),
  sizes,
  width,
  height,
});

/**
 * Centralized imagery for Maré & Vine.
 * All photographs are Unsplash stills with stable IDs — replace locally
 * when original photography is available.
 */
export const images = {
  hero: image(
    "hero",
    "photo-1414235077428-338989a2e8c0",
    "Candlelit dining room with white tablecloths and hanging glass lights",
    2400,
    1600,
    "100vw",
  ),
  introPlate: image(
    "introPlate",
    "photo-1467003909585-2f8a72700288",
    "Seared fish with herbs, citrus, and olive oil on a dark ceramic plate",
    1600,
    2000,
    "(min-width: 1024px) 42vw, 92vw",
  ),
  crudo: image(
    "crudo",
    "photo-1559339352-11d035aa65de",
    "Yellowtail crudo with citrus and herbs",
    1400,
    1600,
    "(min-width: 1024px) 38vw, 90vw",
  ),
  pasta: image(
    "pasta",
    "photo-1473093295043-cdd812d0e601",
    "Hand-cut pasta with herbs and olive oil",
    1400,
    1600,
    "(min-width: 1024px) 38vw, 90vw",
  ),
  branzino: image(
    "branzino",
    "photo-1534080564583-6be75777b70a",
    "Whole grilled fish with lemon and olive wood char",
    1400,
    1600,
    "(min-width: 1024px) 38vw, 90vw",
  ),
  lamb: image(
    "lamb",
    "photo-1544025162-d76640320d2a",
    "Slow-roasted lamb with pan juices",
    1400,
    1600,
    "(min-width: 1024px) 38vw, 90vw",
  ),
  cake: image(
    "cake",
    "photo-1470124182917-cc6e71b22ecc",
    "Olive oil cake with citrus and crème fraîche",
    1400,
    1600,
    "(min-width: 1024px) 38vw, 90vw",
  ),
  diningRoom: image(
    "diningRoom",
    "photo-1517248135467-4c7edcad34c4",
    "Warm, low-lit dining room with wood tables and hanging lamps",
    1800,
    1200,
    "(min-width: 1024px) 56vw, 100vw",
  ),
  tableSetting: image(
    "tableSetting",
    "photo-1550966871-3ed3cdb5ed0c",
    "Set table with linen, wine glasses, and a small floral arrangement",
    1600,
    2000,
    "(min-width: 768px) 40vw, 92vw",
  ),
  bar: image(
    "bar",
    "photo-1514933651103-005eec06c04b",
    "Restaurant bar with bottles, brass fixtures, and a few empty stools",
    1600,
    2000,
    "(min-width: 768px) 40vw, 92vw",
  ),
  chef: image(
    "chef",
    "photo-1577219491135-ce391730fb2c",
    "Chef Elena Costa in a quiet kitchen moment, looking toward the pass",
    1400,
    1800,
    "(min-width: 1024px) 40vw, 92vw",
  ),
  wine: image(
    "wine",
    "photo-1510812431401-41d2bd2722f3",
    "Wine glasses and a bottle on a wooden table",
    1600,
    2000,
    "(min-width: 768px) 36vw, 92vw",
  ),
  privateRoom: image(
    "privateRoom",
    "photo-1414235077428-338989a2e8c0",
    "A long candlelit table set for a private dinner",
    1800,
    1200,
    "100vw",
  ),
  privateTable: image(
    "privateTable",
    "photo-1517248135467-4c7edcad34c4",
    "Intimate corner table in a wood-paneled dining room",
    1400,
    1600,
    "(min-width: 768px) 45vw, 100vw",
  ),
  privateBar: image(
    "privateBar",
    "photo-1514933651103-005eec06c04b",
    "The bar reserved for a standing reception",
    1400,
    1600,
    "(min-width: 768px) 45vw, 100vw",
  ),
  olives: image(
    "olives",
    "photo-1474979266404-7eaacbcd87c5",
    "Green olives and olive oil in ceramic bowls",
    1400,
    1600,
    "(min-width: 768px) 40vw, 92vw",
  ),
  produce: image(
    "produce",
    "photo-1540420773420-3366772f4999",
    "Seasonal vegetables and herbs arranged on a wooden table",
    1600,
    1200,
    "(min-width: 1024px) 50vw, 100vw",
  ),
  hands: image(
    "hands",
    "photo-1504674900247-0877df9cc836",
    "A spread of Mediterranean plates on a rustic table",
    1600,
    1100,
    "(min-width: 1024px) 48vw, 100vw",
  ),
  street: image(
    "street",
    "photo-1449824913935-59a10b8d2000",
    "Quiet evening street with warm storefront light, standing in for Mariner Street",
    1800,
    1200,
    "100vw",
  ),
  cocktail: image(
    "cocktail",
    "photo-1514362545857-3bc16c4c7d1b",
    "A citrus cocktail on a dark bar top",
    1200,
    1500,
    "(min-width: 768px) 30vw, 80vw",
  ),
  galleryOne: image(
    "galleryOne",
    "photo-1559339352-11d035aa65de",
    "Plated coastal dish with herbs",
    1200,
    1500,
    "(min-width: 768px) 30vw, 90vw",
  ),
  galleryTwo: image(
    "galleryTwo",
    "photo-1466978913421-dad2ebd01d17",
    "Guests dining under warm restaurant lighting",
    1400,
    1100,
    "(min-width: 768px) 40vw, 90vw",
  ),
  galleryThree: image(
    "galleryThree",
    "photo-1424847651672-bf11a4d27c36",
    "Place settings with wine glasses before service",
    1400,
    1100,
    "(min-width: 768px) 40vw, 90vw",
  ),
  galleryFour: image(
    "galleryFour",
    "photo-1510812431401-41d2bd2722f3",
    "Wine service at the table",
    1200,
    1500,
    "(min-width: 768px) 30vw, 90vw",
  ),
  storyHero: image(
    "storyHero",
    "photo-1550966871-3ed3cdb5ed0c",
    "Linen-dressed table beside a window in late afternoon light",
    2200,
    1400,
    "100vw",
  ),
  kitchen: image(
    "kitchen",
    "photo-1556910103-1c02745aae4d",
    "A working restaurant kitchen during prep",
    1600,
    1200,
    "(min-width: 768px) 48vw, 100vw",
  ),
} as const;

export type ImageKey = keyof typeof images;
