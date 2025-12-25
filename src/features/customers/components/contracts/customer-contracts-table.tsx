import { SimpleDataTable } from '@/components/ui/table/simple-data-table';
import { getAccountContracts } from '@/features/shared/data/get-account-contracts';
import { resolveActionResult } from '@/lib/actions/client';
import { customerContractsColumns } from './customer-contracts-columns';
import { Heading } from '@/components/ui/heading';

type CustomerContractsTableProps = {
  customerId: string;
};

export async function CustomerContractsTable({
  customerId
}: CustomerContractsTableProps) {
  const contracts = await resolveActionResult(
    getAccountContracts({ account_customer_id: customerId })
  );

  return (
    <div className='flex flex-col gap-4'>
      <Heading title='Contratos' size='md' />
      <SimpleDataTable
        columns={customerContractsColumns}
        data={contracts}
        pageSize={15}
        emptyMessage='No hay contratos para este cliente.'
      />
    </div>
  );
}
