import * as z from 'zod';

export const deleteCustomerSchema = z.object({
  id: z.uuid()
});

export type DeleteCustomerSchema = z.infer<typeof deleteCustomerSchema>;
