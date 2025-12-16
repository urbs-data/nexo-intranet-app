'use client';

import { FormInput } from '@/components/forms/form-input';
import { FormSelect } from '@/components/forms/form-select';
import { FormTextarea } from '@/components/forms/form-textarea';
import { FormCheckbox } from '@/components/forms/form-checkbox';
import { FormRichText } from '@/components/forms/form-rich-text';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { resolveActionResult } from '@/lib/actions/client';
import { useRouter } from 'next/navigation';
import { SubmitHandler } from 'react-hook-form';
import { addProvider } from '../actions/add-provider';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  addProviderSchema,
  AddProviderSchema
} from '../actions/add-provider-schema';
import { toast } from 'sonner';
import { useZodForm } from '@/hooks/use-zod-form';
import { PAYMENT_RULES, CURRENCIES, LANGUAGES } from '../data/constants';
import { getCountries } from '@/features/shared/data/get-countries';

export default function ProviderNewForm() {
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

  const form = useZodForm({
    schema: addProviderSchema,
    mode: 'all',
    defaultValues: {
      name: '',
      business_name: '',
      payment_rule_id: 'DEFAULT',
      country_id: undefined,
      address: '',
      city: '',
      language: '',
      tax_id: '',
      currency: '',
      comments: '',
      support_contact_info: '',
      is_active: true
    }
  });
  const canSubmit = !form.formState.isSubmitting && form.formState.isValid;

  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: AddProviderSchema) => {
      return resolveActionResult(addProvider(data));
    },
    onSuccess: (data) => {
      toast.success(data.message);
      router.push('/dashboard/providers');
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const onSubmit: SubmitHandler<AddProviderSchema> = async (data) => {
    if (!canSubmit) {
      return;
    }

    mutate(data);
  };

  return (
    <Card className='mx-auto w-full'>
      <CardHeader>
        <CardTitle className='text-left text-2xl font-bold'>
          Nuevo Proveedor
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form
          form={form}
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8'
        >
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <FormInput
              control={form.control}
              name='name'
              label='Nombre Fantasía'
              placeholder='Ingrese el nombre de fantasía'
              required
            />

            <FormSelect
              control={form.control}
              name='country_id'
              label='País'
              placeholder='Seleccione un país'
              options={countries}
              isLoading={isLoadingCountries}
            />

            <FormInput
              control={form.control}
              name='address'
              label='Dirección'
              placeholder='Ingrese la dirección'
            />

            <FormInput
              control={form.control}
              name='city'
              label='Ciudad'
              placeholder='Ingrese la ciudad'
            />

            <FormSelect
              control={form.control}
              name='language'
              label='Idioma'
              placeholder='Seleccione un idioma'
              options={LANGUAGES}
            />

            <div>
              <label className='mb-2 block text-sm font-medium'>
                Fecha Finalización
              </label>
              <div className='bg-muted/50 text-muted-foreground rounded-md border px-3 py-2 text-sm'>
                Placeholder - Se implementará próximamente
              </div>
            </div>

            <FormCheckbox
              control={form.control}
              name='is_active'
              checkboxLabel='Activo'
            />
          </div>

          <div className='space-y-4'>
            <h3 className='text-lg font-semibold'>Contrato</h3>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <FormInput
                control={form.control}
                name='business_name'
                label='Business Name'
                placeholder='Ingrese el business name'
              />

              <FormInput
                control={form.control}
                name='tax_id'
                label='Nro. Identificación Fiscal'
                placeholder='Ingrese el número de identificación fiscal'
              />

              <FormSelect
                control={form.control}
                name='payment_rule_id'
                label='Forma de Pago'
                placeholder='Seleccione la forma de pago'
                options={PAYMENT_RULES}
                required
              />

              <FormSelect
                control={form.control}
                name='currency'
                label='Moneda'
                placeholder='Seleccione la moneda'
                options={CURRENCIES}
              />

              <div>
                <label className='mb-2 block text-sm font-medium'>
                  Compañía Administradora
                </label>
                <div className='bg-muted/50 text-muted-foreground rounded-md border px-3 py-2 text-sm'>
                  Placeholder - Se implementará próximamente
                </div>
              </div>
            </div>

            <FormTextarea
              control={form.control}
              name='comments'
              label='Comentarios Internos'
              placeholder='Ingrese comentarios internos'
              config={{
                maxLength: 1000,
                showCharCount: true,
                rows: 4
              }}
            />
          </div>

          <div className='space-y-4'>
            <h3 className='text-lg font-semibold'>
              Información de contacto para soporte a Clientes
            </h3>
            <FormRichText
              control={form.control}
              name='support_contact_info'
              label=''
              placeholder='Ingrese la información de contacto para soporte a clientes...'
            />
          </div>

          <Button type='submit' disabled={isPending}>
            {isPending ? 'Creando Proveedor...' : 'Crear Proveedor'}
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
}
