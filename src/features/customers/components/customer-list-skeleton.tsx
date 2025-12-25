import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { columns } from './customer-tables/columns';

export default function CustomerListSkeleton() {
  return <DataTableSkeleton columns={columns} rowCount={8} />;
}
