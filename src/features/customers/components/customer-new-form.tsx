'use client';

import { FormInput } from '@/components/forms/form-input';
import { FormSelect } from '@/components/forms/form-select';
import { FormTextarea } from '@/components/forms/form-textarea';
import { FormCheckbox } from '@/components/forms/form-checkbox';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { resolveActionResult } from '@/lib/actions/client';
import { useRouter } from 'next/navigation';
import { SubmitHandler } from 'react-hook-form';
import { addCustomer } from '../actions/add-customer';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  addCustomerSchema,
  AddCustomerSchema
} from '../actions/add-customer-schema';
import { toast } from 'sonner';
import { useZodForm } from '@/hooks/use-zod-form';
import { PAYMENT_RULES, CURRENCIES, LANGUAGES } from '../data/constants';
import { getCountries } from '@/features/shared/data/get-countries';
import { format } from 'date-fns';
import { es } from 'date-fns/locale/es';

export default function CustomerNewForm() {
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
      bank_account: '',
      max_overdraft_amount: undefined,
      minimum_balance: undefined,
      can_book_with_balance: false,
      can_book_with_overdraft: false,
      is_active: true
    }
  });
  const canSubmit = !form.formState.isSubmitting && form.formState.isValid;

  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: AddCustomerSchema) => {
      return resolveActionResult(addCustomer(data));
    },
    onSuccess: (data) => {
      toast.success(data.message);
      router.push('/dashboard/customers');
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const onSubmit: SubmitHandler<AddCustomerSchema> = async (data) => {
    if (!canSubmit) {
      return;
    }

    mutate(data);
  };

  return (
    <div className='mx-auto w-full space-y-6'>
      <h1 className='text-2xl font-bold'>Nuevo Cliente</h1>

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
              <label className='mb-2 block text-sm font-medium'>Estado</label>
              <FormCheckbox
                control={form.control}
                name='is_active'
                checkboxLabel='Activa'
              />
            </div>

            <div>
              <label className='mb-2 block text-sm font-medium'>Creación</label>
              <div className='bg-muted/50 rounded-md border px-3 py-2 text-sm'>
                {format(new Date(), 'dd/MM/yyyy', { locale: es })}
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
              label='Nro. de identificación fiscal'
              placeholder='Ingrese el número de identificación fiscal'
            />

            <div>
              <label className='mb-2 block text-sm font-medium'>
                ID QuickBooks
              </label>
              <div className='bg-muted/50 text-muted-foreground rounded-md border px-3 py-2 text-sm'>
                -
              </div>
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

        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>Preferencias del Contrato</h3>
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

        <Button type='submit' disabled={isPending}>
          {isPending ? 'Creando Cliente...' : 'Crear Cliente'}
        </Button>
      </Form>
    </div>
  );
}
