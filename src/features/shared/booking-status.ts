import { BookingStatus } from '@/db/enums';

export const getBookingStatusLabel = (status: BookingStatus): string => {
  const statusMap: Record<BookingStatus, string> = {
    [BookingStatus.CANCELLATION_PENDING]: 'Cancelación Pendiente',
    [BookingStatus.CANCELLATION_FAILED]: 'Cancelación Fallida',
    [BookingStatus.CANCELLED]: 'Cancelado',
    [BookingStatus.CANCELLED_WITH_CHARGES]: 'Cancelado con Cargos',
    [BookingStatus.CONFIRMATION_DENIED]: 'Confirmación Denegada',
    [BookingStatus.CONFIRMATION_PENDING]: 'Confirmación Pendiente',
    [BookingStatus.CONFIRMED]: 'Confirmada',
    [BookingStatus.MIXED]: 'Mixto',
    [BookingStatus.REBOOKING]: 'Re-reserva',
    [BookingStatus.REJECTED]: 'Rechazado',
    [BookingStatus.REQUEST_FAILED]: 'Solicitud Fallida'
  };
  return statusMap[status] || status;
};

export const getBookingStatusOptions = () => {
  return Object.values(BookingStatus).map((status) => ({
    id: status,
    label: getBookingStatusLabel(status)
  }));
};
