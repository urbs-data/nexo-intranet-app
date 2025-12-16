'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AccountAutocomplete } from './account-autocomplete';
import { getCustomerAccounts, getProviderAccounts } from '../data/get-accounts';
import { ContractWithAccounts } from '../data/get-contracts';
import { useMutation } from '@tanstack/react-query';
import { resolveActionResult } from '@/lib/actions/client';
import { mapContract } from '../actions/map-contract';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { AccountType } from '@/db/enums';

interface ContractMapModalProps {
  contract: ContractWithAccounts;
  isOpen: boolean;
  onClose: () => void;
}

export function ContractMapModal({
  contract,
  isOpen,
  onClose
}: ContractMapModalProps) {
  const router = useRouter();

  const [customerInternalId, setCustomerInternalId] = useState<string | null>(
    () => contract.account_customer_id || null
  );
  const [providerInternalId, setProviderInternalId] = useState<string | null>(
    () => contract.account_provider_id || null
  );
  const [mapSameName, setMapSameName] = useState(false);

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setCustomerInternalId(contract.account_customer_id || null);
      setProviderInternalId(contract.account_provider_id || null);
      setMapSameName(false);
    } else {
      onClose();
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      return resolveActionResult(
        mapContract({
          contractId: contract.id,
          customerInternalId: customerInternalId || undefined,
          providerInternalId: providerInternalId || undefined,
          mapSameName: mapSameName || false
        })
      );
    },
    onSuccess: () => {
      toast.success('Contrato mapeado exitosamente');
      onClose();
      router.refresh();
    },
    onError: (error) => {
      toast.error(`Error al mapear contrato: ${error}`);
    }
  });

  const handleMap = () => {
    if (!customerInternalId && !providerInternalId) {
      toast.error('Debe seleccionar al menos un cliente o proveedor interno');
      return;
    }

    mutate();
  };

  return (
    <Dialog
      key={`${contract.id}-${isOpen}`}
      open={isOpen}
      onOpenChange={handleOpenChange}
    >
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Mapear contrato</DialogTitle>
        </DialogHeader>

        <div className='space-y-2'>
          <Label className='text-sm font-medium'>
            Cliente Externo: {contract.cto_marketer_name} (
            {contract.marketer_currency})
          </Label>
          <AccountAutocomplete
            value={customerInternalId}
            accountType={AccountType.CUSTOMER}
            onValueChange={setCustomerInternalId}
            fetchAccounts={getCustomerAccounts}
            currency={contract.marketer_currency ?? undefined}
            placeholder='Seleccionar Cliente Interno'
            className='w-full'
          />
        </div>

        <div className='space-y-2'>
          <Label className='text-sm font-medium'>
            Proveedor Externo: {contract.cto_provider_name} (
            {contract.provider_currency})
          </Label>
          <AccountAutocomplete
            value={providerInternalId}
            accountType={AccountType.PROVIDER}
            onValueChange={setProviderInternalId}
            fetchAccounts={getProviderAccounts}
            currency={contract.provider_currency ?? undefined}
            placeholder='Seleccionar Proveedor Interno'
            className='w-full'
          />
        </div>

        <div className='flex items-center space-x-2'>
          <Checkbox
            id='mapSameName'
            checked={mapSameName}
            onCheckedChange={(checked) => setMapSameName(checked === true)}
          />
          <Label
            htmlFor='mapSameName'
            className='cursor-pointer text-sm font-normal'
          >
            ¿Mapear contratos con el mismo nombre?
          </Label>
        </div>

        <div className='flex justify-end gap-2 pt-4'>
          <Button variant='outline' onClick={onClose} disabled={isPending}>
            Cancelar
          </Button>
          <Button onClick={handleMap} disabled={isPending}>
            <IconDeviceFloppy className='mr-2 h-4 w-4' />
            Mapear
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
