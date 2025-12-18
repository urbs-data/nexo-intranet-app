'use client';

import { Button } from '@/components/ui/button';
import { bookingSearchParams } from '@/features/bookings/searchparams';
import { useDebouncedQueryState } from '@/hooks/use-debounced-query-state';
import { useQueryState } from 'nuqs';
import { useTransitionContext } from '@/hooks/use-transition-context';
import { X } from 'lucide-react';
import { Input } from '@/components/ui/input';

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target?.value || null);
    if (page !== 1) {
      setPage(1);
    }
  };

  const handleResetFilters = (): void => {
    setSearch(null);
    if (page !== 1) {
      setPage(1);
    }
  };

  const hasActiveFilters = search;

  return (
    <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
      <div className='flex flex-1 flex-wrap items-center gap-2'>
        <Input
          placeholder='Buscar por ID externo...'
          value={search || ''}
          onChange={handleSearchChange}
          className='h-9 w-full md:w-[200px]'
        />

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
