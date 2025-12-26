import { Building2 } from 'lucide-react';
import { BookingStatus } from '@/db/enums';
import { formatDate } from '@/lib/format-date';
import { BookingStatusBadge } from '@/features/shared/components/booking-status-badge';

type BookingDetailDTO = {
  product_name: string | null;
  status: BookingStatus;
  creation_date: Date | string | null;
  check_in: Date | string | null;
  check_out: Date | string | null;
};

type BookingHeaderSectionProps = {
  booking: BookingDetailDTO;
};

export function BookingHeaderSection({ booking }: BookingHeaderSectionProps) {
  return (
    <div className='rounded-lg border p-4'>
      <div className='flex items-start gap-3'>
        <Building2 className='text-muted-foreground mt-1 h-6 w-6 shrink-0' />
        <div className='min-w-0 flex-1'>
          <h3 className='truncate text-lg font-semibold'>
            {booking.product_name || 'Sin nombre de hotel'}
          </h3>
          <div className='mt-1'>
            <BookingStatusBadge status={booking.status} />
          </div>
          <div className='text-muted-foreground mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm'>
            <span>Creación: {formatDate(booking.creation_date)}</span>
            <span>Check-in: {formatDate(booking.check_in)}</span>
            <span>Check-out: {formatDate(booking.check_out)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
