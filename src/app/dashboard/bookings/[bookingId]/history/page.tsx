import { BookingHistoryTable } from '@/features/bookings/components/history/booking-history-table';

export const metadata = {
  title: 'Dashboard : Historial de Reserva'
};

type PageProps = { params: Promise<{ bookingId: string }> };

export default async function HistoryPage(props: PageProps) {
  const params = await props.params;
  return <BookingHistoryTable bookingId={params.bookingId} />;
}
