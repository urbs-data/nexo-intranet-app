import * as z from 'zod';

export const getFileByIdSchema = z.object({
  id: z.string().uuid()
});

export type GetFileByIdSchema = z.infer<typeof getFileByIdSchema>;
