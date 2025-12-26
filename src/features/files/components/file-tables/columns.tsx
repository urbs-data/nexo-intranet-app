'use client';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { FileListDTO } from '../../data/get-files';
import { Column, ColumnDef } from '@tanstack/react-table';
import { BookingStatus } from '@/db/enums';
import { BookingStatusBadge } from '@/features/shared/components/booking-status-badge';
import { FileStatusBadge } from '@/features/shared/components/file-status-badge';
import { CheckCircle2, BotIcon } from 'lucide-react';
import Link from 'next/link';
import { formatCurrency } from '@/lib/format-currency';
import { formatDate } from '@/lib/format-date';

export const columns: ColumnDef<FileListDTO>[] = [
  {
    id: 'file_public_id',
    accessorKey: 'file_public_id',
    header: ({ column }: { column: Column<FileListDTO, unknown> }) => (
      <DataTableColumnHeader column={column} title='File' />
    ),
    cell: ({ row }) => {
      const filePublicId = row.original.file_public_id!;
      const fileId = row.original.id;
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
    id: 'file_created_at',
    accessorKey: 'file_created_at',
    header: ({ column }: { column: Column<FileListDTO, unknown> }) => (
      <DataTableColumnHeader column={column} title='Creación' />
    ),
    cell: ({ cell }) => {
      const date = cell.getValue<FileListDTO['file_created_at']>();
      return date ? <div>{formatDate(date)}</div> : <div>-</div>;
    },
    size: 100
  },
  {
    id: 'file_status_customer',
    accessorKey: 'file_status_customer',
    header: ({ column }: { column: Column<FileListDTO, unknown> }) => (
      <DataTableColumnHeader column={column} title='Est. Cliente' />
    ),
    cell: ({ cell }) => {
      const status = cell.getValue<FileListDTO['file_status_customer']>();
      if (!status) return <div>-</div>;
      return <FileStatusBadge status={status} type='customer' />;
    },
    size: 100
  },
  {
    id: 'file_status_provider',
    accessorKey: 'file_status_provider',
    header: ({ column }: { column: Column<FileListDTO, unknown> }) => (
      <DataTableColumnHeader column={column} title='Est. Proveedor' />
    ),
    cell: ({ cell }) => {
      const status = cell.getValue<FileListDTO['file_status_provider']>();
      if (!status) return <div>-</div>;
      return <FileStatusBadge status={status} type='provider' />;
    },
    size: 100
  },
  {
    id: 'customer_name',
    accessorKey: 'customer_name',
    header: ({ column }: { column: Column<FileListDTO, unknown> }) => (
      <DataTableColumnHeader column={column} title='Cliente' />
    ),
    cell: ({ cell }) => {
      const value = cell.getValue<FileListDTO['customer_name']>();
      return <div className='font-medium'>{value || '-'}</div>;
    },
    size: 100
  },
  {
    id: 'gross_price',
    accessorKey: 'gross_price',
    header: ({ column }: { column: Column<FileListDTO, unknown> }) => (
      <DataTableColumnHeader column={column} title='P. Venta' />
    ),
    cell: ({ row }) => {
      const grossPrice = row.original.gross_price;
      const marketerCurrency = row.original.marketer_currency || 'USD';
      return (
        <div className='text-right'>
          <div>{formatCurrency(grossPrice, marketerCurrency, 0)}</div>
        </div>
      );
    },
    size: 100
  },
  {
    id: 'file_customer_deadline',
    accessorKey: 'file_customer_deadline',
    header: ({ column }: { column: Column<FileListDTO, unknown> }) => (
      <DataTableColumnHeader column={column} title='Deadline Cliente' />
    ),
    cell: ({ cell }) => {
      const date = cell.getValue<FileListDTO['file_customer_deadline']>();
      return <div>{formatDate(date)}</div>;
    },
    size: 100
  },
  {
    id: 'provider_name',
    accessorKey: 'provider_name',
    header: ({ column }: { column: Column<FileListDTO, unknown> }) => (
      <DataTableColumnHeader column={column} title='Proveedor' />
    ),
    cell: ({ cell }) => {
      const value = cell.getValue<FileListDTO['provider_name']>();
      return <div className='font-medium'>{value || '-'}</div>;
    },
    size: 100
  },
  {
    id: 'net_price',
    accessorKey: 'net_price',
    header: ({ column }: { column: Column<FileListDTO, unknown> }) => (
      <DataTableColumnHeader column={column} title='P. Compra' />
    ),
    cell: ({ row }) => {
      const netPrice = row.original.net_price;
      const providerCurrency = row.original.provider_currency || 'USD';
      return (
        <div className='text-right'>
          <div>{formatCurrency(netPrice, providerCurrency, 0)}</div>
        </div>
      );
    },
    size: 100
  },
  {
    id: 'file_provider_deadline',
    accessorKey: 'file_provider_deadline',
    header: ({ column }: { column: Column<FileListDTO, unknown> }) => (
      <DataTableColumnHeader column={column} title='Deadline Proveedor' />
    ),
    cell: ({ cell }) => {
      const date = cell.getValue<FileListDTO['file_provider_deadline']>();
      return <div>{formatDate(date)}</div>;
    },
    size: 100
  },
  {
    id: 'external_id',
    accessorKey: 'external_id',
    header: ({ column }: { column: Column<FileListDTO, unknown> }) => (
      <DataTableColumnHeader column={column} title='Reserva' />
    ),
    cell: ({ row }) => {
      const externalId = row.original.external_id;
      const paymentInformed = row.original.payment_informed_date;
      return (
        <div className='flex items-center gap-2'>
          <span className='font-medium'>{externalId}</span>
          {paymentInformed && <CheckCircle2 className='text-success h-4 w-4' />}
          {!paymentInformed && <BotIcon className='text-error h-4 w-4' />}
        </div>
      );
    },
    size: 100
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: ({ column }: { column: Column<FileListDTO, unknown> }) => (
      <DataTableColumnHeader column={column} title='Est. Reserva' />
    ),
    cell: ({ cell }) => {
      const status = cell.getValue<FileListDTO['status']>();
      return <BookingStatusBadge status={status as BookingStatus} />;
    },
    size: 100
  }
];
