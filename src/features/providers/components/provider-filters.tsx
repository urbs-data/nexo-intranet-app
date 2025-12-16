'use client';

import { Button } from '@/components/ui/button';
import { providerSearchParams } from '@/features/providers/searchparams';
import { useDebouncedQueryState } from '@/hooks/use-debounced-query-state';
import { useQueryState } from 'nuqs';
import { useTransitionContext } from '@/hooks/use-transition-context';
import { X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { getCountries } from '@/features/shared/data/get-countries';
import { useQuery } from '@tanstack/react-query';
import { FilterSelect } from '@/components/ui/filter-select';

export function ProviderFilters() {
  const { startTransition } = useTransitionContext();

  const { data: countries = [], isLoading: isLoadingCountries } = useQuery({
    queryKey: ['countries'],
    queryFn: () => getCountries()
  });

  const [search, setSearch] = useDebouncedQueryState(
    'search',
    providerSearchParams.search,
    {
      startTransition,
      shallow: false,
      debounceMs: 500
    }
  );

  const [isActive, setIsActive] = useQueryState(
    'isActive',
    providerSearchParams.isActive?.withOptions({
      startTransition,
      shallow: false
    })
  );

  const [countryId, setCountryId] = useQueryState(
    'countryId',
    providerSearchParams.countryId?.withOptions({
      startTransition,
      shallow: false
    })
  );

  const [page, setPage] = useQueryState(
    'page',
    providerSearchParams.page.withOptions({
      startTransition,
      shallow: false
    })
  );

  const handleFilterChange = (): void => {
    if (page !== 1) {
      setPage(1);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target?.value || null);
    if (page !== 1) {
      setPage(1);
    }
  };

  const handleIsActiveChange = (checked: boolean): void => {
    setIsActive(checked ? true : null);
    if (page !== 1) {
      setPage(1);
    }
  };

  const handleCountryChange = (value: string | null): void => {
    setCountryId(value ? parseInt(value) : null);
    handleFilterChange();
  };

  const handleResetFilters = (): void => {
    setSearch(null);
    setIsActive(null);
    setCountryId(null);
    if (page !== 1) {
      setPage(1);
    }
  };

  const hasActiveFilters = search || isActive !== null || countryId;

  return (
    <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
      <div className='flex flex-1 flex-wrap items-center gap-2'>
        <Input
          placeholder='Buscar por nombre...'
          value={search || ''}
          onChange={handleSearchChange}
          className='h-9 w-full md:w-[200px]'
        />

        <FilterSelect
          value={countryId?.toString() || null}
          onValueChange={handleCountryChange}
          options={countries}
          placeholder='País'
          isLoading={isLoadingCountries}
          className='h-9 w-40 lg:w-48'
        />

        <div className='flex items-center space-x-2'>
          <Checkbox
            id='isActive'
            checked={isActive === true}
            onCheckedChange={handleIsActiveChange}
          />
          <Label
            htmlFor='isActive'
            className='cursor-pointer text-sm font-normal whitespace-nowrap'
          >
            Solo activos
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
