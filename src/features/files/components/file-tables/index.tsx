'use client';

import { DataTable } from '@/components/ui/table/data-table';
import { FileTableActions } from './table-actions';

import { useDataTable } from '@/hooks/use-data-table';

import { ColumnDef } from '@tanstack/react-table';
import { parseAsInteger, useQueryState } from 'nuqs';
import { FileListDTO } from '../../data/get-files';

interface FileTableParams<TValue> {
  data: FileListDTO[];
  totalItems: number;
  columns: ColumnDef<FileListDTO, TValue>[];
}

export function FileTable<TValue>({
  data,
  totalItems,
  columns
}: FileTableParams<TValue>) {
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
    <DataTable
      table={table}
      totalItems={totalItems}
      showViewOptions={false}
      tableActions={<FileTableActions table={table} totalItems={totalItems} />}
    />
  );
}
