'use client';

import { DataTable } from '@/components/ui/table/data-table';
import { ProviderTableActions } from './table-actions';

import { useDataTable } from '@/hooks/use-data-table';

import { ColumnDef } from '@tanstack/react-table';
import { parseAsInteger, useQueryState } from 'nuqs';
import { ProviderWithCountry } from '../../data/get-providers';

interface ProviderTableParams<TValue> {
  data: ProviderWithCountry[];
  totalItems: number;
  columns: ColumnDef<ProviderWithCountry, TValue>[];
}

export function ProviderTable<TValue>({
  data,
  totalItems,
  columns
}: ProviderTableParams<TValue>) {
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
        <ProviderTableActions table={table} totalItems={totalItems} />
      }
    />
  );
}
