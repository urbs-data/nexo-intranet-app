'use client';

import { DataTable } from '@/components/ui/table/data-table';

import { useDataTable } from '@/hooks/use-data-table';

import { ColumnDef } from '@tanstack/react-table';
import { parseAsInteger, useQueryState } from 'nuqs';
import { ContractWithAccounts } from '../../data/get-contracts';

interface ContractTableParams<TValue> {
  data: ContractWithAccounts[];
  totalItems: number;
  columns: ColumnDef<ContractWithAccounts, TValue>[];
}

export function ContractTable<TValue>({
  data,
  totalItems,
  columns
}: ContractTableParams<TValue>) {
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
