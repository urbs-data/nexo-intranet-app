import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { columns } from './contract-tables/columns';

export default function ContractListSkeleton() {
  return <DataTableSkeleton columns={columns} rowCount={8} />;
}
