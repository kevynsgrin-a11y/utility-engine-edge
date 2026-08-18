import { createContext, useContext } from "react";

export type ReservationContextValue = {
  openReserve: () => void;
};

export const ReservationContext = createContext<ReservationContextValue | null>(null);

export function useReservation(): ReservationContextValue {
  const value = useContext(ReservationContext);
  if (!value) {
    throw new Error("useReservation must be used within Layout");
  }
  return value;
}
