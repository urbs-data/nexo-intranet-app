import * as z from 'zod';

export const getCustomerByIdSchema = z.object({
  id: z.uuid()
});

export type GetCustomerByIdSchema = z.infer<typeof getCustomerByIdSchema>;
