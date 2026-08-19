import { useState, type FormEvent } from "react";
import { Seo } from "@/components/seo/Seo";
import { PageHero } from "@/components/ui/PageHero";
import { Picture } from "@/components/ui/Picture";
import { Reveal } from "@/components/ui/Reveal";
import { Button, Field } from "@/components/ui/Button";
import { images } from "@/data/images";
import {
  eventSpaces,
  eventTypes,
  gallery,
  privateDiningIntro,
  sampleMenu,
  serviceOptions,
} from "@/data/privateDining";
import { restaurant } from "@/data/restaurant";

export function PrivateDiningPage() {
  const [sent, setSent] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <main id="main">
      <Seo
        title="Private Dining — Maré & Vine"
        description="Host an intimate dinner at Maré & Vine. Back room, chef’s table, or a full dining room buyout in Echo Park."
        path="/private-dining"
        image={images.privateRoom.src}
      />

      <PageHero
        eyebrow={privateDiningIntro.eyebrow}
        title={privateDiningIntro.title}
        lede={privateDiningIntro.lede}
        image={images.privateRoom}
      />

      <section className="py-20 md:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_0.9fr]">
          <Reveal>
            <p className="font-display text-3xl leading-snug md:text-4xl">
              The cooking does not change for a private table. The pacing does.
              We will write a menu from the same market, poured with a little more
              attention to the clock.
            </p>
          </Reveal>
          <Reveal delayMs={80}>
            <p className="text-ink/80">
              Inquiries are answered by our events desk within two business days.
              Friday and Saturday buyouts are rare; weeknights and Sundays are the
              natural fit. A signed agreement and a deposit confirm the date.
            </p>
            <p className="mt-4 text-sm text-stone">
              Write {restaurant.eventsEmail} or use the form below.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-8">
        <div className="container-wide space-y-24">
          {eventSpaces.map((space, index) => (
            <Reveal key={space.id}>
              <article
                className={`grid items-center gap-10 lg:grid-cols-2 ${index % 2 ? "lg:[&>div:first-child]:order-2" : ""}`}
              >
                <Picture image={space.image} className="aspect-[4/5] md:aspect-[5/6]" />
                <div className="max-w-lg lg:px-8">
                  <p className="eyebrow">0{index + 1}</p>
                  <h2 className="display-title mt-3 text-4xl md:text-5xl">{space.name}</h2>
                  <p className="mt-2 text-sm uppercase tracking-[0.16em] text-stone">
                    {space.capacity}
                  </p>
                  <p className="mt-6 leading-relaxed text-ink/80">{space.description}</p>
                  <dl className="mt-8 grid grid-cols-2 gap-4 text-sm">
                    <div className="border-t border-charcoal/15 pt-3">
                      <dt className="text-stone">Seated</dt>
                      <dd className="mt-1 font-display text-2xl">{space.seated}</dd>
                    </div>
                    <div className="border-t border-charcoal/15 pt-3">
                      <dt className="text-stone">Standing</dt>
                      <dd className="mt-1 font-display text-2xl">{space.standing}</dd>
                    </div>
                  </dl>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-wide grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="display-title text-4xl">How we serve.</h2>
            <p className="mt-4 max-w-sm text-ink/75">
              Most private dinners take the shared menu. We can plate a prix fixe
              when the table needs more structure.
            </p>
            <ul className="mt-10 space-y-8">
              {serviceOptions.map((option) => (
                <li key={option.title} className="border-t border-charcoal/10 pt-5">
                  <h3 className="font-display text-2xl">{option.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">{option.detail}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-cream px-6 py-10 sm:px-10">
            <p className="eyebrow">A sample evening</p>
            <h3 className="display-title mt-3 text-3xl">Shared menu, late spring</h3>
            <ol className="mt-8 space-y-5">
              {sampleMenu.map((row) => (
                <li key={row.course} className="flex gap-6 border-b border-charcoal/10 pb-4">
                  <span className="w-28 shrink-0 text-xs uppercase tracking-[0.16em] text-olive">
                    {row.course}
                  </span>
                  <span className="font-display text-xl">{row.plate}</span>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-sm text-stone">
              Wine pairings available, four glasses, mostly coastal.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-wide">
          <h2 className="display-title text-4xl">The rooms, in photographs.</h2>
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {gallery.map((image, index) => (
              <Picture
                key={image.id}
                image={image}
                className={
                  index === 1 || index === 2
                    ? "aspect-[4/3] col-span-2 md:col-span-1 md:aspect-[4/5]"
                    : "aspect-[4/5]"
                }
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-olive-deep text-ivory" id="inquire">
        <div className="container-page grid gap-12 py-20 md:py-24 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-brass-light">Inquiry</p>
            <h2 className="display-title mt-4 text-4xl md:text-5xl">
              Tell us about the evening.
            </h2>
            <p className="mt-5 max-w-md text-ivory/75">
              This form is presentational. Submit it to see the confirmation
              state; nothing is sent. For a genuine inquiry, email {restaurant.eventsEmail}.
            </p>
            <ul className="mt-10 space-y-2 text-sm text-ivory/60">
              {eventTypes.map((type) => (
                <li key={type}>— {type}</li>
              ))}
            </ul>
          </div>

          {sent ? (
            <div className="flex flex-col justify-center border border-ivory/15 px-6 py-10">
              <p className="eyebrow text-brass-light">Received</p>
              <h3 className="display-title mt-3 text-3xl">Thank you.</h3>
              <p className="mt-4 text-ivory/75">
                In a live restaurant, our events desk would reply within two
                business days. Here, the submission is simulated only.
              </p>
              <Button variant="light" className="mt-8 w-fit" onClick={() => setSent(false)}>
                Send another
              </Button>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={onSubmit}>
              <Field label="Name" dark>
                <input className="field field-dark" name="name" autoComplete="name" required />
              </Field>
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Email" dark>
                  <input className="field field-dark" name="email" type="email" required />
                </Field>
                <Field label="Phone" dark>
                  <input className="field field-dark" name="phone" type="tel" autoComplete="tel" required />
                </Field>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Event type" dark>
                  <select className="field field-dark" name="eventType" required defaultValue="">
                    <option value="" disabled>
                      Select
                    </option>
                    {eventTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Preferred date" dark>
                  <input className="field field-dark" name="date" type="date" required />
                </Field>
              </div>
              <Field label="Estimated guest count" dark>
                <input className="field field-dark" name="guests" type="number" min={6} max={55} required />
              </Field>
              <Field label="Message" dark>
                <textarea className="field field-dark min-h-28 resize-y" name="message" required />
              </Field>
              <Button type="submit" variant="light">
                Send inquiry
              </Button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
