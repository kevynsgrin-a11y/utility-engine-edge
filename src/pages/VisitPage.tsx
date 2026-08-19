import { Seo } from "@/components/seo/Seo";
import { Button } from "@/components/ui/Button";
import { Picture } from "@/components/ui/Picture";
import { Reveal } from "@/components/ui/Reveal";
import { useReservation } from "@/hooks/useReservation";
import { images } from "@/data/images";
import { restaurant } from "@/data/restaurant";
import { arrivalNotes, visitFaqs } from "@/data/visit";

export function VisitPage() {
  const { openReserve } = useReservation();
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${restaurant.mapsQuery}`;

  return (
    <main id="main">
      <Seo
        title="Visit — Maré & Vine"
        description="Hours, address, parking, and reservations for Maré & Vine at 214 Mariner Street, Echo Park, Los Angeles."
        path="/visit"
        image={images.street.src}
      />

      <header className="bg-olive-deep pt-32 pb-16 text-ivory md:pt-40 md:pb-20">
        <div className="container-page">
          <p className="eyebrow text-brass-light">Visit</p>
          <h1 className="display-title mt-4 max-w-3xl text-5xl md:text-6xl">
            214 Mariner Street, Echo Park.
          </h1>
          <p className="mt-6 max-w-xl text-ivory/75">
            A storefront on a quiet block. Look for the olive door and the small
            brass plaque. We open at five, four on Sundays.
          </p>
        </div>
      </header>

      <section className="grid lg:grid-cols-2">
        <div className="relative min-h-[28rem] bg-cream">
          <Picture image={images.street} className="h-full min-h-[28rem]" />
          <div className="absolute inset-0 bg-charcoal/20" />
          <div
            className="absolute inset-8 border border-ivory/30"
            aria-hidden="true"
          />
          <div className="absolute left-1/2 top-1/2 w-max -translate-x-1/2 -translate-y-1/2 bg-paper px-5 py-4 text-center shadow-[var(--shadow-lift)]">
            <p className="eyebrow">Maré & Vine</p>
            <p className="mt-2 font-display text-2xl">{restaurant.streetAddress}</p>
            <p className="text-sm text-stone">Echo Park · Los Angeles</p>
          </div>
        </div>
        <div className="flex flex-col justify-center bg-paper px-6 py-14 sm:px-12">
          <h2 className="display-title text-4xl">Hours & contact</h2>
          <dl className="mt-8 space-y-3">
            {restaurant.hours.map((row) => (
              <div
                key={row.days}
                className="flex justify-between gap-4 border-b border-charcoal/10 pb-3 text-sm"
              >
                <dt>{row.days}</dt>
                <dd className="text-stone">{row.time}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-sm text-stone">{restaurant.kitchenNote}</p>
          <div className="mt-8 space-y-2 text-sm">
            <p>
              <a className="underline decoration-sand underline-offset-4" href={restaurant.phoneHref}>
                {restaurant.phoneDisplay}
              </a>
            </p>
            <p>
              <a
                className="underline decoration-sand underline-offset-4"
                href={`mailto:${restaurant.email}`}
              >
                {restaurant.email}
              </a>
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button onClick={openReserve}>Reserve a Table</Button>
            <Button href={restaurant.phoneHref} variant="ghost">
              Call
            </Button>
            <Button href={mapsHref} variant="ghost">
              Directions
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container-wide grid gap-10 md:grid-cols-3">
          {arrivalNotes.map((note) => (
            <Reveal key={note.title}>
              <p className="eyebrow">{note.title}</p>
              <p className="mt-4 leading-relaxed text-ink/80">{note.text}</p>
            </Reveal>
          ))}
        </div>
        <div className="container-page mt-16 max-w-3xl border-t border-charcoal/10 pt-10">
          <h2 className="display-title text-3xl">Accessibility</h2>
          <p className="mt-4 leading-relaxed text-ink/80">
            The entrance is step-free from the sidewalk. Aisles accommodate a
            wheelchair, and the restroom is accessible. If you need a specific
            table or have a question before you arrive, call us — we will set
            the room accordingly.
          </p>
        </div>
      </section>

      <section className="bg-cream/70 py-20">
        <div className="container-page">
          <h2 className="display-title text-4xl">Questions we are asked.</h2>
          <div className="mt-10 divide-y divide-charcoal/10 border-y border-charcoal/10">
            {visitFaqs.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 font-display text-2xl [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span className="text-olive transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 max-w-2xl text-ink/75">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
