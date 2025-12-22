'use client';
import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { ProviderWithCountry } from '../../data/get-providers';
import { Column, ColumnDef } from '@tanstack/react-table';
import { CheckCircle2, XCircle } from 'lucide-react';
import { CellAction } from './cell-action';
import { formatDate } from '@/lib/format-date';

export const columns: ColumnDef<ProviderWithCountry>[] = [
  {
    id: 'id',
    accessorKey: 'id',
    header: ({ column }: { column: Column<ProviderWithCountry, unknown> }) => (
      <DataTableColumnHeader column={column} title='ID' />
    ),
    cell: ({ cell }) => {
      const value = cell.getValue<ProviderWithCountry['id']>();
      return <div className='font-mono text-xs'>{value.slice(0, 8)}...</div>;
    }
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: ({ column }: { column: Column<ProviderWithCountry, unknown> }) => (
      <DataTableColumnHeader column={column} title='Nombre' />
    ),
    cell: ({ cell }) => (
      <div className='font-medium'>
        {cell.getValue<ProviderWithCountry['name']>()}
      </div>
    )
  },
  {
    id: 'is_active',
    accessorKey: 'is_active',
    header: ({ column }: { column: Column<ProviderWithCountry, unknown> }) => (
      <DataTableColumnHeader column={column} title='Estado' />
    ),
    cell: ({ cell }) => {
      const isActive = cell.getValue<ProviderWithCountry['is_active']>();
      const Icon = isActive ? CheckCircle2 : XCircle;
      return (
        <Badge
          variant={isActive ? 'default' : 'secondary'}
          className='capitalize'
        >
          <Icon className='mr-1 h-3 w-3' />
          {isActive ? 'Activo' : 'Inactivo'}
        </Badge>
      );
    }
  },
  {
    id: 'country_name',
    accessorKey: 'country_name',
    header: ({ column }: { column: Column<ProviderWithCountry, unknown> }) => (
      <DataTableColumnHeader column={column} title='País' />
    ),
    cell: ({ cell }) => {
      const value = cell.getValue<ProviderWithCountry['country_name']>();
      return <div>{value || '-'}</div>;
    }
  },
  {
    id: 'created_at',
    accessorKey: 'created_at',
    header: ({ column }: { column: Column<ProviderWithCountry, unknown> }) => (
      <DataTableColumnHeader column={column} title='Creación' />
    ),
    cell: ({ cell }) => {
      const date = cell.getValue<ProviderWithCountry['created_at']>();
      return <div>{formatDate(date)}</div>;
    }
  },
  {
    id: 'payment_rule_id',
    accessorKey: 'payment_rule_id',
    header: ({ column }: { column: Column<ProviderWithCountry, unknown> }) => (
      <DataTableColumnHeader column={column} title='Forma de Pago' />
    ),
    cell: ({ cell }) => {
      const value = cell.getValue<ProviderWithCountry['payment_rule_id']>();
      return <div className='text-sm'>{value}</div>;
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
    maxSize: 42
  }
];
