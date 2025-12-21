import * as z from 'zod';

export const getFilesSchema = z.object({
  page: z.number().min(1).optional(),
  limit: z.number().min(1).max(100).optional(),
  search: z.string().optional(),
  sortBy: z.string().optional(),
  sortDirection: z.enum(['asc', 'desc']).optional(),
  ids: z.array(z.string().uuid()).optional()
});

export type GetFilesSchema = z.infer<typeof getFilesSchema>;
