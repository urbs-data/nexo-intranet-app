import {
  createSearchParamsCache,
  createSerializer,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
  parseAsBoolean
} from 'nuqs/server';

export const customerSearchParams = {
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(50),
  search: parseAsString,
  isActive: parseAsBoolean,
  countryId: parseAsInteger,
  sortBy: parseAsString,
  sortDirection: parseAsStringEnum(['asc', 'desc'])
};

export const customerSearchParamsCache =
  createSearchParamsCache(customerSearchParams);
export const serializeCustomerParams = createSerializer(customerSearchParams);
