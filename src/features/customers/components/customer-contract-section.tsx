'use client';

import { FormInput } from '@/components/forms/form-input';
import { FormSelect } from '@/components/forms/form-select';
import { FormTextarea } from '@/components/forms/form-textarea';
import { Control } from 'react-hook-form';
import { PAYMENT_RULES, CURRENCIES } from '@/features/shared/data/constants';
import { FormCombobox } from '@/components/forms/form-combobox';

interface CustomerContractSectionProps {
  control: Control<any>;
  mode: 'edit' | 'view';
}

export function CustomerContractSection({
  control,
  mode
}: CustomerContractSectionProps) {
  const isDisabled = mode === 'view';

  return (
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold'>Contrato</h3>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <FormInput
          control={control}
          name='business_name'
          label='Razón social'
          placeholder='Ingrese la razón social'
          disabled={isDisabled}
          required
        />

        <FormInput
          control={control}
          name='tax_id'
          label='Nro. de identificación fiscal'
          placeholder='Ingrese el número de identificación fiscal'
          disabled={isDisabled}
          required
        />

        <FormInput
          control={control}
          name='quickbooks_id'
          label='ID QuickBooks'
          disabled={true}
        />

        <FormCombobox
          control={control}
          name='payment_rule_id'
          label='Forma de Pago'
          placeholder='Seleccione la forma de pago'
          options={PAYMENT_RULES}
          required
          disabled={isDisabled}
        />

        <FormSelect
          control={control}
          name='currency'
          label='Moneda'
          placeholder='Seleccione la moneda'
          options={CURRENCIES}
          disabled={isDisabled}
          required
        />

        <div>
          <label className='mb-2 block text-sm font-medium'>
            Compañía administradora
          </label>
          <div className='bg-muted/50 text-muted-foreground rounded-md border px-3 py-2 text-sm'>
            TODO: Implementar
          </div>
        </div>
      </div>

      <FormTextarea
        control={control}
        name='comments'
        label='Comentarios Internos'
        placeholder='Ingrese comentarios internos'
        disabled={isDisabled}
        config={{
          maxLength: 1000,
          showCharCount: true,
          rows: 4
        }}
      />
    </div>
  );
}
