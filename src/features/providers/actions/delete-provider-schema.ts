import * as z from 'zod';

export const deleteProviderSchema = z.object({
  id: z.uuid()
});

export type DeleteProviderSchema = z.infer<typeof deleteProviderSchema>;
