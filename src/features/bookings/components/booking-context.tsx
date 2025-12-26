'use client';

import { createContext, useContext } from 'react';
import { BookingDetailDTO } from '../data/get-booking-by-id';

const BookingContext = createContext<BookingDetailDTO | null>(null);

export function BookingProvider({
  booking,
  children
}: {
  booking: BookingDetailDTO;
  children: React.ReactNode;
}) {
  return (
    <BookingContext.Provider value={booking}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within BookingProvider');
  }
  return context;
}
