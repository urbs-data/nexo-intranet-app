'use server';

import {
  bookingTable,
  accountContractTable,
  accountTable,
  destinationTable,
  countryTable
} from '@/db/schema';
import { eq, sql } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';
import { authActionClient } from '@/lib/actions/safe-action';
import { z } from 'zod';
import {
  BookingStatus,
  FileCustomerStatus,
  FileProviderStatus
} from '@/db/enums';

export type BookingDetailDTO = {
  id: string;
  public_id: number | null;
  external_id: string;
  rebooking_id: string | null;
  status: BookingStatus;
  customer_status: BookingStatus | null;
  customer_reference_id: string | null;
  provider_reference_id: string | null;
  account_contract_id: string | null;
  creation_date: Date | string | null;
  check_in: Date | string | null;
  check_out: Date | string | null;
  cancel_limit_date: Date | string | null;
  canceled_date: Date | string | null;
  autocancel_date: Date | string | null;
  deadline_date: Date | string | null;
  payment_informed_date: Date | string | null;
  net_price: string;
  net_price_usd: string;
  gross_price: string;
  gross_price_usd: string;
  cto_provider_id: string | null;
  cto_provider_name: string | null;
  cto_producer_id: string | null;
  cto_producer_name: string | null;
  cto_marketer_id: string | null;
  cto_marketer_name: string | null;
  cto_operator_id: string | null;
  cto_operator_name: string | null;
  destination_id: number | null;
  product_type: string | null;
  product_name: string | null;
  holder_name: string | null;
  file_public_id: number | null;
  file_status_customer: FileCustomerStatus | null;
  file_status_provider: FileProviderStatus | null;
  file_customer_deadline: Date | string | null;
  file_provider_deadline: Date | string | null;
  file_customer_paid_at: Date | null;
  file_provider_paid_at: Date | null;
  file_accounted_at: Date | string | null;
  file_created_at: Date | null;
  created_at: Date;
  updated_at: Date;
  // Joined fields
  customer_name: string | null;
  provider_name: string | null;
  marketer_currency: string | null;
  provider_currency: string | null;
  destination_name: string | null;
  destination_zone: string | null;
};

const getBookingByIdSchema = z.object({
  id: z.uuid()
});

export const getBookingById = authActionClient
  .metadata({ actionName: 'getBookingById' })
  .inputSchema(getBookingByIdSchema)
  .action(async ({ parsedInput, ctx }) => {
    const accountCustomer = alias(accountTable, 'account_customer');
    const accountProvider = alias(accountTable, 'account_provider');

    const [booking] = await ctx.db
      .select({
        id: bookingTable.id,
        public_id: bookingTable.public_id,
        external_id: bookingTable.external_id,
        rebooking_id: bookingTable.rebooking_id,
        status: bookingTable.status,
        customer_status: bookingTable.customer_status,
        customer_reference_id: bookingTable.customer_reference_id,
        provider_reference_id: bookingTable.provider_reference_id,
        account_contract_id: bookingTable.account_contract_id,
        creation_date: bookingTable.creation_date,
        check_in: bookingTable.check_in,
        check_out: bookingTable.check_out,
        cancel_limit_date: bookingTable.cancel_limit_date,
        canceled_date: bookingTable.canceled_date,
        autocancel_date: bookingTable.autocancel_date,
        deadline_date: bookingTable.deadline_date,
        payment_informed_date: bookingTable.payment_informed_date,
        net_price: bookingTable.net_price,
        net_price_usd: bookingTable.net_price_usd,
        gross_price: bookingTable.gross_price,
        gross_price_usd: bookingTable.gross_price_usd,
        cto_provider_id: bookingTable.cto_provider_id,
        cto_provider_name: bookingTable.cto_provider_name,
        cto_producer_id: bookingTable.cto_producer_id,
        cto_producer_name: bookingTable.cto_producer_name,
        cto_marketer_id: bookingTable.cto_marketer_id,
        cto_marketer_name: bookingTable.cto_marketer_name,
        cto_operator_id: bookingTable.cto_operator_id,
        cto_operator_name: bookingTable.cto_operator_name,
        destination_id: bookingTable.destination_id,
        product_type: bookingTable.product_type,
        product_name: bookingTable.product_name,
        holder_name: bookingTable.holder_name,
        file_public_id: sql<
          number | null
        >`CASE WHEN ${bookingTable.file_created_at} IS NOT NULL THEN ${bookingTable.file_public_id} ELSE NULL END`,
        file_status_customer: bookingTable.file_status_customer,
        file_status_provider: bookingTable.file_status_provider,
        file_customer_deadline: bookingTable.file_customer_deadline,
        file_provider_deadline: bookingTable.file_provider_deadline,
        file_customer_paid_at: bookingTable.file_customer_paid_at,
        file_provider_paid_at: bookingTable.file_provider_paid_at,
        file_accounted_at: bookingTable.file_accounted_at,
        file_created_at: bookingTable.file_created_at,
        created_at: bookingTable.created_at,
        updated_at: bookingTable.updated_at,
        customer_name: accountCustomer.name,
        provider_name: accountProvider.name,
        marketer_currency: accountContractTable.marketer_currency,
        provider_currency: accountContractTable.provider_currency,
        destination_name: destinationTable.name_es,
        destination_zone: countryTable.zone
      })
      .from(bookingTable)
      .leftJoin(
        accountContractTable,
        eq(bookingTable.account_contract_id, accountContractTable.id)
      )
      .leftJoin(
        accountCustomer,
        eq(accountContractTable.account_customer_id, accountCustomer.id)
      )
      .leftJoin(
        accountProvider,
        eq(accountContractTable.account_provider_id, accountProvider.id)
      )
      .leftJoin(
        destinationTable,
        eq(bookingTable.destination_id, destinationTable.id)
      )
      .leftJoin(countryTable, eq(destinationTable.country_id, countryTable.id))
      .where(eq(bookingTable.id, parsedInput.id))
      .limit(1);

    return (booking as BookingDetailDTO | null) ?? null;
  });
