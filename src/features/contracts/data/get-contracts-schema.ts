import * as z from 'zod';

export const getContractsSchema = z.object({
  page: z.number().optional(),
  limit: z.number().optional(),
  search: z.string().optional(),
  channelType: z.string().optional(),
  customerInternal: z.string().uuid().optional(),
  customerExternal: z.string().optional(),
  providerInternal: z.string().uuid().optional(),
  providerExternal: z.string().optional(),
  unmapped: z.enum(['true']).optional(),
  sortBy: z.string().optional(),
  sortDirection: z.enum(['asc', 'desc']).optional(),
  ids: z.array(z.string().uuid()).optional(),
  columns: z.array(z.string()).optional()
});

export type GetContractsSchema = z.infer<typeof getContractsSchema>;
