import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Button, Field } from "@/components/ui/Button";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { restaurant } from "@/data/restaurant";

type ReservationModalProps = {
  open: boolean;
  onClose: () => void;
};

const times = ["5:00 pm", "5:30 pm", "6:00 pm", "6:30 pm", "7:00 pm", "7:30 pm", "8:00 pm", "8:30 pm"];

export function ReservationModal({ open, onClose }: ReservationModalProps) {
  const trapRef = useFocusTrap(open);
  const [submitted, setSubmitted] = useState(false);
  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) {
      setSubmitted(false);
      return;
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-charcoal/55"
        aria-label="Close reservation dialog"
        onClick={onClose}
      />
      <div
        ref={trapRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="reserve-title"
        className="relative z-10 max-h-[92vh] w-full overflow-y-auto bg-paper px-6 py-8 shadow-[var(--shadow-lift)] sm:max-w-lg sm:px-10 sm:py-10"
      >
        <p className="eyebrow">Reservations</p>
        <h2 id="reserve-title" className="display-title mt-3 text-4xl">
          {submitted ? "We have the request." : "A table at Maré & Vine"}
        </h2>

        {submitted ? (
          <div className="mt-6 space-y-6">
            <p className="text-ink/80">
              This is a portfolio demonstration, so no booking was sent. In the
              working restaurant, our team would confirm by email within a few hours.
            </p>
            <p className="text-sm text-stone">
              For a real table, call {restaurant.phoneDisplay} or write {restaurant.email}.
            </p>
            <Button onClick={onClose}>Close</Button>
          </div>
        ) : (
          <form
            className="mt-8 space-y-6"
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitted(true);
            }}
          >
            <p className="text-sm leading-relaxed text-ink/75">
              Tuesday through Sunday. We hold tables for 15 minutes. Parties of seven
              or more belong in private dining.
            </p>
            <Field label="Name">
              <input className="field" name="name" autoComplete="name" required />
            </Field>
            <Field label="Email">
              <input className="field" name="email" type="email" autoComplete="email" required />
            </Field>
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Date">
                <input className="field" name="date" type="date" required />
              </Field>
              <Field label="Time">
                <select className="field" name="time" defaultValue="7:00 pm" required>
                  {times.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
            <Field label="Guests">
              <input
                className="field"
                name="guests"
                type="number"
                min={1}
                max={6}
                defaultValue={2}
                required
              />
            </Field>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button type="submit">Request a table</Button>
              <button
                type="button"
                className="text-sm text-stone underline decoration-mist underline-offset-4 hover:text-charcoal"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>,
    document.body,
  );
}
