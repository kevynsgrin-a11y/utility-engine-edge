import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  kicker?: string;
  align?: "left" | "center";
  invert?: boolean;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  kicker,
  align = "left",
  invert = false,
  className,
}: SectionHeadingProps) {
  return (
    <header
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className={cn("eyebrow mb-4", invert && "text-brass-light")}>{eyebrow}</p>
      ) : null}
      <h2
        className={cn(
          "display-title text-[2.15rem] sm:text-[2.75rem] md:text-[3.25rem]",
          invert ? "text-ivory" : "text-charcoal",
        )}
      >
        {title}
      </h2>
      {kicker ? (
        <p
          className={cn(
            "mt-5 max-w-xl text-[1.02rem] leading-relaxed",
            invert ? "text-ivory/75" : "text-ink/80",
            align === "center" && "mx-auto",
          )}
        >
          {kicker}
        </p>
      ) : null}
    </header>
  );
}
