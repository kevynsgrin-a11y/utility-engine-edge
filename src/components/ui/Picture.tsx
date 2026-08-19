import { cn } from "@/lib/cn";
import type { SiteImage } from "@/data/images";

type PictureProps = {
  image: SiteImage;
  className?: string;
  imgClassName?: string;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
  decorative?: boolean;
};

export function Picture({
  image,
  className,
  imgClassName,
  loading = "lazy",
  fetchPriority,
  decorative = false,
}: PictureProps) {
  return (
    <div className={cn("image-frame", className)}>
      <img
        src={image.src}
        srcSet={image.srcSet}
        sizes={image.sizes}
        width={image.width}
        height={image.height}
        alt={decorative ? "" : image.alt}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        className={imgClassName}
      />
    </div>
  );
}
