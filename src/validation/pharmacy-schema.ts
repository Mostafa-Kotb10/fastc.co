import { z } from "zod";

export const createPharmacySchema = z.object({
  name: z.string().nonempty(),
  address: z.string().nonempty(),
  isBranch: z.boolean().optional(),
  expiryThreshold: z.number().optional(),
  mainBranchId: z.number().optional(),
});

export type CreatePharmacyValues = z.infer<typeof createPharmacySchema>;

export const editPharmacySchema = z.object({
  name: z.string().nonempty(),
  address: z.string().nonempty(),
  expiryThreshold: z.number().optional(),
});

export type EditPharmacyValues = z.infer<typeof editPharmacySchema>;
