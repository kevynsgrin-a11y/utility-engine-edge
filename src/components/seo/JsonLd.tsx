import { restaurant, siteUrl } from "@/data/restaurant";
import { images } from "@/data/images";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: restaurant.name,
    image: [images.hero.src, images.diningRoom.src, images.introPlate.src],
    url: siteUrl,
    telephone: restaurant.phoneHref.replace("tel:", ""),
    email: restaurant.email,
    priceRange: restaurant.priceRange,
    servesCuisine: restaurant.cuisine,
    menu: `${siteUrl}/menu`,
    acceptsReservations: true,
    address: {
      "@type": "PostalAddress",
      streetAddress: restaurant.streetAddress,
      addressLocality: restaurant.city,
      addressRegion: restaurant.state,
      postalCode: restaurant.postalCode,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 34.0781,
      longitude: -118.2606,
    },
    openingHoursSpecification: restaurant.openingHoursSpecification.map((spec) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: spec.dayOfWeek,
      opens: spec.opens,
      closes: spec.closes,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
