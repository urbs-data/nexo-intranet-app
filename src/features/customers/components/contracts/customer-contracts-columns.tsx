'use client';

import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { AccountContractDto } from '@/features/shared/data/get-account-contracts';
import { Column, ColumnDef } from '@tanstack/react-table';

export const customerContractsColumns: ColumnDef<AccountContractDto>[] = [
  {
    id: 'account_provider_name',
    accessorKey: 'account_provider_name',
    header: ({ column }: { column: Column<AccountContractDto, unknown> }) => (
      <DataTableColumnHeader column={column} title='Proveedor Interno' />
    ),
    cell: ({ cell }) => {
      const value =
        cell.getValue<AccountContractDto['account_provider_name']>();
      return <div>{value || '-'}</div>;
    }
  },
  {
    id: 'cto_provider_name',
    accessorKey: 'cto_provider_name',
    header: ({ column }: { column: Column<AccountContractDto, unknown> }) => (
      <DataTableColumnHeader column={column} title='Proveedor Externo' />
    ),
    cell: ({ cell }) => (
      <div>{cell.getValue<AccountContractDto['cto_provider_name']>()}</div>
    )
  },
  {
    id: 'provider_currency',
    accessorKey: 'provider_currency',
    header: ({ column }: { column: Column<AccountContractDto, unknown> }) => (
      <DataTableColumnHeader column={column} title='Moneda Proveedor' />
    ),
    cell: ({ cell }) => {
      const value = cell.getValue<AccountContractDto['provider_currency']>();
      return <div>{value || '-'}</div>;
    }
  },
  {
    id: 'cto_marketer_name',
    accessorKey: 'cto_marketer_name',
    header: ({ column }: { column: Column<AccountContractDto, unknown> }) => (
      <DataTableColumnHeader column={column} title='Cliente Externo' />
    ),
    cell: ({ cell }) => (
      <div>{cell.getValue<AccountContractDto['cto_marketer_name']>()}</div>
    )
  },
  {
    id: 'marketer_currency',
    accessorKey: 'marketer_currency',
    header: ({ column }: { column: Column<AccountContractDto, unknown> }) => (
      <DataTableColumnHeader column={column} title='Moneda Cliente' />
    ),
    cell: ({ cell }) => {
      const value = cell.getValue<AccountContractDto['marketer_currency']>();
      return <div>{value || '-'}</div>;
    }
  }
];
