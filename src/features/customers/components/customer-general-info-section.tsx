'use client';

import { FormInput } from '@/components/forms/form-input';
import { FormSelect } from '@/components/forms/form-select';
import { FormCheckbox } from '@/components/forms/form-checkbox';
import { Control } from 'react-hook-form';
import { LANGUAGES } from '@/features/shared/data/constants';
import { Button } from '@/components/ui/button';
import { IconEdit } from '@tabler/icons-react';
import { FormCombobox } from '@/components/forms/form-combobox';
import { useQuery } from '@tanstack/react-query';
import { getCountries } from '@/features/shared/data/get-countries';

interface CustomerGeneralInfoSectionProps {
  control: Control<any>;
  isEditMode?: boolean;
  onEditClick?: () => void;
  mode: 'edit' | 'view';
}

export function CustomerGeneralInfoSection({
  control,
  isEditMode,
  onEditClick,
  mode
}: CustomerGeneralInfoSectionProps) {
  const isDisabled = mode === 'view';

  const { data: countries = [], isLoading: isLoadingCountries } = useQuery({
    queryKey: ['countries'],
    queryFn: () =>
      getCountries().then((countries) =>
        countries.map((country) => ({
          value: country.id,
          label: country.label
        }))
      )
  });

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-semibold'>Información General</h3>
        {!isEditMode && mode === 'view' && onEditClick && (
          <Button
            variant='outline'
            onClick={onEditClick}
            className='gap-2'
            size='sm'
          >
            <IconEdit className='h-4 w-4' />
            Editar
          </Button>
        )}
      </div>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <FormInput
          control={control}
          name='name'
          label='Nombre de fantasía'
          placeholder='Ingrese el nombre de fantasía'
          required
          disabled={isDisabled}
          className='md:col-span-2'
        />

        <FormCombobox
          control={control}
          name='country_id'
          label='País'
          placeholder='Seleccione un país'
          searchPlaceholder='Buscar país...'
          disabled={isDisabled}
          options={countries}
          isLoading={isLoadingCountries}
          searchMode='static'
        />

        <FormInput
          control={control}
          name='address'
          label='Dirección'
          placeholder='Ingrese la dirección'
          disabled={isDisabled}
          className='md:col-span-2'
        />

        <FormInput
          control={control}
          name='city'
          label='Ciudad'
          placeholder='Ingrese la ciudad'
          disabled={isDisabled}
          className='md:col-span-2'
        />

        <FormSelect
          control={control}
          name='language'
          label='Idioma'
          placeholder='Seleccione un idioma'
          options={LANGUAGES}
          disabled={isDisabled}
        />

        <div>
          <label className='mb-2 block text-sm font-medium'>Estado</label>
          <FormCheckbox
            control={control}
            name='is_active'
            checkboxLabel='Activa'
            disabled={isDisabled}
            className='py-1.5'
          />
        </div>

        <FormInput
          control={control}
          name='created_at'
          label='Creación'
          disabled={true}
        />

        <FormInput
          control={control}
          name='ended_at'
          label='Finalizacion'
          disabled={true}
        />
      </div>
    </div>
  );
}
