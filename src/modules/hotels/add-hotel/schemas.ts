import { z } from "zod";

export const newCustomerSchema = z.object({
  nip: z.string().length(10, { message: "NIP musi mieć dokładnie 10 cyfr" }),
  name: z.string(),
});

export type NewCustomerValues = z.infer<typeof newCustomerSchema>;
