'use client';

import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { BookingHistoryDTO } from '../../data/get-booking-history';
import { Column, ColumnDef } from '@tanstack/react-table';
import { formatDate } from '@/lib/format-date';
import { getActionLabel } from './booking-history-labels';

export const bookingHistoryColumns: ColumnDef<BookingHistoryDTO>[] = [
  {
    id: 'created_at',
    accessorKey: 'created_at',
    header: ({ column }: { column: Column<BookingHistoryDTO, unknown> }) => (
      <DataTableColumnHeader column={column} title='Fecha/Hora' />
    ),
    cell: ({ cell }) => {
      const date = cell.getValue<BookingHistoryDTO['created_at']>();
      return <div>{formatDate(date, 'yyyy-MM-dd HH:mm:ss')}</div>;
    },
    size: 150
  },
  {
    id: 'action',
    accessorKey: 'action',
    header: ({ column }: { column: Column<BookingHistoryDTO, unknown> }) => (
      <DataTableColumnHeader column={column} title='Acción' />
    ),
    cell: ({ cell }) => {
      const action = cell.getValue<BookingHistoryDTO['action']>();
      return <div className='font-medium'>{getActionLabel(action)}</div>;
    },
    size: 200
  },
  {
    id: 'data',
    accessorKey: 'data',
    header: ({ column }: { column: Column<BookingHistoryDTO, unknown> }) => (
      <DataTableColumnHeader column={column} title='Datos' />
    ),
    cell: ({ cell }) => {
      const data = cell.getValue<BookingHistoryDTO['data']>();
      if (!data) return <div className='text-muted-foreground'>-</div>;

      try {
        const parsed = JSON.parse(data);
        return (
          <div className='text-muted-foreground max-w-md text-sm'>
            {JSON.stringify(parsed)}
          </div>
        );
      } catch {
        return (
          <div className='text-muted-foreground max-w-md text-sm'>{data}</div>
        );
      }
    },
    enableSorting: false
  },
  {
    id: 'user_id',
    accessorKey: 'user_id',
    header: ({ column }: { column: Column<BookingHistoryDTO, unknown> }) => (
      <DataTableColumnHeader column={column} title='Usuario ID' />
    ),
    cell: ({ cell }) => {
      const userId = cell.getValue<BookingHistoryDTO['user_id']>();
      return <div>{userId || '-'}</div>;
    },
    size: 100
  }
];
