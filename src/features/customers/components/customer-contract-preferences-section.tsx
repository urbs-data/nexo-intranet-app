'use client';

import { FormInput } from '@/components/forms/form-input';
import { FormCheckbox } from '@/components/forms/form-checkbox';
import { Control } from 'react-hook-form';
import { Heading } from '@/components/ui/heading';

interface CustomerContractPreferencesSectionProps {
  control: Control<any>;
  mode: 'edit' | 'view';
}

export function CustomerContractPreferencesSection({
  control,
  mode
}: CustomerContractPreferencesSectionProps) {
  const isDisabled = mode === 'view';

  return (
    <>
      <Heading title='Preferencias del Contrato' size='md' />
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <FormInput
          control={control}
          name='bank_account'
          label='Cuenta Bancaria'
          placeholder='Ingrese la cuenta bancaria'
          required
          disabled={isDisabled}
        />

        <FormInput
          control={control}
          name='max_overdraft_amount'
          label='Monto Máximo Descubierto'
          placeholder='Ingrese el monto máximo'
          type='number'
          step='0.01'
          required
          disabled={isDisabled}
        />

        <FormInput
          control={control}
          name='minimum_balance'
          label='Límite de Saldo'
          placeholder='Ingrese el límite de saldo'
          type='number'
          step='0.01'
          required
          disabled={isDisabled}
        />
      </div>

      <div className='space-y-4'>
        <FormCheckbox
          control={control}
          name='can_book_with_balance'
          checkboxLabel='Puede tomar reservas en gastos con saldo disponible'
          disabled={isDisabled}
        />

        <FormCheckbox
          control={control}
          name='can_book_with_overdraft'
          checkboxLabel='Puede tomar reservas en gastos con descubierto disponible'
          disabled={isDisabled}
        />
      </div>
    </>
  );
}
