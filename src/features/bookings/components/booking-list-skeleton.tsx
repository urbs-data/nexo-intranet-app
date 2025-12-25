import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { columns } from './booking-tables/columns';

export default function BookingListSkeleton() {
  return <DataTableSkeleton columns={columns} rowCount={8} />;
}
