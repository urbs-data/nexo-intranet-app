'use client';
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { BookingListDTO } from '../../data/get-bookings';
import { Column, ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { es } from 'date-fns/locale/es';
import { BookingStatus } from '@/db/enums';

const getStatusLabel = (status: BookingStatus): string => {
  const statusMap: Record<BookingStatus, string> = {
    [BookingStatus.CANCELLATION_PENDING]: 'Cancelación Pendiente',
    [BookingStatus.CANCELLATION_FAILED]: 'Cancelación Fallida',
    [BookingStatus.CANCELLED]: 'Cancelado',
    [BookingStatus.CANCELLED_WITH_CHARGES]: 'Cancelado con Cargos',
    [BookingStatus.CONFIRMATION_DENIED]: 'Confirmación Denegada',
    [BookingStatus.CONFIRMATION_PENDING]: 'Confirmación Pendiente',
    [BookingStatus.CONFIRMED]: 'Confirmada',
    [BookingStatus.MIXED]: 'Mixto',
    [BookingStatus.REBOOKING]: 'Re-reserva',
    [BookingStatus.REJECTED]: 'Rechazado',
    [BookingStatus.REQUEST_FAILED]: 'Solicitud Fallida'
  };
  return statusMap[status] || status;
};

const getStatusBadgeStyles = (
  status: string | BookingStatus
): React.CSSProperties => {
  if (status === BookingStatus.CONFIRMED) {
    return {
      backgroundColor: 'var(--success)',
      color: 'var(--success-foreground)',
      borderColor: 'transparent'
    };
  }

  if (
    status === BookingStatus.REQUEST_FAILED ||
    status === BookingStatus.CANCELLATION_FAILED ||
    status === BookingStatus.CONFIRMATION_PENDING ||
    status === BookingStatus.CANCELLATION_PENDING
  ) {
    return {
      backgroundColor: 'var(--error)',
      color: 'var(--error-foreground)',
      borderColor: 'transparent'
    };
  }

  if (
    status === BookingStatus.CONFIRMATION_DENIED ||
    status === BookingStatus.REBOOKING ||
    status === BookingStatus.MIXED
  ) {
    return {
      backgroundColor: 'var(--warning)',
      color: 'var(--warning-foreground)',
      borderColor: 'transparent'
    };
  }

  return {
    backgroundColor: 'var(--secondary)',
    color: 'var(--secondary-foreground)',
    borderColor: 'transparent'
  };
};

const formatCurrency = (value: string | null, currency: string): string => {
  if (!value) return '-';
  const numValue = parseFloat(value);
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: currency || 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(numValue);
};

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
      return (
        <Badge
          variant='outline'
          style={getStatusBadgeStyles(status)}
          className='capitalize'
        >
          {getStatusLabel(status as BookingStatus)}
        </Badge>
      );
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
      if (!fileCreatedAt) {
        return <div>-</div>;
      }
      return <div className='font-medium'>{filePublicId || '-'}</div>;
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
      return date ? (
        <div>{format(new Date(date), 'yyyy-MM-dd HH:mm', { locale: es })}</div>
      ) : (
        <div>-</div>
      );
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
      return date ? (
        <div>{format(new Date(date), 'yyyy-MM-dd', { locale: es })}</div>
      ) : (
        <div>-</div>
      );
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
      return date ? (
        <div>{format(new Date(date), 'dd/MM/yyyy', { locale: es })}</div>
      ) : (
        <div>-</div>
      );
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
          <div>{formatCurrency(netPrice, marketerCurrency)}</div>
          {hasUsdPrice && netPriceUsd !== netPrice && (
            <div className='text-muted-foreground text-xs'>
              {formatCurrency(netPriceUsd, 'USD')}
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
