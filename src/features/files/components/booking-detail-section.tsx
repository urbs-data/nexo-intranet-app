import {
  BotIcon,
  Calendar,
  CalendarCheck,
  CalendarX,
  CheckCircle2,
  CreditCard,
  Plus,
  RefreshCw,
  Trash2
} from 'lucide-react';
import { BookingStatus } from '@/db/enums';
import { formatDate } from '@/lib/format-date';
import { BookingStatusBadge } from '@/features/shared/components/booking-status-badge';

type BookingDetailSectionProps = {
  externalId: string;
  status: BookingStatus;
  creationDate: Date | string | null;
  checkIn: Date | string | null;
  autocancelDate: Date | string | null;
  cancelLimitDate: Date | string | null;
  paymentInformedDate: Date | string | null;
  canceledDate: Date | string | null;
  rebookingId: string | null;
  updatedAt: Date | string | null;
};

export function BookingDetailSection({
  externalId,
  status,
  creationDate,
  checkIn,
  autocancelDate,
  cancelLimitDate,
  paymentInformedDate,
  canceledDate,
  rebookingId,
  updatedAt
}: BookingDetailSectionProps) {
  return (
    <div className='rounded-lg border p-4'>
      <div className='flex flex-wrap items-center gap-2'>
        <h4 className='font-semibold'>Reserva</h4>
        <span className='text-primary font-medium'>{externalId}</span>
        <BookingStatusBadge status={status} />
      </div>

      <div className='mt-4 space-y-3'>
        <div className='flex items-center gap-2'>
          <Plus className='text-muted-foreground h-4 w-4 shrink-0' />
          <span className='text-muted-foreground text-sm'>Creación</span>
          <span className='ml-auto font-medium'>
            {formatDate(creationDate)}
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <CalendarCheck className='text-muted-foreground h-4 w-4 shrink-0' />
          <span className='text-muted-foreground text-sm'>Check-in</span>
          <span className='ml-auto font-medium'>{formatDate(checkIn)}</span>
        </div>
        <div className='flex items-center gap-2'>
          <BotIcon className='text-error h-4 w-4 shrink-0' />
          <span className='text-muted-foreground text-sm'>Autocancelación</span>
          <span className='ml-auto font-medium'>
            {formatDate(autocancelDate)}
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <Calendar className='text-warning h-4 w-4 shrink-0' />
          <span className='text-muted-foreground text-sm'>
            Límite para cancelar
          </span>
          <span className='ml-auto font-medium'>
            {formatDate(cancelLimitDate)}
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <CreditCard className='text-success h-4 w-4 shrink-0' />
          <span className='text-muted-foreground text-sm'>Pago informado</span>
          {paymentInformedDate && (
            <span className='ml-auto font-medium'>
              {formatDate(paymentInformedDate)}
            </span>
          )}
          {!paymentInformedDate && (
            <span className='ml-auto font-medium'>No informado</span>
          )}
        </div>
        <div className='flex items-center gap-2'>
          <Trash2 className='text-muted-foreground h-4 w-4 shrink-0' />
          <span className='text-muted-foreground text-sm'>Cancelación</span>
          {canceledDate && (
            <span className='ml-auto font-medium'>
              {formatDate(canceledDate)}
            </span>
          )}
        </div>
        <div className='flex items-center gap-2'>
          <RefreshCw className='text-muted-foreground h-4 w-4 shrink-0' />
          <span className='text-muted-foreground text-sm'>Rebooking</span>
          {rebookingId && (
            <span className='ml-auto font-medium'>{rebookingId}</span>
          )}
        </div>
      </div>

      <div className='text-muted-foreground mt-4 border-t pt-3 text-xs'>
        Última actualización {formatDate(updatedAt, 'yyyy-MM-dd HH:mm:ss')}
      </div>
    </div>
  );
}
