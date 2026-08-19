import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Picture } from "@/components/ui/Picture";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Seo } from "@/components/seo/Seo";
import { useReservation } from "@/hooks/useReservation";
import { images } from "@/data/images";
import { featuredDishes, formatPrice } from "@/data/menu";
import { experienceNotes, pressQuotes } from "@/data/press";
import { restaurant } from "@/data/restaurant";

export function HomePage() {
  const { openReserve } = useReservation();
  const [activeDish, setActiveDish] = useState(0);
  const current = featuredDishes[activeDish] ?? featuredDishes[0];

  return (
    <main id="main">
      <Seo
        title="Maré & Vine — Coastal Mediterranean cooking in Echo Park"
        description="An intimate neighborhood bistro in Echo Park serving seasonal coastal Mediterranean plates. Reserve a table Tuesday through Sunday."
        path="/"
        image={images.hero.src}
      />

      <section className="relative isolate min-h-[100svh] bg-charcoal text-ivory">
        <div className="absolute inset-0 lg:left-[42%]">
          <Picture
            image={images.hero}
            loading="eager"
            fetchPriority="high"
            className="h-full min-h-[52vh] w-full lg:min-h-full"
            imgClassName="img-kenburns"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/25 to-charcoal/20 lg:bg-gradient-to-r lg:from-charcoal/30 lg:via-transparent lg:to-charcoal/20" />
        </div>

        <div className="relative container-wide grid min-h-[100svh] items-end pb-12 pt-28 lg:grid-cols-[minmax(0,0.92fr)_1.1fr] lg:items-center lg:pb-0 lg:pt-24">
          <div className="max-w-xl">
            <p className="eyebrow text-brass-light">Echo Park · Est. {restaurant.established}</p>
            <h1 className="display-title mt-5 text-[2.8rem] sm:text-6xl lg:text-[4.4rem]">
              The sea, the vine, the table.
            </h1>
            <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-ivory/78">
              Seasonal Mediterranean cooking in a small Echo Park dining room.
              Wood fire, a short wine list, and a neighborhood that walks over.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button variant="light" onClick={openReserve}>
                Reserve a Table
              </Button>
              <Button to="/menu" variant="ghost" className="border-ivory/35 text-ivory">
                See the menu
              </Button>
            </div>
            <p className="mt-10 text-xs uppercase tracking-[0.22em] text-ivory/55">
              Tuesday – Sunday · {restaurant.phoneDisplay}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-page grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <p className="font-display text-[2rem] leading-snug text-olive md:text-[2.35rem]">
              We cook from the coast we know — citrus, olive oil, whole fish —
              and keep the room small enough to remember your name.
            </p>
          </Reveal>
          <Reveal delayMs={120}>
            <p className="eyebrow">The house</p>
            <p className="mt-4 text-lg leading-relaxed text-ink/85">
              Maré & Vine is a neighborhood bistro with a Mediterranean kitchen.
              The menu is short on purpose. Ingredients arrive from San Pedro boats,
              Saturday market growers, and a few farms we have cooked with for years.
            </p>
            <p className="mt-5 leading-relaxed text-ink/75">
              Come for a Tuesday pasta and a glass of Assyrtiko, or a Saturday
              branzino that takes the whole table. Hospitality here is unhurried,
              never stiff.
            </p>
            <Link
              to="/story"
              className="mt-8 inline-flex text-sm font-medium uppercase tracking-[0.18em] text-olive underline decoration-sand underline-offset-[6px] hover:text-charcoal"
            >
              Read our story
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-charcoal/10 py-20 md:py-28">
        <div className="container-wide">
          <SectionHeading
            eyebrow="From tonight’s board"
            title="Plates we are known for."
            kicker="A few constants. The rest of the menu follows the market."
          />
          <div className="mt-12 grid items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_0.95fr] lg:gap-16">
            {current ? (
              <Reveal>
                <Picture
                  image={current.image}
                  className="aspect-[4/5] w-full md:aspect-[5/6]"
                />
                <p className="mt-4 text-sm text-stone">
                  {current.number} — {current.name}
                </p>
              </Reveal>
            ) : null}
            <div>
              <ul>
                {featuredDishes.map((dish, index) => {
                  const selected = index === activeDish;
                  return (
                    <li key={dish.name} className="border-b border-charcoal/10">
                      <button
                        type="button"
                        className={cnDish(selected)}
                        onClick={() => setActiveDish(index)}
                        onMouseEnter={() => setActiveDish(index)}
                        aria-pressed={selected}
                      >
                        <span className="flex items-baseline justify-between gap-4">
                          <span className="font-display text-2xl md:text-[1.85rem]">{dish.name}</span>
                          <span className="text-sm text-stone">{formatPrice(dish.price)}</span>
                        </span>
                        <span className="mt-2 block max-w-md text-left text-sm leading-relaxed text-ink/70">
                          {dish.description}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              <Button to="/menu" variant="ghost" className="mt-8">
                Full menu
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-olive-deep text-ivory">
        <div className="grid lg:grid-cols-2">
          <Picture
            image={images.diningRoom}
            className="min-h-[52vh] lg:min-h-full"
          />
          <div className="flex flex-col justify-center px-6 py-16 sm:px-12 lg:px-16 lg:py-24">
            <Reveal>
              <p className="eyebrow text-brass-light">The evening</p>
              <h2 className="display-title mt-4 text-4xl md:text-5xl">
                A dining room built for talking.
              </h2>
              <p className="mt-6 max-w-md text-ivory/75">
                Forty-two seats, a bar that takes walk-ins, and service that will
                tell you what actually came in that morning. We light the room for
                faces, not photographs.
              </p>
            </Reveal>
            <div className="mt-12 grid gap-8 sm:grid-cols-3">
              {experienceNotes.map((note) => (
                <Reveal key={note.title} delayMs={80}>
                  <p className="text-xs tracking-[0.2em] text-brass-light">{note.number}</p>
                  <h3 className="mt-3 font-display text-2xl">{note.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ivory/68">{note.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-wide grid items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5 lg:col-start-1">
            <Picture image={images.chef} className="aspect-[4/5]" />
          </Reveal>
          <Reveal className="lg:col-span-6 lg:col-start-7" delayMs={100}>
            <p className="eyebrow">Chef & owner</p>
            <h2 className="display-title mt-4 text-4xl md:text-5xl">{restaurant.chef.name}</h2>
            <p className="mt-2 text-sm uppercase tracking-[0.16em] text-stone">
              {restaurant.chef.title}
            </p>
            <p className="mt-8 text-lg leading-relaxed text-ink/85">
              {restaurant.chef.shortBio}
            </p>
            <p className="mt-5 leading-relaxed text-ink/75">
              She would rather talk about the sardines than the résumé. The kitchen
              is open to the pass; if you sit at the counter, you will see the work.
            </p>
            <Link
              to="/story"
              className="mt-8 inline-flex text-sm font-medium uppercase tracking-[0.18em] text-olive underline decoration-sand underline-offset-[6px]"
            >
              More about Elena
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <Picture
          image={images.privateRoom}
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-charcoal/70" />
        <div className="relative container-page py-24 md:py-32">
          <Reveal>
            <p className="eyebrow text-brass-light">Private dining</p>
            <h2 className="display-title mt-4 max-w-2xl text-4xl text-ivory md:text-6xl">
              Intimate events, still cooked by the house.
            </h2>
            <p className="mt-6 max-w-lg text-ivory/75">
              The back room, a chef’s table at the pass, or the whole dining room
              on a quieter night. Birthdays, rehearsals, and the dinners that need
              a door that closes.
            </p>
            <Button to="/private-dining" variant="light" className="mt-10">
              Plan an evening
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-narrow">
          <p className="eyebrow text-center">From the press</p>
          <div className="mt-12 space-y-16">
            {pressQuotes.map((item) => (
              <Reveal key={item.source} as="blockquote">
                <p className="font-display text-[1.85rem] leading-snug text-charcoal md:text-[2.15rem]">
                  “{item.quote}”
                </p>
                <footer className="mt-5 text-sm uppercase tracking-[0.16em] text-stone">
                  {item.source}
                  <span className="text-mist"> · </span>
                  {item.attribution}
                </footer>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-charcoal/10">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[22rem] bg-cream">
            <Picture image={images.street} className="h-full min-h-[22rem]" />
            <div className="absolute inset-0 bg-olive-deep/25" />
            <div className="absolute bottom-6 left-6 right-6 bg-paper/95 p-5 shadow-[var(--shadow-soft)]">
              <p className="eyebrow">Find us</p>
              <p className="mt-2 font-display text-2xl">{restaurant.streetAddress}</p>
              <p className="text-sm text-stone">
                {restaurant.neighborhood}, {restaurant.city}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center bg-paper px-6 py-14 sm:px-12">
            <h2 className="display-title text-4xl">Come by.</h2>
            <p className="mt-4 max-w-md text-ink/75">{restaurant.reservationNote}</p>
            <dl className="mt-8 space-y-3 text-sm">
              {restaurant.hours.map((row) => (
                <div key={row.days} className="flex justify-between gap-6 border-b border-charcoal/10 pb-3">
                  <dt>{row.days}</dt>
                  <dd className="text-stone">{row.time}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-sm">
              <a className="underline decoration-sand underline-offset-4" href={restaurant.phoneHref}>
                {restaurant.phoneDisplay}
              </a>
              <span className="text-mist"> · </span>
              <a className="underline decoration-sand underline-offset-4" href={`mailto:${restaurant.email}`}>
                {restaurant.email}
              </a>
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button onClick={openReserve}>Reserve a Table</Button>
              <Button to="/visit" variant="ghost">
                Visiting details
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function cnDish(selected: boolean): string {
  return [
    "w-full py-5 text-left transition-colors",
    selected ? "text-charcoal" : "text-charcoal/70 hover:text-charcoal",
  ].join(" ");
}
