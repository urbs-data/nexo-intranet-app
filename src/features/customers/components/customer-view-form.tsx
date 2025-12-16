'use client';

import { FormInput } from '@/components/forms/form-input';
import { FormSelect } from '@/components/forms/form-select';
import { FormTextarea } from '@/components/forms/form-textarea';
import { FormCheckbox } from '@/components/forms/form-checkbox';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { CustomerWithCountry } from '../data/get-customer-by-id';
import { resolveActionResult } from '@/lib/actions/client';
import { useRouter } from 'next/navigation';
import { SubmitHandler } from 'react-hook-form';
import { updateCustomer } from '../actions/update-customer';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  addCustomerSchema,
  AddCustomerSchema
} from '../actions/add-customer-schema';
import { UpdateCustomerSchema } from '../actions/update-customer-schema';
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

export default function CustomerViewForm({
  initialData,
  pageTitle
}: {
  initialData: CustomerWithCountry;
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
    schema: addCustomerSchema,
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
      bank_account: initialData?.bank_account || '',
      max_overdraft_amount: initialData?.max_overdraft_amount || undefined,
      minimum_balance: initialData?.minimum_balance || undefined,
      can_book_with_balance: initialData?.can_book_with_balance || false,
      can_book_with_overdraft: initialData?.can_book_with_overdraft || false,
      is_active: initialData?.is_active ?? true
    }
  });
  const canSubmit = !form.formState.isSubmitting && form.formState.isValid;

  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: UpdateCustomerSchema) => {
      return resolveActionResult(updateCustomer(data));
    },
    onSuccess: () => {
      toast.success('Cliente actualizado exitosamente');
      setIsEditMode(false);
      router.refresh();
    },
    onError: (error) => {
      toast.error(`No se pudo actualizar el cliente: ${error}`);
    }
  });

  const onSubmit: SubmitHandler<AddCustomerSchema> = async (data) => {
    if (!canSubmit) {
      return;
    }

    if (initialData) {
      const updateData: UpdateCustomerSchema = {
        id: initialData.id,
        ...data
      };
      mutate(updateData);
    }
  };

  return (
    <div className='mx-auto w-full space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>{pageTitle}</h1>
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

      <Tabs defaultValue='info' className='w-full'>
        <TabsList>
          <TabsTrigger value='info'>Información</TabsTrigger>
          <TabsTrigger value='contracts'>Contratos</TabsTrigger>
        </TabsList>

        <TabsContent value='info' className='mt-6'>
          {isEditMode ? (
            <Form
              form={form}
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-8'
            >
              <div className='space-y-6'>
                <h3 className='text-lg font-semibold'>Información General</h3>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
                  <FormInput
                    control={form.control}
                    name='name'
                    label='Nombre de fantasía'
                    placeholder='Ingrese el nombre de fantasía'
                    required
                    className='md:col-span-2'
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
                    className='md:col-span-2'
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
                      Estado
                    </label>
                    <FormCheckbox
                      control={form.control}
                      name='is_active'
                      checkboxLabel='Activa'
                    />
                  </div>

                  <div>
                    <label className='mb-2 block text-sm font-medium'>
                      Creación
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
                      Finalización
                    </label>
                    <div className='bg-muted/50 text-muted-foreground rounded-md border px-3 py-2 text-sm'>
                      Placeholder - Se implementará próximamente
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>Contrato</h3>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
                  <FormInput
                    control={form.control}
                    name='business_name'
                    label='Razón social'
                    placeholder='Ingrese la razón social'
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
                    className='md:col-span-2'
                  />

                  <FormSelect
                    control={form.control}
                    name='currency'
                    label='Moneda'
                    placeholder='Seleccione la moneda'
                    options={CURRENCIES}
                  />

                  <div className='md:col-span-2'>
                    <label className='mb-2 block text-sm font-medium'>
                      Compañía administradora
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
                  Preferencias del Contrato
                </h3>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
                  <FormInput
                    control={form.control}
                    name='bank_account'
                    label='Cuenta Bancaria'
                    placeholder='Ingrese la cuenta bancaria'
                  />

                  <FormInput
                    control={form.control}
                    name='max_overdraft_amount'
                    label='Monto Máximo Descubierto'
                    placeholder='Ingrese el monto máximo'
                    type='number'
                    step='0.01'
                  />

                  <FormInput
                    control={form.control}
                    name='minimum_balance'
                    label='Límite de Saldo'
                    placeholder='Ingrese el límite de saldo'
                    type='number'
                    step='0.01'
                  />
                </div>

                <div className='space-y-4'>
                  <FormCheckbox
                    control={form.control}
                    name='can_book_with_balance'
                    checkboxLabel='Puede tomar reservas en gastos con saldo disponible'
                  />

                  <FormCheckbox
                    control={form.control}
                    name='can_book_with_overdraft'
                    checkboxLabel='Puede tomar reservas en gastos con descubierto disponible'
                  />
                </div>
              </div>

              <div className='flex gap-4'>
                <Button type='submit' disabled={isPending}>
                  {isPending ? 'Actualizando Cliente...' : 'Actualizar Cliente'}
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
              <div className='space-y-6'>
                <h3 className='text-lg font-semibold'>Información General</h3>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
                  <div className='md:col-span-2'>
                    <label className='mb-2 block text-sm font-medium'>
                      Nombre de fantasía
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

                  <div className='md:col-span-2'>
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
                      {initialData.is_active ? 'Activa' : 'Inactiva'}
                    </div>
                  </div>

                  <div>
                    <label className='mb-2 block text-sm font-medium'>
                      Creación
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
                      Finalización
                    </label>
                    <div className='bg-muted/50 text-muted-foreground rounded-md border px-3 py-2 text-sm'>
                      Placeholder - Se implementará próximamente
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>Contrato</h3>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
                  <div>
                    <label className='mb-2 block text-sm font-medium'>
                      Razón social
                    </label>
                    <div className='bg-muted/50 rounded-md border px-3 py-2 text-sm'>
                      {initialData.business_name || '-'}
                    </div>
                  </div>

                  <div>
                    <label className='mb-2 block text-sm font-medium'>
                      Nro. de identificación fiscal
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

                  <div className='md:col-span-2'>
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

                  <div className='md:col-span-2'>
                    <label className='mb-2 block text-sm font-medium'>
                      Compañía administradora
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
                  Preferencias del Contrato
                </h3>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
                  <div>
                    <label className='mb-2 block text-sm font-medium'>
                      Cuenta Bancaria
                    </label>
                    <div className='bg-muted/50 rounded-md border px-3 py-2 text-sm'>
                      {initialData.bank_account || '-'}
                    </div>
                  </div>

                  <div>
                    <label className='mb-2 block text-sm font-medium'>
                      Monto Máximo Descubierto
                    </label>
                    <div className='bg-muted/50 rounded-md border px-3 py-2 text-sm'>
                      {initialData.max_overdraft_amount
                        ? initialData.max_overdraft_amount.toFixed(2)
                        : '-'}
                    </div>
                  </div>

                  <div>
                    <label className='mb-2 block text-sm font-medium'>
                      Límite de Saldo
                    </label>
                    <div className='bg-muted/50 rounded-md border px-3 py-2 text-sm'>
                      {initialData.minimum_balance
                        ? initialData.minimum_balance.toFixed(2)
                        : '-'}
                    </div>
                  </div>
                </div>

                <div className='space-y-2'>
                  <div className='flex items-center space-x-2'>
                    <input
                      type='checkbox'
                      checked={initialData.can_book_with_balance || false}
                      disabled
                      className='h-4 w-4'
                    />
                    <label className='text-sm'>
                      Puede tomar reservas en gastos con saldo disponible
                    </label>
                  </div>

                  <div className='flex items-center space-x-2'>
                    <input
                      type='checkbox'
                      checked={initialData.can_book_with_overdraft || false}
                      disabled
                      className='h-4 w-4'
                    />
                    <label className='text-sm'>
                      Puede tomar reservas en gastos con descubierto disponible
                    </label>
                  </div>
                </div>
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
    </div>
  );
}
