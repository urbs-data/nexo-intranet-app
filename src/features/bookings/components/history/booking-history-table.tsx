import { SimpleDataTable } from '@/components/ui/table/simple-data-table';
import { getBookingHistory } from '../../data/get-booking-history';
import { resolveActionResult } from '@/lib/actions/client';
import { bookingHistoryColumns } from './booking-history-columns';
import { Heading } from '@/components/ui/heading';

type BookingHistoryTableProps = {
  bookingId: string;
};

export async function BookingHistoryTable({
  bookingId
}: BookingHistoryTableProps) {
  const history = await resolveActionResult(
    getBookingHistory({ booking_id: bookingId })
  );

  return (
    <div className='flex flex-col gap-4'>
      <Heading title='Historial de Acciones' size='md' />
      <SimpleDataTable
        columns={bookingHistoryColumns}
        data={history}
        pageSize={15}
        emptyMessage='No hay historial para esta reserva.'
      />
    </div>
  );
}
