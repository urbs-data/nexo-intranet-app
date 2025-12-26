import {
  BotIcon,
  Calendar,
  CalendarCheck,
  CreditCard,
  Plus,
  RefreshCw,
  Trash2
} from 'lucide-react';
import { BookingStatus } from '@/db/enums';
import { formatDate } from '@/lib/format-date';
import { BookingStatusBadge } from './booking-status-badge';
import Link from 'next/link';

export type BookingDatesData = {
  id: string;
  external_id: string;
  status: BookingStatus;
  creation_date: Date | string | null;
  check_in: Date | string | null;
  autocancel_date: Date | string | null;
  cancel_limit_date: Date | string | null;
  payment_informed_date: Date | string | null;
  canceled_date: Date | string | null;
  rebooking_id: string | null;
  updated_at: Date | string | null;
};

type BookingDetailSectionProps = {
  booking: BookingDatesData;
};

export function BookingDetailSection({ booking }: BookingDetailSectionProps) {
  return (
    <div className='rounded-lg border p-4'>
      <div className='flex flex-wrap items-center gap-2'>
        <h4 className='font-semibold'>Reserva</h4>
        <Link
          href={`/dashboard/bookings/${booking.id}`}
          className='text-primary font-medium hover:underline'
        >
          {booking.external_id}
        </Link>
        <BookingStatusBadge status={booking.status} />
      </div>

      <div className='mt-4 space-y-3'>
        <div className='flex items-center gap-2'>
          <Plus className='text-muted-foreground h-4 w-4 shrink-0' />
          <span className='text-muted-foreground text-sm'>Creación</span>
          <span className='ml-auto font-medium'>
            {formatDate(booking.creation_date)}
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <CalendarCheck className='text-muted-foreground h-4 w-4 shrink-0' />
          <span className='text-muted-foreground text-sm'>Check-in</span>
          <span className='ml-auto font-medium'>
            {formatDate(booking.check_in)}
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <BotIcon className='text-error h-4 w-4 shrink-0' />
          <span className='text-muted-foreground text-sm'>Autocancelación</span>
          <span className='ml-auto font-medium'>
            {formatDate(booking.autocancel_date)}
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <Calendar className='text-warning h-4 w-4 shrink-0' />
          <span className='text-muted-foreground text-sm'>
            Límite para cancelar
          </span>
          <span className='ml-auto font-medium'>
            {formatDate(booking.cancel_limit_date)}
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <CreditCard className='text-success h-4 w-4 shrink-0' />
          <span className='text-muted-foreground text-sm'>Pago informado</span>
          <span className='ml-auto font-medium'>
            {booking.payment_informed_date
              ? formatDate(booking.payment_informed_date)
              : 'No informado'}
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <Trash2 className='text-muted-foreground h-4 w-4 shrink-0' />
          <span className='text-muted-foreground text-sm'>Cancelación</span>
          <span className='ml-auto font-medium'>
            {booking.canceled_date ? formatDate(booking.canceled_date) : '-'}
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <RefreshCw className='text-muted-foreground h-4 w-4 shrink-0' />
          <span className='text-muted-foreground text-sm'>Rebooking</span>
          <span className='ml-auto font-medium'>
            {booking.rebooking_id || '-'}
          </span>
        </div>
      </div>

      <div className='text-muted-foreground mt-4 border-t pt-3 text-xs'>
        Última actualización{' '}
        {formatDate(booking.updated_at, 'yyyy-MM-dd HH:mm:ss')}
      </div>
    </div>
  );
}
