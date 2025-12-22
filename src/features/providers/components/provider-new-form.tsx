'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { resolveActionResult } from '@/lib/actions/client';
import { useRouter } from 'next/navigation';
import { SubmitHandler } from 'react-hook-form';
import { addProvider } from '../actions/add-provider';
import { useMutation } from '@tanstack/react-query';
import {
  addProviderSchema,
  AddProviderSchema
} from '../actions/add-provider-schema';
import { toast } from 'sonner';
import { useZodForm } from '@/hooks/use-zod-form';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/heading';
import { ProviderGeneralInfoSection } from './provider-general-info-section';
import { ProviderContractSection } from './provider-contract-section';
import { ProviderSupportSection } from './provider-support-section';
import { PaymentRule } from '@/db/enums';

export default function ProviderNewForm() {
  const form = useZodForm({
    schema: addProviderSchema,
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
      support_contact_info: '',
      is_active: true,
      quickbooks_id: '-'
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
    <div className='flex flex-1 flex-col space-y-4'>
      <Heading title='Nuevo Proveedor' />
      <Separator />

      <Form
        form={form}
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8'
      >
        <ProviderGeneralInfoSection control={form.control} mode='edit' />

        <Separator />

        <ProviderContractSection control={form.control} mode='edit' />

        <Separator />

        <ProviderSupportSection
          control={form.control}
          mode='edit'
          value={null}
        />

        <Button type='submit' disabled={isPending}>
          {isPending ? 'Creando Proveedor...' : 'Crear Proveedor'}
        </Button>
      </Form>
    </div>
  );
}
