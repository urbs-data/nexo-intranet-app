import { contractSearchParamsCache } from '@/features/contracts/searchparams';
import { ContractTable } from './contract-tables';
import { columns } from './contract-tables/columns';
import { getContracts } from '../data/get-contracts';

type ContractListPage = {};

export default async function ContractListPage({}: ContractListPage) {
  const page = contractSearchParamsCache.get('page');
  const pageLimit = contractSearchParamsCache.get('perPage');
  const channelType = contractSearchParamsCache.get('channelType');
  const customerInternal = contractSearchParamsCache.get('customerInternal');
  const customerExternal = contractSearchParamsCache.get('customerExternal');
  const providerInternal = contractSearchParamsCache.get('providerInternal');
  const providerExternal = contractSearchParamsCache.get('providerExternal');
  const unmapped = contractSearchParamsCache.get('unmapped');
  const sortBy = contractSearchParamsCache.get('sortBy');
  const sortDirection = contractSearchParamsCache.get('sortDirection');

  const filters = {
    page,
    limit: pageLimit,
    ...(channelType && { channelType }),
    ...(customerInternal && { customerInternal }),
    ...(customerExternal && { customerExternal }),
    ...(providerInternal && { providerInternal }),
    ...(providerExternal && { providerExternal }),
    ...(unmapped && { unmapped }),
    ...(sortBy && { sortBy }),
    ...(sortDirection && { sortDirection })
  };

  const data = await getContracts(filters);
  const totalContracts = data.totalCount;
  const contracts = data.contracts;

  return (
    <ContractTable
      data={contracts}
      totalItems={totalContracts}
      columns={columns}
    />
  );
}
