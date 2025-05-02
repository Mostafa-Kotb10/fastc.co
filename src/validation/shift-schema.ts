import { z } from "zod";

export const shiftSchema = z.object({
  name: z.string().nonempty("Shift name is required"),
  startTime: z.date(),
  endTime: z.date(),
});

export type ShiftValues = z.infer<typeof shiftSchema>;