import { providerSearchParamsCache } from '@/features/providers/searchparams';
import { ProviderTable } from './provider-tables';
import { columns } from './provider-tables/columns';
import { getProviders } from '../data/get-providers';

type ProviderListPage = {};

export default async function ProviderListPage({}: ProviderListPage) {
  const page = providerSearchParamsCache.get('page');
  const pageLimit = providerSearchParamsCache.get('perPage');
  const search = providerSearchParamsCache.get('search');
  const isActive = providerSearchParamsCache.get('isActive');
  const countryId = providerSearchParamsCache.get('countryId');
  const sortBy = providerSearchParamsCache.get('sortBy');
  const sortDirection = providerSearchParamsCache.get('sortDirection');

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(isActive !== null && { isActive }),
    ...(countryId && { countryId }),
    ...(sortBy && { sortBy }),
    ...(sortDirection && { sortDirection })
  };

  const data = await getProviders(filters);
  const totalProviders = data.totalCount;
  const providers = data.providers;

  return (
    <ProviderTable
      data={providers}
      totalItems={totalProviders}
      columns={columns}
    />
  );
}
