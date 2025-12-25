import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { columns } from './file-tables/columns';

export default function FileListSkeleton() {
  return <DataTableSkeleton columns={columns} rowCount={8} />;
}
