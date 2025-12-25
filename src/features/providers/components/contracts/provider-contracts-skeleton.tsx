import { SimpleDataTableSkeleton } from '@/components/ui/table/simple-data-table-skeleton';
import { Heading } from '@/components/ui/heading';

export default function ProviderContractsSkeleton() {
  return (
    <div className='flex flex-col gap-4'>
      <Heading title='Contratos' size='md' />
      <SimpleDataTableSkeleton columnCount={5} rowCount={5} />
    </div>
  );
}
