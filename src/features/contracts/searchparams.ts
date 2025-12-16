import {
  createSearchParamsCache,
  createSerializer,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum
} from 'nuqs/server';

export const contractSearchParams = {
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(50),
  search: parseAsString,
  channelType: parseAsString,
  customerInternal: parseAsString,
  customerExternal: parseAsString,
  providerInternal: parseAsString,
  providerExternal: parseAsString,
  unmapped: parseAsStringEnum(['true']),
  sortBy: parseAsString,
  sortDirection: parseAsStringEnum(['asc', 'desc'])
};

export const contractSearchParamsCache =
  createSearchParamsCache(contractSearchParams);
export const serializeContractParams = createSerializer(contractSearchParams);
