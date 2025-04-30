import { z } from "zod";

export const shiftSchema = z.object({
  name: z.string().nonempty(),
  startTime: z.object({
    hour: z.number(),
  }),
  endTime: z.object({
    hour: z.number(),
  }),
});

export type ShiftValues = z.infer<typeof shiftSchema>;


