'use server';

import db from '@/db';
import { bookingTable, accountContractTable, accountTable } from '@/db/schema';
import { getBookingsSchema, GetBookingsSchema } from './get-bookings-schema';
import { ValidationError } from '@/lib/errors';
import {
  eq,
  like,
  and,
  asc,
  desc,
  SQL,
  count,
  inArray,
  sql,
  isNull
} from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';
import {
  BookingStatus,
  FileCustomerStatus,
  FileProviderStatus
} from '@/db/enums';

export type BookingListDTO = {
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
  cancel_limit_date: Date | null;
  canceled_date: Date | null;
  autocancel_date: Date | null;
  deadline_date: Date | null;
  payment_informed_date: Date | null;
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
  file_customer_deadline: Date | null;
  file_provider_deadline: Date | null;
  file_customer_paid_at: Date | null;
  file_provider_paid_at: Date | null;
  file_accounted_at: Date | null;
  file_created_at: Date | null;
  quickbooks_estimate_id: string | null;
  quickbooks_purchase_order_id: string | null;
  content_hash: string | null;
  created_at: Date;
  updated_at: Date;
  customer_name: string | null;
  provider_name: string | null;
  marketer_currency: string | null;
  provider_currency: string | null;
};

export async function getBookings(input: GetBookingsSchema): Promise<{
  bookings: BookingListDTO[];
  totalCount: number;
}> {
  const result = getBookingsSchema.safeParse(input);
  if (!result.success) {
    throw new ValidationError(JSON.stringify(result.error));
  }

  const parsedInput = result.data;
  const page = parsedInput.page || 1;
  const limit = parsedInput.limit || 50;
  const offset = (page - 1) * limit;

  // Crear alias para las tablas de cuenta
  const accountCustomer = alias(accountTable, 'account_customer');
  const accountProvider = alias(accountTable, 'account_provider');

  const conditions = [];

  if (parsedInput.search) {
    conditions.push(
      like(
        sql`LOWER(${bookingTable.external_id})`,
        `%${parsedInput.search.toLowerCase()}%`
      )
    );
  }

  if (parsedInput.ids && parsedInput.ids.length > 0) {
    conditions.push(inArray(bookingTable.id, parsedInput.ids));
  }

  if (parsedInput.withoutFile === 'true') {
    conditions.push(isNull(bookingTable.file_created_at));
  }

  if (parsedInput.status) {
    conditions.push(eq(bookingTable.status, parsedInput.status));
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  const columnMap: Record<string, any> = {
    id: bookingTable.id,
    external_id: bookingTable.external_id,
    status: bookingTable.status,
    created_at: bookingTable.created_at,
    check_in: bookingTable.check_in,
    autocancel_date: bookingTable.autocancel_date
  };

  const orderByClause: SQL[] = [];
  if (parsedInput.sortBy) {
    const column = columnMap[parsedInput.sortBy];
    if (column) {
      const isDesc = parsedInput.sortDirection === 'desc';
      orderByClause.push(isDesc ? desc(column) : asc(column));
    }
  }

  // Si no hay ordenamiento específico, usar fecha de creación descendente por defecto
  if (orderByClause.length === 0) {
    orderByClause.push(desc(bookingTable.created_at));
  }

  const filteredBookings = await db
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
      file_public_id: bookingTable.file_public_id,
      file_status_customer: bookingTable.file_status_customer,
      file_status_provider: bookingTable.file_status_provider,
      file_customer_deadline: bookingTable.file_customer_deadline,
      file_provider_deadline: bookingTable.file_provider_deadline,
      file_customer_paid_at: bookingTable.file_customer_paid_at,
      file_provider_paid_at: bookingTable.file_provider_paid_at,
      file_accounted_at: bookingTable.file_accounted_at,
      file_created_at: bookingTable.file_created_at,
      quickbooks_estimate_id: bookingTable.quickbooks_estimate_id,
      quickbooks_purchase_order_id: bookingTable.quickbooks_purchase_order_id,
      content_hash: bookingTable.content_hash,
      created_at: bookingTable.created_at,
      updated_at: bookingTable.updated_at,
      customer_name: accountCustomer.name,
      provider_name: accountProvider.name,
      marketer_currency: accountContractTable.marketer_currency,
      provider_currency: accountContractTable.provider_currency
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
    .where(whereClause)
    .orderBy(...orderByClause)
    .limit(limit)
    .offset(offset);

  const [{ count: totalCount }] = await db
    .select({ count: count() })
    .from(bookingTable)
    .where(whereClause);

  return {
    bookings: filteredBookings as BookingListDTO[],
    totalCount
  };
}
