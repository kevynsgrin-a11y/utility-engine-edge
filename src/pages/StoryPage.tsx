import { Seo } from "@/components/seo/Seo";
import { PageHero } from "@/components/ui/PageHero";
import { Picture } from "@/components/ui/Picture";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/ui/CtaBand";
import { images } from "@/data/images";
import { story } from "@/data/story";
import { restaurant } from "@/data/restaurant";

export function StoryPage() {
  return (
    <main id="main">
      <Seo
        title="Our Story — Maré & Vine"
        description="How chef Elena Costa opened Maré & Vine in a former Echo Park flower shop, and how the kitchen still buys from the coast."
        path="/story"
        image={images.storyHero.src}
      />

      <PageHero
        eyebrow={story.heroEyebrow}
        title={story.heroTitle}
        image={images.storyHero}
      />

      <section className="py-20 md:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="display-title text-4xl md:text-5xl">{story.origin.title}</h2>
          </Reveal>
          <Reveal delayMs={80} className="space-y-5 text-lg leading-relaxed text-ink/80">
            {story.origin.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="bg-cream/60">
        <div className="container-wide grid items-center gap-12 py-20 md:grid-cols-2 md:py-28">
          <Reveal>
            <Picture image={story.chef.image} className="aspect-[4/5]" />
          </Reveal>
          <Reveal delayMs={100} className="md:pl-6">
            <p className="eyebrow">{story.chef.role}</p>
            <h2 className="display-title mt-3 text-4xl md:text-5xl">{story.chef.title}</h2>
            <div className="mt-8 space-y-5 leading-relaxed text-ink/80">
              {story.chef.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-wide grid items-center gap-12 md:grid-cols-2">
          <Reveal className="md:order-2">
            <Picture image={story.sourcing.image} className="aspect-[5/4]" />
          </Reveal>
          <Reveal className="md:order-1 md:pr-8">
            <h2 className="display-title text-4xl md:text-5xl">{story.sourcing.title}</h2>
            <div className="mt-8 space-y-5 leading-relaxed text-ink/80">
              {story.sourcing.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-charcoal/10 bg-paper">
        <div className="container-page py-20 md:py-24">
          <p className="eyebrow">Along the way</p>
          <h2 className="display-title mt-3 text-4xl">A few years, plainly told.</h2>
          <ol className="mt-14">
            {story.timeline.map((entry) => (
              <li
                key={entry.year}
                className="grid gap-4 border-t border-charcoal/10 py-8 md:grid-cols-[7rem_1fr] md:gap-12"
              >
                <p className="font-display text-3xl text-olive">{entry.year}</p>
                <div>
                  <h3 className="font-display text-2xl">{entry.title}</h3>
                  <p className="mt-2 max-w-xl text-ink/75">{entry.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-narrow text-center">
          <h2 className="display-title text-4xl md:text-5xl">{story.neighborhood.title}</h2>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink/80">
            {story.neighborhood.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <p className="mt-10 text-sm uppercase tracking-[0.18em] text-stone">
            {restaurant.streetAddress} · Echo Park
          </p>
        </div>
      </section>

      <CtaBand
        title="Come sit at the window."
        text="Tuesday through Sunday. We will save a table if you ask."
      />
    </main>
  );
}
