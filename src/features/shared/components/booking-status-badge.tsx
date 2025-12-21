import { Badge } from '@/components/ui/badge';
import { BookingStatus } from '@/db/enums';
import { getBookingStatusLabel } from '../booking-status';

type BookingStatusBadgeProps = {
  status: BookingStatus;
  className?: string;
};

export function BookingStatusBadge({
  status,
  className = ''
}: BookingStatusBadgeProps) {
  const getStatusClassName = (status: BookingStatus): string => {
    if (status === BookingStatus.CONFIRMED) {
      return 'bg-success-subtle text-success';
    }

    if (
      status === BookingStatus.REQUEST_FAILED ||
      status === BookingStatus.CANCELLATION_FAILED ||
      status === BookingStatus.CONFIRMATION_PENDING ||
      status === BookingStatus.CANCELLATION_PENDING
    ) {
      return 'bg-error-subtle text-error';
    }

    if (
      status === BookingStatus.CONFIRMATION_DENIED ||
      status === BookingStatus.REBOOKING ||
      status === BookingStatus.MIXED
    ) {
      return 'bg-warning-subtle text-warning';
    }

    return 'bg-secondary-subtle text-secondary';
  };

  return (
    <Badge
      variant='outline'
      className={`capitalize ${getStatusClassName(status)} ${className}`}
    >
      {getBookingStatusLabel(status)}
    </Badge>
  );
}
