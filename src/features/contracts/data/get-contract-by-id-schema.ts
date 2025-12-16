import * as z from 'zod';

export const getContractByIdSchema = z.object({
  id: z.string().uuid()
});

export type GetContractByIdSchema = z.infer<typeof getContractByIdSchema>;
