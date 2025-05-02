import { z } from "zod";

export const createEmployeeSchema = z.object({
  user: z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
    managedUser: z.boolean(), // passed programmatically, not shown in form
  }),
  age: z.number().int().nonnegative(),
  gender: z.string(),
  roleId: z.number().int().nonnegative(),
  salary: z.number().nonnegative(),
  pharmacyId: z.number().int().nonnegative(), // passed programmatically, not shown in form
  shiftId: z.number().int().nonnegative(),
});

export type CreateEmployeeValues = z.infer<typeof createEmployeeSchema>;
