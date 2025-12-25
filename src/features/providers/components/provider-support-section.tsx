'use client';

import { FormRichText } from '@/components/forms/form-rich-text';
import { FormRichTextReadonly } from '@/components/forms/form-rich-text-readonly';
import { Control } from 'react-hook-form';
import { Heading } from '@/components/ui/heading';

interface ProviderSupportSectionProps {
  control: Control<any>;
  mode: 'edit' | 'view';
  value?: string | null;
}

export function ProviderSupportSection({
  control,
  mode,
  value
}: ProviderSupportSectionProps) {
  const isDisabled = mode === 'view';

  return (
    <div className='space-y-4'>
      <Heading
        title='Información de contacto para soporte a Clientes'
        size='md'
      />
      {isDisabled ? (
        <FormRichTextReadonly
          value={value || ''}
          className='bg-muted/50 rounded-md border'
        />
      ) : (
        <FormRichText
          control={control}
          name='support_contact_info'
          label=''
          placeholder='Ingrese la información de contacto para soporte a clientes...'
        />
      )}
    </div>
  );
}
