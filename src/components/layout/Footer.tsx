import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { navLinks, restaurant } from "@/data/restaurant";
import { Button } from "@/components/ui/Button";

export function Footer() {
  const [joined, setJoined] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setJoined(true);
  };

  return (
    <footer className="bg-charcoal text-ivory">
      <div className="container-wide py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="font-display text-4xl">{restaurant.name}</p>
            <p className="mt-4 max-w-sm text-ivory/70">
              Seasonal coastal Mediterranean cooking in Echo Park. A small room,
              a wood fire, and a table when you need one.
            </p>
            <p className="mt-6 text-sm text-ivory/55">
              Est. {restaurant.established}
            </p>
          </div>

          <div className="lg:col-span-2">
            <p className="eyebrow text-brass-light">Visit</p>
            <ul className="mt-4 space-y-2 text-sm text-ivory/80">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link className="hover:text-ivory" to={link.to}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow text-brass-light">The room</p>
            <address className="mt-4 not-italic text-sm leading-relaxed text-ivory/80">
              {restaurant.streetAddress}
              <br />
              {restaurant.neighborhood}, {restaurant.city}, {restaurant.state}{" "}
              {restaurant.postalCode}
              <br />
              <a className="mt-2 inline-block hover:text-ivory" href={restaurant.phoneHref}>
                {restaurant.phoneDisplay}
              </a>
              <br />
              <a className="hover:text-ivory" href={`mailto:${restaurant.email}`}>
                {restaurant.email}
              </a>
            </address>
            <ul className="mt-5 space-y-1 text-sm text-ivory/70">
              {restaurant.hours.map((row) => (
                <li key={row.days} className="flex justify-between gap-4">
                  <span>{row.days}</span>
                  <span>{row.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow text-brass-light">Notes from the house</p>
            <p className="mt-4 text-sm text-ivory/70">
              Occasional menu changes, wine arrivals, and the nights we close
              for a private dinner. No weekly barrage.
            </p>
            {joined ? (
              <p className="mt-6 text-sm text-brass-light">
                Thank you. This list is a visual demonstration — nothing was stored.
              </p>
            ) : (
              <form className="mt-6" onSubmit={onSubmit}>
                <label className="sr-only" htmlFor="newsletter-email">
                  Email address
                </label>
                <div className="flex items-end gap-3">
                  <input
                    id="newsletter-email"
                    name="email"
                    type="email"
                    required
                    placeholder="Email"
                    className="field field-dark flex-1"
                    autoComplete="email"
                  />
                  <Button type="submit" variant="light" className="min-h-11 px-4">
                    Join
                  </Button>
                </div>
              </form>
            )}
            <p className="mt-6 text-sm">
              <a
                className="text-ivory/70 underline decoration-ivory/25 underline-offset-4 hover:text-ivory"
                href={restaurant.instagram}
              >
                {restaurant.instagramHandle}
              </a>
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-ivory/10 pt-6 text-xs tracking-wide text-ivory/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {restaurant.name}. All rights reserved.</p>
          <p>A fictional restaurant concept created for a portfolio demonstration.</p>
        </div>
      </div>
    </footer>
  );
}
