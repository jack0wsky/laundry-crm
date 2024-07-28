import { z } from "zod";

export const schema = z.object({
  name: z.string(),
  nip: z.string().min(10).max(10),
  email: z.string().email().or(z.string().optional()),
  phone: z.string().min(9).max(9).optional().or(z.string().optional()),
  street: z.string().optional(),
  buildingNumber: z.string().optional(),
  flatNumber: z.string().optional(),
  postalCode: z.string().optional(),
  city: z.string().optional(),
});

export type CustomerFormValues = z.infer<typeof schema>;
