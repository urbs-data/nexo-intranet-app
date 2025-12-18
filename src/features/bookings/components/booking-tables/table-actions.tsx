'use client';

import { BookingListDTO } from '../../data/get-bookings';
import { Table } from '@tanstack/react-table';

interface BookingTableActionsProps {
  table: Table<BookingListDTO>;
  totalItems: number;
}

export function BookingTableActions({
  table,
  totalItems
}: BookingTableActionsProps) {
  return null;
}
