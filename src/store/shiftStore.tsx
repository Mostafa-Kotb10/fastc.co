import { Shift } from "@/types/pharmacy.types";
import { ShiftValues } from "@/validation/shift-schema";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type ShiftState = {
  shifts: Shift[];
  addShift: (shift: ShiftValues) => void;
  removeShift: (id: number) => void;
};

export const useShifts = create<ShiftState>()(
  immer((set) => ({
    shifts: [],
    addShift: (shift: ShiftValues) =>
      set((state) => {
        const id = Date.now();

        const newShift: Shift = {
          id,
          ...shift,
        };

        state.shifts.push(newShift);
      }),
    removeShift: (id: number) =>
      set((state) => {
        state.shifts = state.shifts.filter((shift) => shift.id !== id);
      }),
  })),
);
