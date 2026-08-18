import { Seo } from "@/components/seo/Seo";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/ui/CtaBand";
import {
  dietaryLegend,
  formatPrice,
  menuCategories,
  menuDisclaimer,
  type DietaryTag,
} from "@/data/menu";
import { restaurant } from "@/data/restaurant";

const tags = Object.entries(dietaryLegend) as Array<[DietaryTag, string]>;

export function MenuPage() {
  return (
    <main id="main">
      <Seo
        title="Menu — Maré & Vine"
        description="The seasonal menu at Maré & Vine: small plates, pasta, coastal fish, wood-fired meats, desserts, cocktails, and wine."
        path="/menu"
      />

      <header className="bg-paper pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container-page">
          <p className="eyebrow">The menu</p>
          <h1 className="display-title mt-4 max-w-3xl text-5xl md:text-6xl">
            Written twice a week, cooked the same night.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink/80">
            These plates are typical of the current season at {restaurant.name}.
            If you have an allergy, tell us when you reserve.
          </p>
        </div>
        <nav className="container-wide mt-12 overflow-x-auto" aria-label="Menu categories">
          <ul className="flex min-w-max gap-6 border-y border-charcoal/10 py-4 text-xs font-medium uppercase tracking-[0.18em] text-stone">
            {menuCategories.map((category) => (
              <li key={category.id}>
                <a className="hover:text-charcoal" href={`#${category.id}`}>
                  {category.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <div className="container-page pb-8">
        <p className="max-w-2xl text-sm leading-relaxed text-stone">{menuDisclaimer}</p>
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs uppercase tracking-[0.14em] text-olive">
          {tags.map(([code, label]) => (
            <li key={code}>
              {code} — {label}
            </li>
          ))}
        </ul>
      </div>

      <div className="container-page space-y-20 pb-24 md:space-y-28">
        {menuCategories.map((category) => (
          <Reveal as="section" key={category.id}>
            <section id={category.id} className="scroll-mt-28">
              <div className="grid gap-6 border-t border-charcoal/15 pt-8 md:grid-cols-[minmax(0,0.8fr)_1.2fr]">
                <div>
                  <h2 className="display-title text-4xl md:text-5xl">{category.title}</h2>
                  {category.intro ? (
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-stone">
                      {category.intro}
                    </p>
                  ) : null}
                </div>
                <ul>
                  {category.items.map((item) => (
                    <li
                      key={item.name}
                      className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 border-b border-charcoal/8 py-5 first:pt-0"
                    >
                      <h3 className="menu-item-name">{item.name}</h3>
                      <p className="pt-1 text-sm text-stone">{item.note ?? formatPrice(item.price)}</p>
                      <p className="col-span-2 max-w-xl text-sm leading-relaxed text-ink/70">
                        {item.description}
                        {item.dietary?.length ? (
                          <span className="ml-2 text-xs tracking-[0.12em] text-olive">
                            {item.dietary.join(" · ")}
                          </span>
                        ) : null}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </Reveal>
        ))}
      </div>

      <CtaBand
        title="Sit down with the list."
        text="Reservations recommended after 6:30. The bar keeps a few seats for the neighborhood."
      />
    </main>
  );
}
