'use client';

import { FormInput } from '@/components/forms/form-input';
import { FormSelect } from '@/components/forms/form-select';
import { FormTextarea } from '@/components/forms/form-textarea';
import { FormCheckbox } from '@/components/forms/form-checkbox';
import { FormRichText } from '@/components/forms/form-rich-text';
import { FormRichTextReadonly } from '@/components/forms/form-rich-text-readonly';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { ProviderWithCountry } from '../data/get-provider-by-id';
import { resolveActionResult } from '@/lib/actions/client';
import { useRouter } from 'next/navigation';
import { SubmitHandler } from 'react-hook-form';
import { updateProvider } from '../actions/update-provider';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  addProviderSchema,
  AddProviderSchema
} from '../actions/add-provider-schema';
import { UpdateProviderSchema } from '../actions/update-provider-schema';
import { toast } from 'sonner';
import { useZodForm } from '@/hooks/use-zod-form';
import { useState } from 'react';
import { IconEdit } from '@tabler/icons-react';
import { PAYMENT_RULES, CURRENCIES, LANGUAGES } from '../data/constants';
import { getCountries } from '@/features/shared/data/get-countries';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { es } from 'date-fns/locale/es';

export default function ProviderViewForm({
  initialData,
  pageTitle
}: {
  initialData: ProviderWithCountry;
  pageTitle: string;
}) {
  const [isEditMode, setIsEditMode] = useState(false);

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
      name: initialData?.name || '',
      business_name: initialData?.business_name || '',
      payment_rule_id: initialData?.payment_rule_id || 'DEFAULT',
      country_id: initialData?.country_id?.toString() || undefined,
      address: initialData?.address || '',
      city: initialData?.city || '',
      language: initialData?.language || '',
      tax_id: initialData?.tax_id || '',
      currency: initialData?.currency || '',
      comments: initialData?.comments || '',
      support_contact_info: initialData?.support_contact_info || '',
      is_active: initialData?.is_active ?? true
    }
  });
  const canSubmit = !form.formState.isSubmitting && form.formState.isValid;

  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: UpdateProviderSchema) => {
      return resolveActionResult(updateProvider(data));
    },
    onSuccess: () => {
      toast.success('Proveedor actualizado exitosamente');
      setIsEditMode(false);
      router.refresh();
    },
    onError: (error) => {
      toast.error(`No se pudo actualizar el proveedor: ${error}`);
    }
  });

  const onSubmit: SubmitHandler<AddProviderSchema> = async (data) => {
    if (!canSubmit) {
      return;
    }

    if (initialData) {
      const updateData: UpdateProviderSchema = {
        id: initialData.id,
        ...data
      };
      mutate(updateData);
    }
  };

  return (
    <Card className='mx-auto w-full'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-left text-2xl font-bold'>
            {pageTitle}
          </CardTitle>
          {!isEditMode && (
            <Button
              variant='outline'
              onClick={() => setIsEditMode(true)}
              className='gap-2'
            >
              <IconEdit className='h-4 w-4' />
              Editar
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue='info' className='w-full'>
          <TabsList>
            <TabsTrigger value='info'>Información</TabsTrigger>
            <TabsTrigger value='contracts'>Contratos</TabsTrigger>
          </TabsList>

          <TabsContent value='info' className='mt-6 space-y-6'>
            {isEditMode ? (
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

                <Separator />

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

                    <div>
                      <label className='mb-2 block text-sm font-medium'>
                        ID QuickBooks
                      </label>
                      <div className='bg-muted/50 rounded-md border px-3 py-2 text-sm'>
                        {initialData.quickbooks_id || '-'}
                      </div>
                      <p className='text-muted-foreground mt-1 text-xs'>
                        Este campo no es editable
                      </p>
                    </div>

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

                <Separator />

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

                <div className='flex gap-4'>
                  <Button type='submit' disabled={isPending}>
                    {isPending
                      ? 'Actualizando Proveedor...'
                      : 'Actualizar Proveedor'}
                  </Button>
                  <Button
                    type='button'
                    variant='outline'
                    onClick={() => {
                      setIsEditMode(false);
                      form.reset();
                    }}
                    disabled={isPending}
                  >
                    Cancelar
                  </Button>
                </div>
              </Form>
            ) : (
              <div className='space-y-6'>
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                  <div>
                    <label className='mb-2 block text-sm font-medium'>
                      Nombre Fantasía
                    </label>
                    <div className='bg-muted/50 rounded-md border px-3 py-2 text-sm'>
                      {initialData.name}
                    </div>
                  </div>

                  <div>
                    <label className='mb-2 block text-sm font-medium'>
                      País
                    </label>
                    <div className='bg-muted/50 rounded-md border px-3 py-2 text-sm'>
                      {initialData.country_name || '-'}
                    </div>
                  </div>

                  <div>
                    <label className='mb-2 block text-sm font-medium'>
                      Dirección
                    </label>
                    <div className='bg-muted/50 rounded-md border px-3 py-2 text-sm'>
                      {initialData.address || '-'}
                    </div>
                  </div>

                  <div>
                    <label className='mb-2 block text-sm font-medium'>
                      Ciudad
                    </label>
                    <div className='bg-muted/50 rounded-md border px-3 py-2 text-sm'>
                      {initialData.city || '-'}
                    </div>
                  </div>

                  <div>
                    <label className='mb-2 block text-sm font-medium'>
                      Idioma
                    </label>
                    <div className='bg-muted/50 rounded-md border px-3 py-2 text-sm'>
                      {initialData.language || '-'}
                    </div>
                  </div>

                  <div>
                    <label className='mb-2 block text-sm font-medium'>
                      Estado
                    </label>
                    <div className='bg-muted/50 rounded-md border px-3 py-2 text-sm'>
                      {initialData.is_active ? 'Activo' : 'Inactivo'}
                    </div>
                  </div>

                  <div>
                    <label className='mb-2 block text-sm font-medium'>
                      Fecha Creación
                    </label>
                    <div className='bg-muted/50 rounded-md border px-3 py-2 text-sm'>
                      {initialData.created_at
                        ? format(
                            new Date(initialData.created_at),
                            'dd/MM/yyyy',
                            {
                              locale: es
                            }
                          )
                        : '-'}
                    </div>
                  </div>

                  <div>
                    <label className='mb-2 block text-sm font-medium'>
                      Fecha Finalización
                    </label>
                    <div className='bg-muted/50 text-muted-foreground rounded-md border px-3 py-2 text-sm'>
                      Placeholder - Se implementará próximamente
                    </div>
                  </div>
                </div>

                <Separator />

                <div className='space-y-4'>
                  <h3 className='text-lg font-semibold'>Contrato</h3>
                  <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                    <div>
                      <label className='mb-2 block text-sm font-medium'>
                        Business Name
                      </label>
                      <div className='bg-muted/50 rounded-md border px-3 py-2 text-sm'>
                        {initialData.business_name || '-'}
                      </div>
                    </div>

                    <div>
                      <label className='mb-2 block text-sm font-medium'>
                        Nro. Identificación Fiscal
                      </label>
                      <div className='bg-muted/50 rounded-md border px-3 py-2 text-sm'>
                        {initialData.tax_id || '-'}
                      </div>
                    </div>

                    <div>
                      <label className='mb-2 block text-sm font-medium'>
                        ID QuickBooks
                      </label>
                      <div className='bg-muted/50 rounded-md border px-3 py-2 text-sm'>
                        {initialData.quickbooks_id || '-'}
                      </div>
                    </div>

                    <div>
                      <label className='mb-2 block text-sm font-medium'>
                        Forma de Pago
                      </label>
                      <div className='bg-muted/50 rounded-md border px-3 py-2 text-sm'>
                        {initialData.payment_rule_id}
                      </div>
                    </div>

                    <div>
                      <label className='mb-2 block text-sm font-medium'>
                        Moneda
                      </label>
                      <div className='bg-muted/50 rounded-md border px-3 py-2 text-sm'>
                        {initialData.currency || '-'}
                      </div>
                    </div>

                    <div>
                      <label className='mb-2 block text-sm font-medium'>
                        Compañía Administradora
                      </label>
                      <div className='bg-muted/50 text-muted-foreground rounded-md border px-3 py-2 text-sm'>
                        Placeholder - Se implementará próximamente
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className='mb-2 block text-sm font-medium'>
                      Comentarios Internos
                    </label>
                    <div className='bg-muted/50 rounded-md border px-3 py-2 text-sm whitespace-pre-wrap'>
                      {initialData.comments || '-'}
                    </div>
                  </div>
                </div>

                <Separator />

                <div className='space-y-4'>
                  <h3 className='text-lg font-semibold'>
                    Información de contacto para soporte a Clientes
                  </h3>
                  <FormRichTextReadonly
                    value={initialData.support_contact_info}
                    className='bg-muted/50 rounded-md border'
                  />
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value='contracts' className='mt-6'>
            <div className='text-muted-foreground py-8 text-center'>
              <p>El listado de contratos se implementará próximamente.</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
