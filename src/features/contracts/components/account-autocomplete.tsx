'use client';

import * as React from 'react';
import { CheckIcon, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@/hooks/use-debounce';
import { AccountOption } from '../data/get-accounts';
import { AccountType } from '@/db/enums';

interface AccountAutocompleteProps {
  value: string | null;
  onValueChange: (value: string | null) => void;
  fetchAccounts: (
    search?: string,
    currency?: string
  ) => Promise<AccountOption[]>;
  accountType: AccountType;
  placeholder?: string;
  className?: string;
  currency?: string;
}

export function AccountAutocomplete({
  value,
  onValueChange,
  fetchAccounts,
  accountType,
  currency,
  placeholder = 'Buscar cuenta...',
  className
}: AccountAutocompleteProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const debouncedSearch = useDebounce(search, 300);

  const { data: accounts = [], isLoading } = useQuery({
    queryKey: ['accounts', debouncedSearch, accountType, currency],
    queryFn: () => fetchAccounts(debouncedSearch || undefined, currency)
  });

  const selectedAccount = accounts.find((account) => account.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className={cn('w-full justify-between', className)}
        >
          {selectedAccount ? selectedAccount.label : placeholder}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[300px] p-0' align='start'>
        <Command>
          <CommandInput
            placeholder={placeholder}
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>
              {isLoading ? 'Cargando...' : 'No se encontraron cuentas.'}
            </CommandEmpty>
            <CommandGroup>
              {accounts.map((account) => (
                <CommandItem
                  key={account.id}
                  value={account.label}
                  onSelect={() => {
                    onValueChange(account.id === value ? null : account.id);
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === account.id ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {account.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
