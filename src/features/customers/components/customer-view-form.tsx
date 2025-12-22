'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { CustomerDTO } from '../data/get-customer-by-id';
import { resolveActionResult } from '@/lib/actions/client';
import { useRouter } from 'next/navigation';
import { SubmitHandler } from 'react-hook-form';
import { updateCustomer } from '../actions/update-customer';
import { useMutation } from '@tanstack/react-query';
import {
  addCustomerSchema,
  AddCustomerSchema
} from '../actions/add-customer-schema';
import { UpdateCustomerSchema } from '../actions/update-customer-schema';
import { toast } from 'sonner';
import { useZodForm } from '@/hooks/use-zod-form';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/heading';
import { CustomerGeneralInfoSection } from './customer-general-info-section';
import { CustomerContractSection } from './customer-contract-section';
import { CustomerContractPreferencesSection } from './customer-contract-preferences-section';
import { formatDate } from '@/lib/format-date';
import { PaymentRule } from '@/db/enums';

export default function CustomerViewForm({
  initialData,
  pageTitle
}: {
  initialData: CustomerDTO;
  pageTitle: string;
}) {
  const [isEditMode, setIsEditMode] = useState(false);

  const form = useZodForm({
    schema: addCustomerSchema,
    mode: 'all',
    defaultValues: {
      name: initialData.name,
      business_name: initialData.business_name || '',
      payment_rule_id: initialData.payment_rule_id || PaymentRule.DEFAULT,
      country_id: initialData.country_id?.toString() || '',
      address: initialData.address || '',
      city: initialData.city || '',
      language: initialData.language || '',
      tax_id: initialData.tax_id || '',
      currency: initialData.currency || '',
      comments: initialData.comments || '',
      bank_account: initialData.bank_account || '',
      max_overdraft_amount: initialData.max_overdraft_amount || undefined,
      minimum_balance: initialData.minimum_balance || undefined,
      can_book_with_balance: initialData.can_book_with_balance || false,
      can_book_with_overdraft: initialData.can_book_with_overdraft || false,
      is_active: initialData.is_active ?? true,
      quickbooks_id: initialData.quickbooks_id || '-',
      created_at: formatDate(initialData.created_at),
      ended_at: formatDate(initialData.ended_at)
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
    <div className='flex flex-1 flex-col space-y-4'>
      <Heading title={pageTitle} />
      <Separator />

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
              <CustomerGeneralInfoSection
                control={form.control}
                isEditMode={isEditMode}
                mode='edit'
              />
              <Separator />
              <CustomerContractSection control={form.control} mode='edit' />
              <Separator />
              <CustomerContractPreferencesSection
                control={form.control}
                mode='edit'
              />

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
            <Form
              form={form}
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className='space-y-8'
            >
              <CustomerGeneralInfoSection
                control={form.control}
                isEditMode={isEditMode}
                onEditClick={() => setIsEditMode(true)}
                mode='view'
              />
              <Separator />
              <CustomerContractSection control={form.control} mode='view' />
              <Separator />
              <CustomerContractPreferencesSection
                control={form.control}
                mode='view'
              />
            </Form>
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
