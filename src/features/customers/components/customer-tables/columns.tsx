'use client';
import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { CustomerWithCountry } from '../../data/get-customers';
import { Column, ColumnDef } from '@tanstack/react-table';
import { CheckCircle2, XCircle } from 'lucide-react';
import { formatDate } from '@/lib/format-date';
import Link from 'next/link';

export const columns: ColumnDef<CustomerWithCountry>[] = [
  {
    id: 'id',
    accessorKey: 'id',
    header: ({ column }: { column: Column<CustomerWithCountry, unknown> }) => (
      <DataTableColumnHeader column={column} title='ID' />
    ),
    cell: ({ cell }) => {
      const value = cell.getValue<CustomerWithCountry['id']>();
      return (
        <Link
          href={`/dashboard/customers/${value}`}
          className='text-primary font-medium hover:underline'
        >
          {value.slice(0, 8)}...
        </Link>
      );
    }
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: ({ column }: { column: Column<CustomerWithCountry, unknown> }) => (
      <DataTableColumnHeader column={column} title='Nombre' />
    ),
    cell: ({ cell }) => (
      <div className='font-medium'>
        {cell.getValue<CustomerWithCountry['name']>()}
      </div>
    )
  },
  {
    id: 'currency',
    accessorKey: 'currency',
    header: ({ column }: { column: Column<CustomerWithCountry, unknown> }) => (
      <DataTableColumnHeader column={column} title='Moneda' />
    ),
    cell: ({ cell }) => (
      <div className='font-medium'>
        {cell.getValue<CustomerWithCountry['currency']>()}
      </div>
    )
  },

  {
    id: 'country_name',
    accessorKey: 'country_name',
    header: ({ column }: { column: Column<CustomerWithCountry, unknown> }) => (
      <DataTableColumnHeader column={column} title='País' />
    ),
    cell: ({ cell }) => {
      const value = cell.getValue<CustomerWithCountry['country_name']>();
      return <div>{value || '-'}</div>;
    }
  },
  {
    id: 'created_at',
    accessorKey: 'created_at',
    header: ({ column }: { column: Column<CustomerWithCountry, unknown> }) => (
      <DataTableColumnHeader column={column} title='Creación' />
    ),
    cell: ({ cell }) => {
      const date = cell.getValue<CustomerWithCountry['created_at']>();
      return <div>{formatDate(date)}</div>;
    }
  },
  {
    id: 'payment_rule_id',
    accessorKey: 'payment_rule_id',
    header: ({ column }: { column: Column<CustomerWithCountry, unknown> }) => (
      <DataTableColumnHeader column={column} title='Forma de Pago' />
    ),
    cell: ({ cell }) => {
      const value = cell.getValue<CustomerWithCountry['payment_rule_id']>();
      return <div className='text-sm'>{value}</div>;
    }
  },
  {
    id: 'is_active',
    accessorKey: 'is_active',
    header: ({ column }: { column: Column<CustomerWithCountry, unknown> }) => (
      <DataTableColumnHeader column={column} title='Estado' />
    ),
    cell: ({ cell }) => {
      const isActive = cell.getValue<CustomerWithCountry['is_active']>();
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
  }
];
