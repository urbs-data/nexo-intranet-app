import { bookingSearchParamsCache } from '@/features/bookings/searchparams';
import { BookingTable } from './booking-tables';
import { columns } from './booking-tables/columns';
import { getBookings } from '../data/get-bookings';

type BookingListPage = {};

export default async function BookingListPage({}: BookingListPage) {
  const page = bookingSearchParamsCache.get('page');
  const pageLimit = bookingSearchParamsCache.get('perPage');
  const search = bookingSearchParamsCache.get('search');
  const sortBy = bookingSearchParamsCache.get('sortBy');
  const sortDirection = bookingSearchParamsCache.get('sortDirection');

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(sortBy && { sortBy }),
    ...(sortDirection && { sortDirection })
  };

  const data = await getBookings(filters);
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
