'use server';

import { bookingTable, accountContractTable, accountTable } from '@/db/schema';
import { getFileByIdSchema } from './get-file-by-id-schema';
import { eq, and, isNotNull } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';
import {
  BookingStatus,
  FileCustomerStatus,
  FileProviderStatus
} from '@/db/enums';
import { authActionClient } from '@/lib/actions/safe-action';

export type FileDTO = {
  id: string;
  file_public_id: number | null;
  file_created_at: Date | null;
  file_status_customer: FileCustomerStatus | null;
  file_status_provider: FileProviderStatus | null;
  file_customer_deadline: Date | null;
  file_provider_deadline: Date | null;
  customer_name: string | null;
  customer_id: string | null;
  provider_name: string | null;
  provider_id: string | null;
  gross_price: string;
  gross_price_usd: string;
  marketer_currency: string | null;
  net_price: string;
  net_price_usd: string;
  provider_currency: string | null;
  external_id: string;
  status: BookingStatus;
  payment_informed_date: Date | string | null;
  creation_date: Date | string | null;
  check_in: Date | string | null;
  check_out: Date | string | null;
  autocancel_date: Date | string | null;
  cancel_limit_date: Date | string | null;
  canceled_date: Date | string | null;
  rebooking_id: string | null;
  updated_at: Date | string | null;
  customer_payment_rule_id: string | null;
  provider_payment_rule_id: string | null;
};

export const getFileById = authActionClient
  .metadata({ actionName: 'getFileById' })
  .inputSchema(getFileByIdSchema)
  .action(async ({ parsedInput, ctx }) => {
    // Crear alias para las tablas de cuenta
    const accountCustomer = alias(accountTable, 'account_customer');
    const accountProvider = alias(accountTable, 'account_provider');

    const [file] = await ctx.db
      .select({
        id: bookingTable.id,
        file_public_id: bookingTable.file_public_id,
        file_created_at: bookingTable.file_created_at,
        file_status_customer: bookingTable.file_status_customer,
        file_status_provider: bookingTable.file_status_provider,
        file_customer_deadline: bookingTable.file_customer_deadline,
        file_provider_deadline: bookingTable.file_provider_deadline,
        customer_name: accountCustomer.name,
        customer_id: accountCustomer.id,
        provider_name: accountProvider.name,
        provider_id: accountProvider.id,
        gross_price: bookingTable.gross_price,
        gross_price_usd: bookingTable.gross_price_usd,
        marketer_currency: accountContractTable.marketer_currency,
        net_price: bookingTable.net_price,
        net_price_usd: bookingTable.net_price_usd,
        provider_currency: accountContractTable.provider_currency,
        external_id: bookingTable.external_id,
        status: bookingTable.status,
        payment_informed_date: bookingTable.payment_informed_date,
        creation_date: bookingTable.creation_date,
        check_in: bookingTable.check_in,
        check_out: bookingTable.check_out,
        autocancel_date: bookingTable.autocancel_date,
        cancel_limit_date: bookingTable.cancel_limit_date,
        canceled_date: bookingTable.canceled_date,
        rebooking_id: bookingTable.rebooking_id,
        updated_at: bookingTable.updated_at,
        customer_payment_rule_id: accountCustomer.payment_rule_id,
        provider_payment_rule_id: accountProvider.payment_rule_id
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
      .where(
        and(
          eq(bookingTable.id, parsedInput.id),
          isNotNull(bookingTable.file_created_at)
        )
      )
      .limit(1);

    return (file as FileDTO | null) ?? null;
  });
