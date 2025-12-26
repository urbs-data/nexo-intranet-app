'use client';

import { useBooking } from './booking-context';
import { BookingInfoSection } from './booking-info-section';
import { BookingLocatorsSection } from './booking-locators-section';
import { BookingDetailSection } from '@/features/shared/components/booking-detail-section';

export function BookingInfoContent() {
  const booking = useBooking();

  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
      <BookingDetailSection booking={booking} />

      <BookingInfoSection booking={booking} />

      <BookingLocatorsSection booking={booking} />
    </div>
  );
}
