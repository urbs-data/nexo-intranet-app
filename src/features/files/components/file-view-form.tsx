'use client';

import { FileDTO } from '../data/get-file-by-id';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/heading';
import { differenceInDays } from 'date-fns';
import { AccountHeader } from './account-header';
import { OperationTransaction } from './operation-transaction';
import { AccountDetailSection } from './account-detail-section';
import { BookingDetailSection } from './booking-detail-section';
import { formatCurrency } from '@/lib/format-currency';

const calculateDaysRemaining = (
  deadline: Date | string | null
): number | null => {
  if (!deadline) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const deadlineDate = new Date(deadline);
  deadlineDate.setHours(0, 0, 0, 0);
  return differenceInDays(deadlineDate, today);
};

export default function FileViewForm({
  initialData
}: {
  initialData: FileDTO;
}) {
  const customerDaysDiff = calculateDaysRemaining(
    initialData.file_customer_deadline
  );
  const providerDaysDiff = calculateDaysRemaining(
    initialData.file_provider_deadline
  );

  const daysDifference =
    customerDaysDiff !== null && providerDaysDiff !== null
      ? Math.abs(providerDaysDiff - customerDaysDiff)
      : null;

  const grossPrice = parseFloat(initialData.gross_price_usd || '0');
  const netPrice = parseFloat(initialData.net_price_usd || '0');
  const profit = grossPrice - netPrice;
  const profitPercentage = grossPrice > 0 ? (profit / grossPrice) * 100 : 0;

  return (
    <div className='flex flex-1 flex-col space-y-4'>
      <Heading title={`File ${initialData.file_public_id || ''}`} />
      <Separator />

      <div className='grid gap-4 md:grid-cols-2'>
        <AccountHeader
          label='Cliente'
          name={initialData.customer_name}
          status={initialData.file_status_customer}
          statusType='customer'
          createdAt={initialData.file_created_at}
          deadline={initialData.file_customer_deadline}
          daysRemaining={customerDaysDiff}
        />

        <AccountHeader
          label='Proveedor'
          name={initialData.provider_name}
          status={initialData.file_status_provider}
          statusType='provider'
          deadline={initialData.file_provider_deadline}
          daysRemaining={providerDaysDiff}
        />
      </div>

      <Tabs defaultValue='info' className='w-full'>
        <TabsList>
          <TabsTrigger value='info'>Información</TabsTrigger>
          <TabsTrigger value='history'>Historia</TabsTrigger>
        </TabsList>

        <TabsContent value='info'>
          <div className='flex flex-col gap-4 lg:grid lg:grid-cols-3 lg:gap-6'>
            <div className='space-y-4 lg:col-span-2 lg:space-y-6'>
              <div className='rounded-lg border p-4 md:p-6'>
                <h3 className='mb-4 font-semibold'>Operación</h3>

                <div className='border-b'>
                  <OperationTransaction
                    type='customer'
                    name={initialData.customer_name}
                    currency={initialData.marketer_currency}
                    deadline={initialData.file_customer_deadline}
                    daysRemaining={customerDaysDiff}
                    price={initialData.gross_price}
                    priceUsd={initialData.gross_price_usd}
                  />
                </div>

                <OperationTransaction
                  type='provider'
                  name={initialData.provider_name}
                  currency={initialData.provider_currency}
                  deadline={initialData.file_provider_deadline}
                  daysRemaining={providerDaysDiff}
                  price={initialData.net_price}
                  priceUsd={initialData.net_price_usd}
                />

                <div className='flex flex-wrap items-center justify-end gap-4 border-t pt-4 md:gap-8'>
                  <div className='text-center'>
                    <div className='text-xl font-medium md:text-2xl'>
                      {daysDifference ?? '-'}
                    </div>
                    <div className='text-muted-foreground text-sm'>días</div>
                  </div>
                  <div className='text-center'>
                    <div className='text-xl font-medium md:text-2xl'>-</div>
                    <div className='text-muted-foreground text-sm'>días</div>
                  </div>
                  <div className='text-right'>
                    <div className='text-success text-xl font-semibold md:text-2xl'>
                      {formatCurrency(profit, 'USD')}
                    </div>
                    <div className='text-muted-foreground text-sm'>
                      {profitPercentage.toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>

              <div className='grid gap-4 sm:grid-cols-2'>
                <AccountDetailSection
                  title='Cliente'
                  deadline={initialData.file_customer_deadline}
                  daysRemaining={customerDaysDiff}
                  deadlineLabel='Deadline de cobro'
                  paymentStatus='Pago recibido'
                  paymentRule={initialData.customer_payment_rule_id}
                />

                <AccountDetailSection
                  title='Proveedor'
                  deadline={initialData.file_provider_deadline}
                  daysRemaining={providerDaysDiff}
                  deadlineLabel='Deadline de pago'
                  paymentStatus='Pago realizado'
                  paymentRule={initialData.provider_payment_rule_id}
                />
              </div>
            </div>

            <div className='lg:col-span-1'>
              <BookingDetailSection
                externalId={initialData.external_id}
                status={initialData.status}
                creationDate={initialData.creation_date}
                checkIn={initialData.check_in}
                autocancelDate={initialData.autocancel_date}
                cancelLimitDate={initialData.cancel_limit_date}
                paymentInformedDate={initialData.payment_informed_date}
                canceledDate={initialData.canceled_date}
                rebookingId={initialData.rebooking_id}
                updatedAt={initialData.updated_at}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value='history'>
          <div className='rounded-lg border p-6 md:p-8'>
            <div className='text-muted-foreground text-center'>
              <p>El historial se implementará próximamente.</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
