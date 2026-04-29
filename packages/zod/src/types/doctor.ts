import z from "zod";

export const DoctorProfileSchema = z.object({
  specialization: z.string().min(2).max(100),
  licenseNumber: z.string().min(3).max(50),
  experienceYears: z.number().int().min(0).max(60),
  bio: z.string().max(1000).optional(),
  consultationFee: z.number().positive().optional(),
  availableFrom: z
    .string()
    .regex(/^\d{2}:\d{2}$/)
    .optional(), // "09:00"
  availableTo: z
    .string()
    .regex(/^\d{2}:\d{2}$/)
    .optional(),
});

export type DoctorProfileData = z.infer<typeof DoctorProfileSchema>;

export const ListDoctorsSchema = z.object({
  specialization: z.string().optional(),
  search: z.string().optional(), // searches name/bio
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
});

    export type ListDoctorsData = z.infer<typeof ListDoctorsSchema>;