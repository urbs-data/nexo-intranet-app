'use server';

import { bookingHistoryTable } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { authActionClient } from '@/lib/actions/safe-action';
import { z } from 'zod';
import { BookingHistoryAction } from '@/db/enums';

export type BookingHistoryDTO = {
  id: string;
  booking_id: string;
  user_id: number | null;
  action: BookingHistoryAction;
  data: string | null;
  created_at: Date;
};

const getBookingHistorySchema = z.object({
  booking_id: z.string().uuid()
});

export const getBookingHistory = authActionClient
  .metadata({ actionName: 'getBookingHistory' })
  .inputSchema(getBookingHistorySchema)
  .action(async ({ parsedInput, ctx }) => {
    const history = await ctx.db
      .select()
      .from(bookingHistoryTable)
      .where(eq(bookingHistoryTable.booking_id, parsedInput.booking_id))
      .orderBy(desc(bookingHistoryTable.created_at));

    return history as BookingHistoryDTO[];
  });
