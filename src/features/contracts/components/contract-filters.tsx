'use client';

import { Button } from '@/components/ui/button';
import { contractSearchParams } from '@/features/contracts/searchparams';
import { useDebouncedQueryState } from '@/hooks/use-debounced-query-state';
import { useQueryState } from 'nuqs';
import { useTransitionContext } from '@/hooks/use-transition-context';
import { X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { AccountAutocomplete } from './account-autocomplete';
import { getCustomerAccounts, getProviderAccounts } from '../data/get-accounts';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { AccountType } from '@/db/enums';

export function ContractFilters() {
  const { startTransition } = useTransitionContext();

  const [channelType, setChannelType] = useQueryState(
    'channelType',
    contractSearchParams.channelType.withOptions({
      startTransition,
      shallow: false
    })
  );

  const [customerInternal, setCustomerInternal] = useQueryState(
    'customerInternal',
    contractSearchParams.customerInternal?.withOptions({
      startTransition,
      shallow: false
    })
  );

  const [customerExternal, setCustomerExternal] = useDebouncedQueryState(
    'customerExternal',
    contractSearchParams.customerExternal,
    {
      startTransition,
      shallow: false,
      debounceMs: 500
    }
  );

  const [providerInternal, setProviderInternal] = useQueryState(
    'providerInternal',
    contractSearchParams.providerInternal?.withOptions({
      startTransition,
      shallow: false
    })
  );

  const [providerExternal, setProviderExternal] = useDebouncedQueryState(
    'providerExternal',
    contractSearchParams.providerExternal,
    {
      startTransition,
      shallow: false,
      debounceMs: 500
    }
  );

  const [unmapped, setUnmapped] = useQueryState(
    'unmapped',
    contractSearchParams.unmapped?.withOptions({
      startTransition,
      shallow: false
    })
  );

  const [page, setPage] = useQueryState(
    'page',
    contractSearchParams.page.withOptions({
      startTransition,
      shallow: false
    })
  );

  const handleFilterChange = (): void => {
    if (page !== 1) {
      setPage(1);
    }
  };

  const handleCustomerExternalChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setCustomerExternal(e.target?.value || null);
    if (page !== 1) {
      setPage(1);
    }
  };

  const handleProviderExternalChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setProviderExternal(e.target?.value || null);
    if (page !== 1) {
      setPage(1);
    }
  };

  const handleUnmappedChange = (checked: boolean): void => {
    setUnmapped(checked ? 'true' : null);
    if (page !== 1) {
      setPage(1);
    }
  };

  const handleResetFilters = (): void => {
    setChannelType(null);
    setCustomerInternal(null);
    setCustomerExternal(null);
    setProviderInternal(null);
    setProviderExternal(null);
    setUnmapped(null);
    if (page !== 1) {
      setPage(1);
    }
  };

  const hasActiveFilters =
    channelType ||
    customerInternal ||
    customerExternal ||
    providerInternal ||
    providerExternal ||
    unmapped;

  return (
    <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
      <div className='flex flex-1 flex-wrap items-center gap-2'>
        <AccountAutocomplete
          value={customerInternal}
          onValueChange={(value) => {
            setCustomerInternal(value);
            handleFilterChange();
          }}
          fetchAccounts={getCustomerAccounts}
          accountType={AccountType.CUSTOMER}
          placeholder='Cliente Interno'
          className='h-9 w-full md:w-[200px]'
        />

        <Input
          placeholder='Cliente Externo'
          value={customerExternal || ''}
          onChange={handleCustomerExternalChange}
          className='h-9 w-full md:w-[200px]'
        />

        <AccountAutocomplete
          value={providerInternal}
          onValueChange={(value) => {
            setProviderInternal(value);
            handleFilterChange();
          }}
          fetchAccounts={getProviderAccounts}
          accountType={AccountType.PROVIDER}
          placeholder='Proveedor Interno'
          className='h-9 w-full md:w-[200px]'
        />

        <Input
          placeholder='Proveedor Externo'
          value={providerExternal || ''}
          onChange={handleProviderExternalChange}
          className='h-9 w-full md:w-[200px]'
        />

        <div className='flex items-center space-x-2'>
          <Checkbox
            id='unmapped'
            checked={unmapped === 'true'}
            onCheckedChange={handleUnmappedChange}
          />
          <Label
            htmlFor='unmapped'
            className='cursor-pointer text-sm font-normal whitespace-nowrap'
          >
            Sin mapear?
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
