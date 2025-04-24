import { z } from "zod";

export const createPharmacySchema = z.object({
  name: z.string().nonempty(),
  address: z.string().nonempty(),
  isBranch: z.boolean().optional(),
  expirayThreshold: z.number().optional(),
});

export type CreatePharmacyValues = z.infer<typeof createPharmacySchema>;
