'use client';

import { Button } from '@/components/ui/button';
import { fileSearchParams } from '@/features/files/searchparams';
import { useDebouncedQueryState } from '@/hooks/use-debounced-query-state';
import { useQueryState } from 'nuqs';
import { useTransitionContext } from '@/hooks/use-transition-context';
import { X } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function FileFilters() {
  const { startTransition } = useTransitionContext();

  const [search, setSearch] = useDebouncedQueryState(
    'search',
    fileSearchParams.search,
    {
      startTransition,
      shallow: false,
      debounceMs: 500
    }
  );

  const [page, setPage] = useQueryState(
    'page',
    fileSearchParams.page.withOptions({
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

  const clearFilters = (): void => {
    setSearch(null);
    if (page !== 1) {
      setPage(1);
    }
  };

  const hasFilters = search !== null;

  return (
    <div className='flex flex-wrap items-center gap-2'>
      <div className='min-w-[200px] flex-1'>
        <Input
          placeholder='Buscar por ID de reserva...'
          value={search || ''}
          onChange={handleSearchChange}
          className='max-w-sm'
        />
      </div>

      {hasFilters && (
        <Button
          variant='ghost'
          onClick={clearFilters}
          className='h-8 px-2 lg:px-3'
        >
          Limpiar
          <X className='ml-2 h-4 w-4' />
        </Button>
      )}
    </div>
  );
}
