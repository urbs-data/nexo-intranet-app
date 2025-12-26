import { Building2 } from 'lucide-react';
import { BookingStatus } from '@/db/enums';
import { formatDate } from '@/lib/format-date';
import { BookingStatusBadge } from '@/features/shared/components/booking-status-badge';

type BookingHeaderSectionProps = {
  productName: string | null;
  status: BookingStatus;
  creationDate: Date | string | null;
  checkIn: Date | string | null;
  checkOut: Date | string | null;
};

export function BookingHeaderSection({
  productName,
  status,
  creationDate,
  checkIn,
  checkOut
}: BookingHeaderSectionProps) {
  return (
    <div className='rounded-lg border p-4'>
      <div className='flex items-start gap-3'>
        <Building2 className='text-muted-foreground mt-1 h-6 w-6 shrink-0' />
        <div className='min-w-0 flex-1'>
          <h3 className='truncate text-lg font-semibold'>
            {productName || 'Sin nombre de hotel'}
          </h3>
          <div className='mt-1'>
            <BookingStatusBadge status={status} />
          </div>
          <div className='text-muted-foreground mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm'>
            <span>Creación: {formatDate(creationDate)}</span>
            <span>Check-in: {formatDate(checkIn)}</span>
            <span>Check-out: {formatDate(checkOut)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
