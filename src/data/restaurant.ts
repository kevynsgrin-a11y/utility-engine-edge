export const siteUrl = "https://mareandvine.pages.dev";

export const restaurant = {
  name: "Maré & Vine",
  shortName: "Maré & Vine",
  legalName: "Maré & Vine",
  tagline: "Coastal cooking, close to home.",
  description:
    "An intimate Echo Park bistro serving seasonal Mediterranean plates, coastal seafood, and a tightly kept wine list.",
  established: 2019,
  neighborhood: "Echo Park",
  city: "Los Angeles",
  state: "CA",
  postalCode: "90026",
  streetAddress: "214 Mariner Street",
  addressLine: "214 Mariner Street, Echo Park, Los Angeles, CA 90026",
  mapsQuery: "214+Mariner+Street+Echo+Park+Los+Angeles+CA+90026",
  phoneDisplay: "(323) 555-0148",
  phoneHref: "tel:+13235550148",
  email: "reservations@mareandvine.com",
  eventsEmail: "events@mareandvine.com",
  pressEmail: "press@mareandvine.com",
  instagram: "https://instagram.com/mareandvine",
  instagramHandle: "@mareandvine",
  priceRange: "$$$",
  cuisine: "Mediterranean",
  chef: {
    name: "Elena Costa",
    title: "Chef & Owner",
    shortBio:
      "Born in Santa Barbara to a Greek mother and a California fisherman, Elena Costa cooks from the coast she grew up on — citrus, olive oil, wood fire, and whatever the market will give her that morning.",
  },
  hours: [
    { days: "Tuesday – Thursday", time: "5:00 – 10:00 pm", weekday: true },
    { days: "Friday – Saturday", time: "5:00 – 11:00 pm", weekday: true },
    { days: "Sunday", time: "4:00 – 9:00 pm", weekday: true },
    { days: "Monday", time: "Closed", weekday: false },
  ],
  openingHoursSpecification: [
    { dayOfWeek: ["Tuesday", "Wednesday", "Thursday"], opens: "17:00", closes: "22:00" },
    { dayOfWeek: ["Friday", "Saturday"], opens: "17:00", closes: "23:00" },
    { dayOfWeek: ["Sunday"], opens: "16:00", closes: "21:00" },
  ],
  kitchenNote: "The kitchen closes 45 minutes before the dining room.",
  reservationNote:
    "Reservations recommended. Walk-ins are welcome at the bar when a seat is free.",
  social: [
    { label: "Instagram", href: "https://instagram.com/mareandvine" },
    { label: "Resy", href: "#reserve" },
  ],
} as const;

export const navLinks = [
  { label: "Menu", to: "/menu" },
  { label: "Private Dining", to: "/private-dining" },
  { label: "Our Story", to: "/story" },
  { label: "Visit", to: "/visit" },
] as const;

export type NavLink = (typeof navLinks)[number];
