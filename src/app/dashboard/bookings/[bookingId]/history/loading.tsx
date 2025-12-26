import { Heading } from '@/components/ui/heading';
import { SimpleDataTableSkeleton } from '@/components/ui/table/simple-data-table-skeleton';

export default function Loading() {
  return (
    <div className='flex flex-col gap-4'>
      <Heading title='Historial de Acciones' size='md' />

      <SimpleDataTableSkeleton columnCount={4} rowCount={5} />
    </div>
  );
}
