import { images } from "./images";
import type { SiteImage } from "./images";

export type EventSpace = {
  id: string;
  name: string;
  capacity: string;
  seated: string;
  standing: string;
  description: string;
  image: SiteImage;
};

export const privateDiningIntro = {
  eyebrow: "Private dining",
  title: "A room of your own, still part of the house.",
  lede: "We host small dinners, family tables, and the kind of evenings that need a door that closes. The cooking stays the same — seasonal, coastal, meant to be shared.",
};

export const eventSpaces: EventSpace[] = [
  {
    id: "back-room",
    name: "The Back Room",
    capacity: "10 – 16 seated",
    seated: "16",
    standing: "20",
    description:
      "A long table under low light, just off the dining room. Best for family dinners, rehearsal meals, and the conversations that last past dessert.",
    image: images.privateTable,
  },
  {
    id: "chef-table",
    name: "Chef’s Table",
    capacity: "6 – 8 seated",
    seated: "8",
    standing: "—",
    description:
      "A counter facing the pass. Elena writes a menu that morning. You eat what the kitchen is actually cooking — with a little more of it.",
    image: images.kitchen,
  },
  {
    id: "full-buyout",
    name: "Full Dining Room",
    capacity: "Up to 42 seated",
    seated: "42",
    standing: "55",
    description:
      "The whole restaurant, Monday through Wednesday, or a late Sunday. For celebrations that need the room, the bar, and the playlist.",
    image: images.privateBar,
  },
];

export const eventTypes = [
  "Rehearsal dinner",
  "Family table",
  "Birthday or anniversary",
  "Business dinner",
  "Chef’s counter",
  "Full buyout",
] as const;

export const serviceOptions = [
  {
    title: "Shared menu",
    detail:
      "Four or five courses from the current kitchen, served family-style. The most natural way we cook.",
  },
  {
    title: "Seated prix fixe",
    detail:
      "A set menu with a choice or two, plated. Useful when the table is mixed and the evening has a clock.",
  },
  {
    title: "Standing reception",
    detail:
      "Passed small plates and a short bar list. Available for the dining room buyout only.",
  },
];

export const sampleMenu = [
  { course: "To begin", plate: "Boquerones, olives, grilled sourdough" },
  { course: "From the garden", plate: "Beets, pistachio, labneh" },
  { course: "Pasta", plate: "Saffron tagliatelle, clams" },
  { course: "The coast", plate: "Olive-wood branzino, salsa verde" },
  { course: "To finish", plate: "Olive oil cake, citrus" },
];

export const gallery = [
  images.galleryOne,
  images.galleryTwo,
  images.galleryThree,
  images.galleryFour,
  images.wine,
  images.tableSetting,
] as const;
