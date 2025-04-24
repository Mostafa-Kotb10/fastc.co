import { z } from "zod";

export const signInSchema = z.object({
  username: z.string().nonempty(),
  password: z.string().min(3),
});
export type SignInValues = z.infer<typeof signInSchema>;

export const signUpSchema = z
  .object({
    username: z.string().regex(/^[^0-9]+$/, "No numbers allowed"),
    email: z.string().email(),
    password: z.string().min(3),
    repassword: z.string().min(3)
  })
  .refine((data) => data.password === data.repassword, {
    message: "Passwords do not match",
    path: ["repassword"]
  });

export type SignUpValues = z.infer<typeof signUpSchema>;
