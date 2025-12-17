'use client';
import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { CustomerWithCountry } from '../../data/get-customers';
import { Column, ColumnDef } from '@tanstack/react-table';
import { CheckCircle2, XCircle } from 'lucide-react';
import { CellAction } from './cell-action';
import { format } from 'date-fns';
import { es } from 'date-fns/locale/es';

export const columns: ColumnDef<CustomerWithCountry>[] = [
  {
    id: 'id',
    accessorKey: 'id',
    header: ({ column }: { column: Column<CustomerWithCountry, unknown> }) => (
      <DataTableColumnHeader column={column} title='ID' />
    ),
    cell: ({ cell }) => {
      const value = cell.getValue<CustomerWithCountry['id']>();
      return <div className='font-mono text-xs'>{value.slice(0, 8)}...</div>;
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
      return date ? (
        <div>{format(new Date(date), 'dd/MM/yyyy', { locale: es })}</div>
      ) : (
        <div>-</div>
      );
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
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
    maxSize: 42
  }
];
