import * as z from 'zod';
import { BookingStatus } from '@/db/enums';

export const getBookingsSchema = z.object({
  page: z.number().min(1).optional(),
  limit: z.number().min(1).max(100).optional(),
  search: z.string().optional(),
  sortBy: z.string().optional(),
  sortDirection: z.enum(['asc', 'desc']).optional(),
  ids: z.array(z.uuid()).optional(),
  withoutFile: z.string().optional(),
  status: z.enum(BookingStatus).optional()
});

export type GetBookingsSchema = z.infer<typeof getBookingsSchema>;
