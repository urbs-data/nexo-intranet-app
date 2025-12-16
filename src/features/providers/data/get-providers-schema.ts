import * as z from 'zod';

export const getProvidersSchema = z.object({
  page: z.number().min(1).optional(),
  limit: z.number().min(1).max(100).optional(),
  search: z.string().optional(),
  isActive: z.boolean().optional(),
  countryId: z.number().optional(),
  sortBy: z.string().optional(),
  sortDirection: z.enum(['asc', 'desc']).optional(),
  ids: z.array(z.string().uuid()).optional()
});

export type GetProvidersSchema = z.infer<typeof getProvidersSchema>;
