import { useMemo, useState, type ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ReservationModal } from "@/components/layout/ReservationModal";
import { JsonLd } from "@/components/seo/JsonLd";
import { ReservationContext } from "@/hooks/useReservation";

export function Layout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const value = useMemo(() => ({ openReserve: () => setOpen(true) }), []);

  return (
    <ReservationContext.Provider value={value}>
      <JsonLd />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header onReserve={() => setOpen(true)} />
      {children}
      <Footer />
      <ReservationModal open={open} onClose={() => setOpen(false)} />
    </ReservationContext.Provider>
  );
}
