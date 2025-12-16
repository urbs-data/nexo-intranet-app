'use client';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { ContractWithAccounts } from '../../data/get-contracts';
import { Column, ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export const columns: ColumnDef<ContractWithAccounts>[] = [
  {
    id: 'channel_type_id',
    accessorKey: 'channel_type_id',
    header: ({ column }: { column: Column<ContractWithAccounts, unknown> }) => (
      <DataTableColumnHeader column={column} title='Canal' />
    ),
    cell: ({ cell }) => (
      <div className='font-medium'>
        {cell.getValue<ContractWithAccounts['channel_type_id']>()}
      </div>
    )
  },
  {
    id: 'account_customer_name',
    accessorKey: 'account_customer_name',
    header: ({ column }: { column: Column<ContractWithAccounts, unknown> }) => (
      <DataTableColumnHeader column={column} title='Cliente Interno' />
    ),
    cell: ({ cell }) => {
      const value =
        cell.getValue<ContractWithAccounts['account_customer_name']>();
      return <div>{value || '-'}</div>;
    }
  },
  {
    id: 'cto_marketer_name',
    accessorKey: 'cto_marketer_name',
    header: ({ column }: { column: Column<ContractWithAccounts, unknown> }) => (
      <DataTableColumnHeader column={column} title='Cliente Externo' />
    ),
    cell: ({ cell }) => (
      <div>{cell.getValue<ContractWithAccounts['cto_marketer_name']>()}</div>
    )
  },
  {
    id: 'marketer_currency',
    accessorKey: 'marketer_currency',
    header: ({ column }: { column: Column<ContractWithAccounts, unknown> }) => (
      <DataTableColumnHeader
        column={column}
        title='Moneda del Cliente Externo'
      />
    ),
    cell: ({ cell }) => (
      <div>{cell.getValue<ContractWithAccounts['marketer_currency']>()}</div>
    )
  },
  {
    id: 'account_provider_name',
    accessorKey: 'account_provider_name',
    header: ({ column }: { column: Column<ContractWithAccounts, unknown> }) => (
      <DataTableColumnHeader column={column} title='Proveedor Interno' />
    ),
    cell: ({ cell }) => {
      const value =
        cell.getValue<ContractWithAccounts['account_provider_name']>();
      return <div>{value || '-'}</div>;
    }
  },
  {
    id: 'cto_provider_name',
    accessorKey: 'cto_provider_name',
    header: ({ column }: { column: Column<ContractWithAccounts, unknown> }) => (
      <DataTableColumnHeader column={column} title='Proveedor Externo' />
    ),
    cell: ({ cell }) => (
      <div>{cell.getValue<ContractWithAccounts['cto_provider_name']>()}</div>
    )
  },
  {
    id: 'provider_currency',
    accessorKey: 'provider_currency',
    header: ({ column }: { column: Column<ContractWithAccounts, unknown> }) => (
      <DataTableColumnHeader
        column={column}
        title='Moneda del Proveedor Externo'
      />
    ),
    cell: ({ cell }) => (
      <div>{cell.getValue<ContractWithAccounts['provider_currency']>()}</div>
    )
  },
  {
    id: 'cto_producer_name',
    accessorKey: 'cto_producer_name',
    header: ({ column }: { column: Column<ContractWithAccounts, unknown> }) => (
      <DataTableColumnHeader column={column} title='Productor Externo' />
    ),
    cell: ({ cell }) => (
      <div>{cell.getValue<ContractWithAccounts['cto_producer_name']>()}</div>
    )
  },
  {
    id: 'cto_operator_name',
    accessorKey: 'cto_operator_name',
    header: ({ column }: { column: Column<ContractWithAccounts, unknown> }) => (
      <DataTableColumnHeader column={column} title='Operador Externo' />
    ),
    cell: ({ cell }) => {
      const value = cell.getValue<ContractWithAccounts['cto_operator_name']>();
      return <div>{value || '-'}</div>;
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
    maxSize: 42
  }
];
