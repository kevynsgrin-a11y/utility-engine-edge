import { images } from "./images";

export type DietaryTag = "V" | "VG" | "GF" | "DF";

export type MenuItem = {
  name: string;
  description: string;
  price: number;
  dietary?: DietaryTag[];
  note?: string;
};

export type MenuCategory = {
  id: string;
  title: string;
  intro?: string;
  items: MenuItem[];
};

export const dietaryLegend: Record<DietaryTag, string> = {
  V: "Vegetarian",
  VG: "Vegan",
  GF: "Gluten free",
  DF: "Dairy free",
};

export const featuredDishes = [
  {
    number: "01",
    name: "Yellowtail Crudo",
    description: "Yuzu kosho, cucumber, mint, and a little olive oil from Paso.",
    price: 22,
    image: images.crudo,
  },
  {
    number: "02",
    name: "Saffron Tagliatelle",
    description: "Manila clams, fennel pollen, and the broth they leave behind.",
    price: 32,
    image: images.pasta,
  },
  {
    number: "03",
    name: "Olive-Wood Branzino",
    description: "Grilled whole, salsa verde, lemon. For the table, usually.",
    price: 42,
    image: images.branzino,
  },
  {
    number: "04",
    name: "Lamb Shoulder",
    description: "Slow-roasted with rosemary, chickpeas, and pan juices.",
    price: 38,
    image: images.lamb,
  },
  {
    number: "05",
    name: "Olive Oil Cake",
    description: "Citrus, crème fraîche, and a pinch of sea salt.",
    price: 14,
    image: images.cake,
  },
] as const;

export const menuDisclaimer =
  "The menu changes with the market. These plates are typical of the current season and may not all be available tonight. Please tell us about allergies when you reserve.";

