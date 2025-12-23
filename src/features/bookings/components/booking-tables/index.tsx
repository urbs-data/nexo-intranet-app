'use client';

import { DataTable } from '@/components/ui/table/data-table';

import { useDataTable } from '@/hooks/use-data-table';

import { ColumnDef } from '@tanstack/react-table';
import { parseAsInteger, useQueryState } from 'nuqs';
import { BookingListDTO } from '../../data/get-bookings';

interface BookingTableParams<TValue> {
  data: BookingListDTO[];
  totalItems: number;
  columns: ColumnDef<BookingListDTO, TValue>[];
}

export function BookingTable<TValue>({
  data,
  totalItems,
  columns
}: BookingTableParams<TValue>) {
  const [pageSize] = useQueryState('perPage', parseAsInteger.withDefault(50));

  const pageCount = Math.ceil(totalItems / pageSize);

  const { table } = useDataTable({
    data,
    columns,
    pageCount: pageCount,
    shallow: false,
    debounceMs: 500
  });

  return (
    <DataTable table={table} totalItems={totalItems} showViewOptions={false} />
  );
}
