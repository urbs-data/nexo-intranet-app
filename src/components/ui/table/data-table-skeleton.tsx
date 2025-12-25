'use client';

import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table';
import { getCommonPinningStyles } from '@/lib/data-table';
import { DataTablePagination } from './data-table-pagination';

interface DataTableSkeletonProps<TData = unknown>
  extends React.ComponentProps<'div'> {
  columnCount?: number;
  columns?: ColumnDef<TData>[];
  rowCount?: number;
  cellWidths?: string[];
  withViewOptions?: boolean;
  withTableActions?: boolean;
  withPagination?: boolean;
  shrinkZero?: boolean;
}

export function DataTableSkeleton<TData = unknown>({
  columnCount,
  columns,
  rowCount = 10,
  cellWidths = ['auto'],
  withViewOptions = false,
  withTableActions = false,
  withPagination = true,
  shrinkZero = false,
  className,
  ...props
}: DataTableSkeletonProps<TData>) {
  const table = useReactTable<TData>({
    data: [] as TData[],
    columns: columns ?? [],
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true
  });

  const hasColumns = !!columns;

  const effectiveColumnCount = hasColumns
    ? table.getAllColumns().length
    : (columnCount ?? 0);

  const cozyCellWidths = Array.from(
    { length: effectiveColumnCount },
    (_, index) => cellWidths[index % cellWidths.length] ?? 'auto'
  );

  const headerGroups = hasColumns ? table.getHeaderGroups() : null;

  return (
    <div
      className={cn('relative flex flex-1 flex-col space-y-4', className)}
      {...props}
    >
      {(withTableActions || withViewOptions) && (
        <div className='absolute -top-[3rem] right-0 z-10 flex items-center gap-2'>
          {withTableActions && <Skeleton className='h-8 w-24' />}
          {withViewOptions && <Skeleton className='h-8 w-24' />}
        </div>
      )}
      {hasColumns ? (
        <div className='relative flex flex-1'>
          <div className='absolute inset-0 overflow-x-auto overflow-y-auto rounded-lg border'>
            <table
              className='w-full caption-bottom text-sm'
              style={{ minWidth: 'max-content' }}
            >
              <TableHeader className='bg-background sticky top-0 z-10'>
                {headerGroups?.map((headerGroup) => (
                  <TableRow
                    key={headerGroup.id}
                    className='bg-muted hover:bg-muted border-b'
                  >
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        colSpan={header.colSpan}
                        className='bg-muted'
                        style={{
                          ...getCommonPinningStyles({ column: header.column })
                        }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {Array.from({ length: rowCount }).map((_, i) => (
                  <TableRow key={i} className='hover:bg-transparent'>
                    {headerGroups?.[0]?.headers.map((header) => (
                      <TableCell
                        key={header.id}
                        style={{
                          ...getCommonPinningStyles({ column: header.column })
                        }}
                      >
                        <Skeleton className='h-6 w-full' />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </table>
          </div>
        </div>
      ) : (
        <div className='flex-1 rounded-md border'>
          <Table>
            <TableHeader>
              {Array.from({ length: 1 }).map((_, i) => (
                <TableRow key={i} className='hover:bg-transparent'>
                  {Array.from({ length: effectiveColumnCount }).map((_, j) => (
                    <TableHead
                      key={j}
                      style={{
                        width: cozyCellWidths[j],
                        minWidth: shrinkZero ? cozyCellWidths[j] : 'auto'
                      }}
                    >
                      <Skeleton className='h-6 w-full' />
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {Array.from({ length: rowCount }).map((_, i) => (
                <TableRow key={i} className='hover:bg-transparent'>
                  {Array.from({ length: effectiveColumnCount }).map((_, j) => (
                    <TableCell
                      key={j}
                      style={{
                        width: cozyCellWidths[j],
                        minWidth: shrinkZero ? cozyCellWidths[j] : 'auto'
                      }}
                    >
                      <Skeleton className='h-6 w-full' />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      {withPagination ? (
        hasColumns && headerGroups ? (
          <div className='flex flex-col gap-2.5'>
            <DataTablePagination table={table} totalItems={0} />
          </div>
        ) : (
          <div className='flex w-full items-center justify-between gap-4 overflow-auto p-1 sm:gap-8'>
            <Skeleton className='h-7 w-40 shrink-0' />
            <div className='flex items-center gap-4 sm:gap-6 lg:gap-8'>
              <div className='flex items-center gap-2'>
                <Skeleton className='h-7 w-24' />
                <Skeleton className='h-7 w-[4.5rem]' />
              </div>
              <div className='flex items-center justify-center text-sm font-medium'>
                <Skeleton className='h-7 w-20' />
              </div>
              <div className='flex items-center gap-2'>
                <Skeleton className='hidden size-7 lg:block' />
                <Skeleton className='size-7' />
                <Skeleton className='size-7' />
                <Skeleton className='hidden size-7 lg:block' />
              </div>
            </div>
          </div>
        )
      ) : null}
    </div>
  );
}
