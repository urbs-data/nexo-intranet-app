import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { columns } from './provider-tables/columns';

export default function ProviderListSkeleton() {
  return <DataTableSkeleton columns={columns} rowCount={8} />;
}
