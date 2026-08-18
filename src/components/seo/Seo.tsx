import { useEffect } from "react";
import { siteUrl } from "@/data/restaurant";

type SeoProps = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

export function Seo({ title, description, path, image }: SeoProps) {
  useEffect(() => {
    const canonical = `${siteUrl}${path}`;
    document.title = title;

    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.head.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        const [key, val] = selector.replace(/[[\]]/g, "").split("=");
        if (key && val) {
          el.setAttribute(key, val.replaceAll('"', ""));
        }
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:url"]', "content", canonical);
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);

    if (image) {
      setMeta('meta[property="og:image"]', "content", image);
      setMeta('meta[name="twitter:image"]', "content", image);
    }

    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonical);
  }, [title, description, path, image]);

  return null;
}
