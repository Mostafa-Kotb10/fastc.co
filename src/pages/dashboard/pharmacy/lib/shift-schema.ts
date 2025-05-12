import { z } from "zod";

export const shiftSchema = z.object({
  name: z.string().nonempty("Shift name is required"),
  startTime: z.any(),
  endTime: z.any(),
});

export type ShiftValues = z.infer<typeof shiftSchema>;
