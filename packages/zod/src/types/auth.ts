import { z } from "zod";

/* ── Login Schema ── */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Email must contain '@' and a valid domain (e.g. you@example.com)"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

/* ── Register Schema ── */
export const registerSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name is too long")
    .regex(/^[a-zA-Z\s'-]+$/, "First name can only contain letters"),

  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name is too long")
    .regex(/^[a-zA-Z\s'-]+$/, "Last name can only contain letters"),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Email must contain '@' and a valid domain (e.g. you@example.com)"),

  phone: z
    .string()
    .min(1, "Mobile number is required")
    .length(10, "Mobile number must be exactly 10 digits")
    .regex(/^[6-9][0-9]{9}$/, "Enter a valid Indian mobile number starting with 6, 7, 8 or 9"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must include at least one uppercase letter")
    .regex(/[0-9]/, "Password must include at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must include at least one special character"),

  agreeTerms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the Terms of Service to continue" }),
  }),
});

export type RegisterFormData = z.infer<typeof registerSchema>;