import {
  createSearchParamsCache,
  createSerializer,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum
} from 'nuqs/server';

export const bookingSearchParams = {
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(50),
  search: parseAsString,
  sortBy: parseAsString,
  sortDirection: parseAsStringEnum(['asc', 'desc'])
};

export const bookingSearchParamsCache =
  createSearchParamsCache(bookingSearchParams);
export const serializeBookingParams = createSerializer(bookingSearchParams);