export const menuCategories: MenuCategory[] = [
  {
    id: "small-plates",
    title: "Small Plates",
    intro: "Meant to arrive as they are ready, not all at once.",
    items: [
      {
        name: "Marinated Olives & Almonds",
        description: "Citrus leaf, garlic, and warm olive oil.",
        price: 9,
        dietary: ["VG", "GF"],
      },
      {
        name: "Grilled Sourdough",
        description: "Whipped ricotta, chili honey, thyme.",
        price: 14,
        dietary: ["V"],
      },
      {
        name: "Boquerones",
        description: "Shaved fennel, orange, parsley, and a little heat.",
        price: 16,
        dietary: ["GF", "DF"],
      },
      {
        name: "Yellowtail Crudo",
        description: "Yuzu kosho, cucumber, mint, olive oil.",
        price: 22,
        dietary: ["GF", "DF"],
      },
      {
        name: "Lamb Meatballs",
        description: "Tomato conserve, yogurt, dill.",
        price: 18,
        dietary: ["GF"],
      },
    ],
  },
  {
    id: "vegetables",
    title: "Vegetables",
    intro: "From the Saturday market, and from growers we know by name.",
    items: [
      {
        name: "Charred Broccolini",
        description: "Anchovy butter, lemon, toasted breadcrumbs.",
        price: 16,
      },
      {
        name: "Heirloom Tomatoes",
        description: "Basil oil, burrata, cracked pepper. When they are good.",
        price: 19,
        dietary: ["V", "GF"],
        note: "Seasonal",
      },
      {
        name: "Roasted Beets",
        description: "Pistachio, labneh, rose vinegar.",
        price: 17,
        dietary: ["V", "GF"],
      },
      {
        name: "Wood-Fired Mushrooms",
        description: "Garlic, thyme, pecorino, a little smoke.",
        price: 18,
        dietary: ["V", "GF"],
      },
    ],
  },
  {
    id: "pasta",
    title: "Pasta",
    intro: "Rolled in the morning. Portions are meant to share or to follow a plate.",
    items: [
      {
        name: "Saffron Tagliatelle",
        description: "Manila clams, fennel pollen, white wine.",
        price: 32,
      },
      {
        name: "Hand-Cut Pappardelle",
        description: "Pork ragù, orange zest, pecorino.",
        price: 30,
      },
      {
        name: "Ricotta Gnudi",
        description: "Brown butter, sage, toasted walnuts.",
        price: 28,
        dietary: ["V"],
      },
    ],
  },
  {
    id: "coast",
    title: "From the Coast",
    intro: "We buy whole fish when we can, and cook it simply.",
    items: [
      {
        name: "Mussels",
        description: "White wine, garlic, parsley, grilled bread.",
        price: 26,
        dietary: ["DF"],
      },
      {
        name: "Calamari a la Plancha",
        description: "Smoked paprika, lemon aioli, herbs.",
        price: 29,
        dietary: ["GF", "DF"],
      },
      {
        name: "Day-Boat Scallops",
        description: "Sweet corn, marash pepper, brown butter.",
        price: 44,
        dietary: ["GF"],
      },
      {
        name: "Olive-Wood Branzino",
        description: "Grilled whole, salsa verde, lemon. Serves two if asked.",
        price: 42,
        dietary: ["GF", "DF"],
      },
    ],
  },
  {
    id: "hearth",
    title: "From the Hearth",
    intro: "Wood fire, a little patience, and the juices left in the pan.",
    items: [
      {
        name: "Half Chicken",
        description: "Preserved lemon, olives, pan juices.",
        price: 36,
        dietary: ["GF", "DF"],
      },
      {
        name: "Lamb Shoulder",
        description: "Rosemary, chickpeas, slow-roasted until it gives.",
        price: 38,
        dietary: ["GF", "DF"],
      },
      {
        name: "Dry-Aged Ribeye for Two",
        description: "Bone marrow butter, grilled alliums, sea salt.",
        price: 96,
        dietary: ["GF"],
        note: "Limited",
      },
    ],
  },
  {
    id: "desserts",
    title: "Desserts",
    items: [
      {
        name: "Olive Oil Cake",
        description: "Citrus, crème fraîche, sea salt.",
        price: 14,
        dietary: ["V"],
      },
      {
        name: "Dark Chocolate Tart",
        description: "Olive oil, flaky salt.",
        price: 15,
        dietary: ["V"],
      },
      {
        name: "Seasonal Fruit",
        description: "Honey, ricotta, thyme.",
        price: 13,
        dietary: ["V", "GF"],
      },
      {
        name: "Affogato",
        description: "House vanilla, a short espresso.",
        price: 11,
        dietary: ["V", "GF"],
      },
    ],
  },
  {
    id: "cocktails",
    title: "Cocktails",
    intro: "Built around citrus, herbs, and a short list of bottles we like.",
    items: [
      {
        name: "Harbor Negroni",
        description: "Gin, verdello, sweet vermouth, orange oil.",
        price: 16,
      },
      {
        name: "Fig Leaf Spritz",
        description: "Prosecco, fig leaf, grapefruit, soda.",
        price: 15,
      },
      {
        name: "Smoked Honey Old Fashioned",
        description: "Bourbon, smoked honey, walnut bitters.",
        price: 17,
      },
      {
        name: "Tomato & Basil Highball",
        description: "Vodka, ripe tomato, basil, black pepper.",
        price: 15,
      },
      {
        name: "Bergamot Tonic",
        description: "Non-alcoholic. Bergamot, tonic, olive leaf.",
        price: 9,
        dietary: ["VG", "GF", "DF"],
      },
    ],
  },
  {
    id: "wine",
    title: "Wine",
    intro:
      "A short list, mostly coastal — Greece, southern France, Italy, and a few California bottles that belong at the same table. Ask for the printed list, or let us pour.",
    items: [
      {
        name: "Assyrtiko, Santo Wines",
        description: "Santorini. Saline, citrus, a little smoke. Glass / bottle.",
        price: 16,
        note: "Glass 16 · Bottle 64",
      },
      {
        name: "Vermentino, Poggio al Tesoro",
        description: "Tuscany coast. Stone fruit and herbs.",
        price: 15,
        note: "Glass 15 · Bottle 58",
      },
      {
        name: "Rosé, Domaine Tempier",
        description: "Bandol. Pale, savory, built for the table.",
        price: 18,
        note: "Glass 18 · Bottle 78",
      },
      {
        name: "Xinomavro, Kir-Yianni",
        description: "Naoussa. Red cherry, tomato leaf, fine tannin.",
        price: 17,
        note: "Glass 17 · Bottle 72",
      },
      {
        name: "Grenache, Lo-Fi",
        description: "Santa Barbara. Light, peppery, served a little cool.",
        price: 16,
        note: "Glass 16 · Bottle 62",
      },
    ],
  },
];

export const formatPrice = (price: number): string => `$${price.toFixed(0)}`;
