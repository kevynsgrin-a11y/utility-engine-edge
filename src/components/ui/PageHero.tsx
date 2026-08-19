import { cn } from "@/lib/cn";
import { Picture } from "@/components/ui/Picture";
import type { SiteImage } from "@/data/images";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  lede?: string;
  image: SiteImage;
  compact?: boolean;
};

export function PageHero({ eyebrow, title, lede, image, compact = false }: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative isolate flex items-end overflow-hidden bg-charcoal text-ivory",
        compact ? "min-h-[58vh]" : "min-h-[72vh]",
      )}
    >
      <Picture
        image={image}
        loading="eager"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full"
        imgClassName="img-kenburns"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/55 to-charcoal/25" />
      <div className="relative container-wide pb-14 pt-32 md:pb-20 md:pt-40">
        <p className="eyebrow text-brass-light">{eyebrow}</p>
        <h1 className="display-title mt-4 max-w-4xl text-[2.6rem] sm:text-5xl md:text-[4.15rem]">
          {title}
        </h1>
        {lede ? (
          <p className="mt-5 max-w-xl text-base text-ivory/78 sm:text-lg">{lede}</p>
        ) : null}
      </div>
    </section>
  );
}
