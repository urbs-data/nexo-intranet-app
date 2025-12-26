import { FileText, Hash, Truck, Users, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { BookingStatus } from '@/db/enums';
import { DetailSection } from '@/features/shared/components/detail-section';
import { DetailRow } from '@/features/shared/components/detail-row';
import { BookingStatusBadge } from '@/features/shared/components/booking-status-badge';

type BookingLocatorsSectionProps = {
  booking: BookingLocatorsData;
};

export type BookingLocatorsData = {
  id: string;
  file_public_id: number | null;
  external_id: string;
  provider_reference_id: string | null;
  customer_reference_id: string | null;
  customer_status: BookingStatus | null;
  rebooking_id: string | null;
};

export function BookingLocatorsSection({
  booking
}: BookingLocatorsSectionProps) {
  return (
    <DetailSection title='Localizadores'>
      <DetailRow icon={FileText} label='File'>
        {booking.file_public_id ? (
          <Link
            href={`/dashboard/files/${booking.id}`}
            className='text-primary hover:underline'
          >
            {booking.file_public_id}
          </Link>
        ) : (
          '-'
        )}
      </DetailRow>
      <DetailRow icon={Hash} label='Reserva'>
        {booking.external_id}
      </DetailRow>
      <DetailRow icon={Truck} label='Proveedor'>
        {booking.provider_reference_id || '-'}
      </DetailRow>
      <DetailRow icon={Users} label='Cliente'>
        <span className='flex items-center gap-2'>
          <span>{booking.customer_reference_id || '-'}</span>
          {booking.customer_status && (
            <BookingStatusBadge status={booking.customer_status} />
          )}
        </span>
      </DetailRow>
      <DetailRow icon={RefreshCw} label='Rebooking'>
        {booking.rebooking_id || '-'}
      </DetailRow>
    </DetailSection>
  );
}
