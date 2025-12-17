'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { ProviderWithCountry } from '../data/get-provider-by-id';
import { resolveActionResult } from '@/lib/actions/client';
import { useRouter } from 'next/navigation';
import { SubmitHandler } from 'react-hook-form';
import { updateProvider } from '../actions/update-provider';
import { useMutation } from '@tanstack/react-query';
import {
  addProviderSchema,
  AddProviderSchema
} from '../actions/add-provider-schema';
import { UpdateProviderSchema } from '../actions/update-provider-schema';
import { toast } from 'sonner';
import { useZodForm } from '@/hooks/use-zod-form';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/heading';
import { ProviderGeneralInfoSection } from './provider-general-info-section';
import { ProviderContractSection } from './provider-contract-section';
import { ProviderSupportSection } from './provider-support-section';

export default function ProviderViewForm({
  initialData,
  pageTitle
}: {
  initialData: ProviderWithCountry;
  pageTitle: string;
}) {
  const [isEditMode, setIsEditMode] = useState(false);

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
      is_active: initialData?.is_active ?? true,
      quickbooks_id: initialData?.quickbooks_id || '-'
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
              <ProviderGeneralInfoSection
                control={form.control}
                isEditMode={isEditMode}
                mode='edit'
              />
              <Separator />
              <ProviderContractSection control={form.control} mode='edit' />
              <Separator />
              <ProviderSupportSection
                control={form.control}
                mode='edit'
                value={null}
              />

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
            <Form
              form={form}
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className='space-y-8'
            >
              <ProviderGeneralInfoSection
                control={form.control}
                isEditMode={isEditMode}
                onEditClick={() => setIsEditMode(true)}
                mode='view'
              />
              <Separator />
              <ProviderContractSection control={form.control} mode='view' />
              <Separator />
              <ProviderSupportSection
                control={form.control}
                mode='view'
                value={initialData.support_contact_info}
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
