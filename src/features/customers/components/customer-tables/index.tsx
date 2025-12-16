'use client';

import { DataTable } from '@/components/ui/table/data-table';
import { CustomerTableActions } from './table-actions';

import { useDataTable } from '@/hooks/use-data-table';

import { ColumnDef } from '@tanstack/react-table';
import { parseAsInteger, useQueryState } from 'nuqs';
import { CustomerWithCountry } from '../../data/get-customers';

interface CustomerTableParams<TValue> {
  data: CustomerWithCountry[];
  totalItems: number;
  columns: ColumnDef<CustomerWithCountry, TValue>[];
}

export function CustomerTable<TValue>({
  data,
  totalItems,
  columns
}: CustomerTableParams<TValue>) {
  const [pageSize] = useQueryState('perPage', parseAsInteger.withDefault(10));

  const pageCount = Math.ceil(totalItems / pageSize);

  const { table } = useDataTable({
    data,
    columns,
    pageCount: pageCount,
    shallow: false,
    debounceMs: 500
  });

  return (
    <DataTable
      table={table}
      totalItems={totalItems}
      showViewOptions={false}
      tableActions={
        <CustomerTableActions table={table} totalItems={totalItems} />
      }
    />
  );
}
