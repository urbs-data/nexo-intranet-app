import { customerSearchParamsCache } from '@/features/customers/searchparams';
import { CustomerTable } from './customer-tables';
import { columns } from './customer-tables/columns';
import { getCustomers } from '../data/get-customers';

type CustomerListPage = {};

export default async function CustomerListPage({}: CustomerListPage) {
  const page = customerSearchParamsCache.get('page');
  const pageLimit = customerSearchParamsCache.get('perPage');
  const search = customerSearchParamsCache.get('search');
  const isActive = customerSearchParamsCache.get('isActive');
  const countryId = customerSearchParamsCache.get('countryId');
  const sortBy = customerSearchParamsCache.get('sortBy');
  const sortDirection = customerSearchParamsCache.get('sortDirection');

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(isActive !== null && { isActive }),
    ...(countryId && { countryId }),
    ...(sortBy && { sortBy }),
    ...(sortDirection && { sortDirection })
  };

  const data = await getCustomers(filters);
  const totalCustomers = data.totalCount;
  const customers = data.customers;

  return (
    <CustomerTable
      data={customers}
      totalItems={totalCustomers}
      columns={columns}
    />
  );
}
