import { Button } from "@/components/ui/Button";
import { useReservation } from "@/hooks/useReservation";

type CtaBandProps = {
  title: string;
  text: string;
};

export function CtaBand({ title, text }: CtaBandProps) {
  const { openReserve } = useReservation();

  return (
    <section className="bg-olive-deep text-ivory">
      <div className="container-page flex flex-col items-start justify-between gap-8 py-16 md:flex-row md:items-end md:py-20">
        <div className="max-w-xl">
          <h2 className="display-title text-4xl md:text-5xl">{title}</h2>
          <p className="mt-4 text-ivory/75">{text}</p>
        </div>
        <Button variant="light" onClick={openReserve}>
          Reserve a Table
        </Button>
      </div>
    </section>
  );
}
