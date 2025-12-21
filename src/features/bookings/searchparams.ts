import {
  createSearchParamsCache,
  createSerializer,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum
} from 'nuqs/server';
import { BookingStatus } from '@/db/enums';

export const bookingSearchParams = {
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(50),
  search: parseAsString,
  sortBy: parseAsString,
  sortDirection: parseAsStringEnum(['asc', 'desc']),
  withoutFile: parseAsString,
  status: parseAsStringEnum(
    Object.values(BookingStatus) as [string, ...string[]]
  )
};

export const bookingSearchParamsCache =
  createSearchParamsCache(bookingSearchParams);
export const serializeBookingParams = createSerializer(bookingSearchParams);
