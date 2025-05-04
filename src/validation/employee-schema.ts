import { z } from "zod";

export const createEmployeeSchema = z.object({
  user: z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
    // managedUser: z.boolean(),
  }),
  age: z.coerce.number().int().nonnegative(),
  gender: z.enum(["male", "female"]),
  salary: z.coerce.number().nonnegative(),
  // pharmacyId: z.number().int().nonnegative(),
  shiftId: z.number().int().nonnegative(),
});

export type CreateEmployeeValues = z.infer<typeof createEmployeeSchema>;

export const editEmployeeSchema = z.object({
  id: z.number().int().nonnegative(),
  username: z.string(),
  email: z.string().email(),
  age: z.coerce.number().int().nonnegative(),
  gender: z.enum(["male", "female"]),
  salary: z.coerce.number().nonnegative(),
  shiftId: z.number().int().nonnegative(),
});

export type EditEmployeeValues = z.infer<typeof editEmployeeSchema>;
