import { useEffect, useId, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { navLinks, restaurant } from "@/data/restaurant";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { useScrolled } from "@/hooks/useScrolled";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { useFocusTrap } from "@/hooks/useFocusTrap";

const overlayRoutes = new Set(["/", "/private-dining", "/story"]);

type HeaderProps = {
  onReserve: () => void;
};

export function Header({ onReserve }: HeaderProps) {
  const { pathname } = useLocation();
  const scrolled = useScrolled(18);
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const trapRef = useFocusTrap(open);
  const overlay = overlayRoutes.has(pathname) && !scrolled && !open;
  useLockBodyScroll(open);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-500",
        overlay
          ? "bg-transparent text-ivory"
          : "bg-paper/95 text-charcoal shadow-[0_1px_0_rgb(26_23_20/0.08)] backdrop-blur-md",
      )}
    >
      <div className="container-wide flex items-center justify-between gap-4 py-4 md:py-5">
        <Link
          to="/"
          className="font-display text-[1.65rem] leading-none tracking-tight md:text-[1.85rem]"
        >
          {restaurant.name}
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className="nav-link"
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            className={cn(
              "hidden sm:inline-flex",
              overlay && "border-ivory/40 bg-transparent text-ivory hover:border-ivory hover:bg-ivory/10",
            )}
            variant={overlay ? "ghost" : "primary"}
            onClick={onReserve}
          >
            Reserve a Table
          </Button>
          <button
            type="button"
            className="inline-flex h-12 w-12 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span className="relative block h-3 w-6">
              <span
                className={cn(
                  "absolute left-0 h-px w-6 bg-current transition-transform duration-300",
                  open ? "top-1.5 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-1.5 h-px w-6 bg-current transition-opacity duration-200",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-px w-6 bg-current transition-transform duration-300",
                  open ? "top-1.5 -rotate-45" : "top-3",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id={menuId}
        ref={trapRef}
        className={cn(
          "lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <div className="border-t border-charcoal/10 bg-paper px-5 py-8 text-charcoal">
          <nav aria-label="Mobile">
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className="block py-3 font-display text-3xl"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-6">
            <Button
              onClick={() => {
                setOpen(false);
                onReserve();
              }}
            >
              Reserve a Table
            </Button>
          </div>
          <p className="mt-8 text-sm text-stone">
            {restaurant.addressLine}
            <br />
            <a className="underline decoration-mist underline-offset-4" href={restaurant.phoneHref}>
              {restaurant.phoneDisplay}
            </a>
          </p>
        </div>
      </div>
    </header>
  );
}
