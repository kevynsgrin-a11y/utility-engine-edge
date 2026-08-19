import { images } from "./images";

export const story = {
  heroEyebrow: "Our story",
  heroTitle: "A former flower shop, a long table, and a short list of things we care about.",
  origin: {
    title: "How we opened",
    paragraphs: [
      "Maré & Vine began in 2019, in a narrow Echo Park storefront that had sold flowers for thirty years. The cooler is still in the basement. The front window still faces Mariner Street.",
      "Elena Costa wanted a room small enough to know the regulars and a kitchen close enough to the dining room that you can hear the pans. The name is simple: maré, the tide; vine, the glass that belongs beside it.",
    ],
  },
  chef: {
    title: "Elena Costa",
    role: "Chef & Owner",
    paragraphs: [
      "Elena grew up in Santa Barbara, splitting weeks between her mother’s kitchen — avgolemono, wild greens, too much lemon — and mornings on her father’s boat. She cooked in Marseille, then San Sebastián, then a long stretch at a small Los Angeles restaurant that no longer exists.",
      "She opened Maré & Vine at thirty-four with a wood fire, a pasta board, and a stubborn preference for whole fish. The biography is less interesting than the plate. She would rather talk about the sardines.",
    ],
    image: images.chef,
  },
  sourcing: {
    title: "What we buy",
    paragraphs: [
      "Fish comes from two boats and one trusted monger in San Pedro. Vegetables from the Saturday market and a few farms in Santa Ynez and Ojai. Olive oil from Paso Robles, with a Greek tin in the back for the days that need it.",
      "We write the menu twice a week. If the tomatoes are not worth serving, they are not on the list. That is the whole philosophy, and it is not a slogan.",
    ],
    image: images.produce,
  },
  neighborhood: {
    title: "The room next door",
    paragraphs: [
      "We are a neighborhood restaurant first. Birthdays, Tuesdays, the couple who always sit at the window. Reservations help; a seat at the bar is often how people find us.",
      "The neighborhood has changed since the flower shop closed. We have tried to stay the sort of place you can walk to, twice a month, without making an occasion of it — though we will make an occasion, if you ask.",
    ],
  },
  timeline: [
    {
      year: "2016",
      title: "The idea",
      text: "Elena leaves a larger kitchen with a notebook of coastal plates and a lease she cannot yet afford.",
    },
    {
      year: "2019",
      title: "Mariner Street",
      text: "The flower shop becomes a dining room. First service is a Tuesday in April. Forty-two covers. The pasta is late.",
    },
    {
      year: "2021",
      title: "The back room",
      text: "A storage alcove is opened into a private table. Families start booking it before we have a name for the space.",
    },
    {
      year: "2024",
      title: "Still here",
      text: "The list is shorter. The fire is hotter. The regulars still ask for the sardines even when they are not printed.",
    },
  ],
} as const;
