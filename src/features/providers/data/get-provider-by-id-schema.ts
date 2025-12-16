import * as z from 'zod';

export const getProviderByIdSchema = z.object({
  id: z.uuid()
});

export type GetProviderByIdSchema = z.infer<typeof getProviderByIdSchema>;
