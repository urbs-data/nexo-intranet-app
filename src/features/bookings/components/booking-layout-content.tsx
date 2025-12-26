import { notFound } from 'next/navigation';
import { getBookingById } from '../data/get-booking-by-id';
import { resolveActionResult } from '@/lib/actions/client';
import { BookingHeaderSection } from './booking-header-section';
import { BookingViewTabs } from './booking-view-tabs';
import { BookingProvider } from './booking-context';

type BookingLayoutContentProps = {
  bookingId: string;
  children: React.ReactNode;
};

export async function BookingLayoutContent({
  bookingId,
  children
}: BookingLayoutContentProps) {
  const booking = await resolveActionResult(getBookingById({ id: bookingId }));

  if (!booking) {
    notFound();
  }

  return (
    <>
      <BookingHeaderSection booking={booking} />

      <BookingViewTabs bookingId={bookingId} />

      <BookingProvider booking={booking}>{children}</BookingProvider>
    </>
  );
}
