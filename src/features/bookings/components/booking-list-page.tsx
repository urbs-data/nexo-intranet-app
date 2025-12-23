import { bookingSearchParamsCache } from '@/features/bookings/searchparams';
import { BookingTable } from './booking-tables';
import { columns } from './booking-tables/columns';
import { getBookings } from '../data/get-bookings';
import { BookingStatus } from '@/db/enums';
import { resolveActionResult } from '@/lib/actions/client';

type BookingListPage = {};

export default async function BookingListPage({}: BookingListPage) {
  const page = bookingSearchParamsCache.get('page');
  const pageLimit = bookingSearchParamsCache.get('perPage');
  const search = bookingSearchParamsCache.get('search');
  const sortBy = bookingSearchParamsCache.get('sortBy');
  const sortDirection = bookingSearchParamsCache.get('sortDirection');
  const withoutFile = bookingSearchParamsCache.get('withoutFile');
  const status = bookingSearchParamsCache.get('status');

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(sortBy && { sortBy }),
    ...(sortDirection && { sortDirection }),
    ...(withoutFile && { withoutFile }),
    ...(status && { status: status as BookingStatus })
  };

  const data = await resolveActionResult(getBookings(filters));
  const totalBookings = data.totalCount;
  const bookings = data.bookings;

  return (
    <BookingTable
      data={bookings}
      totalItems={totalBookings}
      columns={columns}
    />
  );
}
