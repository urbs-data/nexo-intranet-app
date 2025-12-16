import {
  createSearchParamsCache,
  createSerializer,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
  parseAsBoolean
} from 'nuqs/server';

export const providerSearchParams = {
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(50),
  search: parseAsString,
  isActive: parseAsBoolean,
  countryId: parseAsInteger,
  sortBy: parseAsString,
  sortDirection: parseAsStringEnum(['asc', 'desc'])
};

export const providerSearchParamsCache =
  createSearchParamsCache(providerSearchParams);
export const serializeProviderParams = createSerializer(providerSearchParams);
