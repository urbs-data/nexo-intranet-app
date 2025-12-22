'use client';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { BookingListDTO } from '../../data/get-bookings';
import { Column, ColumnDef } from '@tanstack/react-table';
import { BookingStatus } from '@/db/enums';
import { BookingStatusBadge } from '@/features/shared/components/booking-status-badge';
import { formatCurrency } from '@/lib/format-currency';
import Link from 'next/link';
import { formatDate } from '@/lib/format-date';

export const columns: ColumnDef<BookingListDTO>[] = [
  {
    id: 'external_id',
    accessorKey: 'external_id',
    header: ({ column }: { column: Column<BookingListDTO, unknown> }) => (
      <DataTableColumnHeader column={column} title='ID' />
    ),
    cell: ({ cell }) => (
      <div className='font-medium'>
        {cell.getValue<BookingListDTO['external_id']>()}
      </div>
    ),
    size: 100
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: ({ column }: { column: Column<BookingListDTO, unknown> }) => (
      <DataTableColumnHeader column={column} title='Estado' />
    ),
    cell: ({ cell }) => {
      const status = cell.getValue<BookingListDTO['status']>();
      return <BookingStatusBadge status={status as BookingStatus} />;
    },
    size: 100
  },

  {
    id: 'customer_name',
    accessorKey: 'customer_name',
    header: ({ column }: { column: Column<BookingListDTO, unknown> }) => (
      <DataTableColumnHeader column={column} title='Cliente' />
    ),
    cell: ({ row }) => {
      const customerName = row.original.customer_name;
      const ctoMarketerName = row.original.cto_marketer_name;
      if (customerName) {
        return <div className='font-medium'>{customerName}</div>;
      }
      return (
        <div className='text-muted-foreground'>
          {ctoMarketerName ? `(${ctoMarketerName})` : '-'}
        </div>
      );
    },
    size: 100
  },
  {
    id: 'provider_name',
    accessorKey: 'provider_name',
    header: ({ column }: { column: Column<BookingListDTO, unknown> }) => (
      <DataTableColumnHeader column={column} title='Proveedor' />
    ),
    cell: ({ row }) => {
      const providerName = row.original.provider_name;
      const ctoProviderName = row.original.cto_provider_name;
      if (providerName) {
        return <div className='font-medium'>{providerName}</div>;
      }
      return (
        <div className='text-muted-foreground'>
          {ctoProviderName ? `(${ctoProviderName})` : '-'}
        </div>
      );
    },
    size: 100
  },
  {
    id: 'file_public_id',
    accessorKey: 'file_public_id',
    header: ({ column }: { column: Column<BookingListDTO, unknown> }) => (
      <DataTableColumnHeader column={column} title='# File' />
    ),
    cell: ({ row }) => {
      const fileCreatedAt = row.original.file_created_at;
      const filePublicId = row.original.file_public_id;
      const fileId = row.original.id;
      if (!fileCreatedAt || !filePublicId) {
        return <div>-</div>;
      }
      return (
        <Link
          href={`/dashboard/files/${fileId}`}
          className='text-primary font-medium hover:underline'
        >
          {filePublicId}
        </Link>
      );
    },
    size: 100
  },
  {
    id: 'created_at',
    accessorKey: 'created_at',
    header: ({ column }: { column: Column<BookingListDTO, unknown> }) => (
      <DataTableColumnHeader column={column} title='Creación' />
    ),
    cell: ({ cell }) => {
      const date = cell.getValue<BookingListDTO['created_at']>();
      return <div>{formatDate(date)}</div>;
    },
    size: 100
  },
  {
    id: 'check_in',
    accessorKey: 'check_in',
    header: ({ column }: { column: Column<BookingListDTO, unknown> }) => (
      <DataTableColumnHeader column={column} title='Check-in' />
    ),
    cell: ({ cell }) => {
      const date = cell.getValue<BookingListDTO['check_in']>();
      return <div>{formatDate(date)}</div>;
    },
    size: 100
  },
  {
    id: 'autocancel_date',
    accessorKey: 'autocancel_date',
    header: ({ column }: { column: Column<BookingListDTO, unknown> }) => (
      <DataTableColumnHeader column={column} title='Autocancelación' />
    ),
    cell: ({ cell }) => {
      const date = cell.getValue<BookingListDTO['autocancel_date']>();
      return <div>{formatDate(date)}</div>;
    },
    size: 100
  },
  {
    id: 'holder_name',
    accessorKey: 'holder_name',
    header: ({ column }: { column: Column<BookingListDTO, unknown> }) => (
      <DataTableColumnHeader column={column} title='Pasajero' />
    ),
    cell: ({ cell }) => {
      const value = cell.getValue<BookingListDTO['holder_name']>();
      return <div>{value || '-'}</div>;
    },
    size: 100
  },
  {
    id: 'net_price',
    accessorKey: 'net_price',
    header: ({ column }: { column: Column<BookingListDTO, unknown> }) => (
      <DataTableColumnHeader column={column} title='Neto' />
    ),
    cell: ({ row }) => {
      const netPrice = row.original.net_price;
      const netPriceUsd = row.original.net_price_usd;
      const marketerCurrency = row.original.marketer_currency || 'USD';
      const hasUsdPrice = netPriceUsd && parseFloat(netPriceUsd) > 0;

      return (
        <div className='text-right'>
          <div>{formatCurrency(netPrice, marketerCurrency, 0)}</div>
          {hasUsdPrice && netPriceUsd !== netPrice && (
            <div className='text-muted-foreground text-xs'>
              {formatCurrency(netPriceUsd, 'USD', 0)}
            </div>
          )}
        </div>
      );
    },
    size: 100
  },
  {
    id: 'gross_price',
    accessorKey: 'gross_price',
    header: ({ column }: { column: Column<BookingListDTO, unknown> }) => (
      <DataTableColumnHeader column={column} title='Bruto' />
    ),
    cell: ({ row }) => {
      const grossPrice = row.original.gross_price;
      const grossPriceUsd = row.original.gross_price_usd;
      const marketerCurrency = row.original.marketer_currency || 'USD';
      const hasUsdPrice = grossPriceUsd && parseFloat(grossPriceUsd) > 0;

      return (
        <div className='text-right'>
          <div>{formatCurrency(grossPrice, marketerCurrency)}</div>
          {hasUsdPrice && grossPriceUsd !== grossPrice && (
            <div className='text-muted-foreground text-xs'>
              {formatCurrency(grossPriceUsd, 'USD')}
            </div>
          )}
        </div>
      );
    },
    size: 100
  }
];
