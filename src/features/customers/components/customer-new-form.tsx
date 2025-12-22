'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { resolveActionResult } from '@/lib/actions/client';
import { useRouter } from 'next/navigation';
import { SubmitHandler } from 'react-hook-form';
import { addCustomer } from '../actions/add-customer';
import { useMutation } from '@tanstack/react-query';
import {
  addCustomerSchema,
  AddCustomerSchema
} from '../actions/add-customer-schema';
import { toast } from 'sonner';
import { useZodForm } from '@/hooks/use-zod-form';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/heading';
import { CustomerGeneralInfoSection } from './customer-general-info-section';
import { CustomerContractSection } from './customer-contract-section';
import { CustomerContractPreferencesSection } from './customer-contract-preferences-section';
import { format } from 'date-fns/format';
import { es } from 'date-fns/locale/es';
import { PaymentRule } from '@/db/enums';

export default function CustomerNewForm() {
  const form = useZodForm({
    schema: addCustomerSchema,
    mode: 'all',
    defaultValues: {
      name: '',
      business_name: '',
      payment_rule_id: PaymentRule.DEFAULT,
      country_id: '',
      address: '',
      city: '',
      language: '',
      tax_id: '',
      currency: '',
      comments: '',
      bank_account: '',
      max_overdraft_amount: undefined as number | undefined,
      minimum_balance: undefined as number | undefined,
      can_book_with_balance: false,
      can_book_with_overdraft: false,
      is_active: true,
      quickbooks_id: '-',
      created_at: format(new Date(), 'yyyy-MM-dd', { locale: es }),
      ended_at: '-'
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
    <div className='flex flex-1 flex-col space-y-4'>
      <Heading title='Nuevo Cliente' />
      <Separator />

      <Form
        form={form}
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8'
      >
        <CustomerGeneralInfoSection control={form.control} mode='edit' />

        <Separator />

        <CustomerContractSection control={form.control} mode='edit' />

        <Separator />

        <CustomerContractPreferencesSection
          control={form.control}
          mode='edit'
        />

        <Button type='submit' disabled={isPending}>
          {isPending ? 'Creando Cliente...' : 'Crear Cliente'}
        </Button>
      </Form>
    </div>
  );
}
