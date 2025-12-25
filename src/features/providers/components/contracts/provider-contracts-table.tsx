import { SimpleDataTable } from '@/components/ui/table/simple-data-table';
import { getAccountContracts } from '@/features/shared/data/get-account-contracts';
import { resolveActionResult } from '@/lib/actions/client';
import { providerContractsColumns } from './provider-contracts-columns';
import { Heading } from '@/components/ui/heading';

type ProviderContractsTableProps = {
  providerId: string;
};

export async function ProviderContractsTable({
  providerId
}: ProviderContractsTableProps) {
  const contracts = await resolveActionResult(
    getAccountContracts({ account_provider_id: providerId })
  );

  return (
    <div className='flex flex-col gap-4'>
      <Heading title='Contratos' size='md' />
      <SimpleDataTable
        columns={providerContractsColumns}
        data={contracts}
        pageSize={15}
        emptyMessage='No hay contratos para este proveedor.'
      />
    </div>
  );
}
