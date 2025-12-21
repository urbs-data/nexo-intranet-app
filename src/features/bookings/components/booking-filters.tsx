'use client';

import { Button } from '@/components/ui/button';
import { bookingSearchParams } from '@/features/bookings/searchparams';
import { useDebouncedQueryState } from '@/hooks/use-debounced-query-state';
import { useQueryState } from 'nuqs';
import { useTransitionContext } from '@/hooks/use-transition-context';
import { X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { FilterSelect } from '@/components/ui/filter-select';
import { getBookingStatusOptions } from '@/features/shared/booking-status';

export function BookingFilters() {
  const { startTransition } = useTransitionContext();

  const [search, setSearch] = useDebouncedQueryState(
    'search',
    bookingSearchParams.search,
    {
      startTransition,
      shallow: false,
      debounceMs: 500
    }
  );

  const [page, setPage] = useQueryState(
    'page',
    bookingSearchParams.page.withOptions({
      startTransition,
      shallow: false
    })
  );

  const [withoutFile, setWithoutFile] = useQueryState(
    'withoutFile',
    bookingSearchParams.withoutFile?.withOptions({
      startTransition,
      shallow: false
    })
  );

  const [status, setStatus] = useQueryState(
    'status',
    bookingSearchParams.status?.withOptions({
      startTransition,
      shallow: false
    })
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target?.value || null);
    if (page !== 1) {
      setPage(1);
    }
  };

  const handleWithoutFileChange = (checked: boolean): void => {
    setWithoutFile(checked ? 'true' : null);
    if (page !== 1) {
      setPage(1);
    }
  };

  const handleStatusChange = (value: string | null): void => {
    setStatus(value);
    if (page !== 1) {
      setPage(1);
    }
  };

  const handleResetFilters = (): void => {
    setSearch(null);
    setWithoutFile(null);
    setStatus(null);
    if (page !== 1) {
      setPage(1);
    }
  };

  const hasActiveFilters = search || withoutFile || status;

  const statusOptions = getBookingStatusOptions();

  return (
    <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
      <div className='flex flex-1 flex-wrap items-center gap-2'>
        <Input
          placeholder='Buscar por ID...'
          value={search || ''}
          onChange={handleSearchChange}
          className='h-9 w-full md:w-[200px]'
        />

        <FilterSelect
          value={status}
          onValueChange={handleStatusChange}
          options={statusOptions}
          placeholder='Estado'
          className='h-9 w-full md:w-[200px]'
        />

        <div className='flex items-center space-x-2'>
          <Checkbox
            id='withoutFile'
            checked={withoutFile === 'true'}
            onCheckedChange={handleWithoutFileChange}
          />
          <Label
            htmlFor='withoutFile'
            className='cursor-pointer text-sm font-normal whitespace-nowrap'
          >
            Sin file
          </Label>
        </div>

        {hasActiveFilters && (
          <Button
            variant='ghost'
            onClick={handleResetFilters}
            className='h-9 px-2 lg:px-3'
          >
            <X className='mr-2 h-4 w-4' />
            Limpiar filtros
          </Button>
        )}
      </div>
    </div>
  );
}
