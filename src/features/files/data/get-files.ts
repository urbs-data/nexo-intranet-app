'use server';

import { bookingTable, accountContractTable, accountTable } from '@/db/schema';
import { getFilesSchema } from './get-files-schema';
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
  isNotNull
} from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';
import {
  BookingStatus,
  FileCustomerStatus,
  FileProviderStatus
} from '@/db/enums';
import { authActionClient } from '@/lib/actions/safe-action';

export type FileListDTO = {
  id: string;
  file_public_id: number | null;
  file_created_at: Date | null;
  file_status_customer: FileCustomerStatus | null;
  file_status_provider: FileProviderStatus | null;
  customer_name: string | null;
  gross_price: string;
  gross_price_usd: string;
  marketer_currency: string | null;
  file_customer_deadline: Date | null;
  provider_name: string | null;
  net_price: string;
  net_price_usd: string;
  provider_currency: string | null;
  file_provider_deadline: Date | null;
  external_id: string;
  payment_informed_date: Date | null;
  status: BookingStatus;
};

export const getFiles = authActionClient
  .metadata({ actionName: 'getFiles' })
  .inputSchema(getFilesSchema)
  .action(async ({ parsedInput, ctx }) => {
    const page = parsedInput.page || 1;
    const limit = parsedInput.limit || 50;
    const offset = (page - 1) * limit;

    // Crear alias para las tablas de cuenta
    const accountCustomer = alias(accountTable, 'account_customer');
    const accountProvider = alias(accountTable, 'account_provider');

    const conditions = [isNotNull(bookingTable.file_created_at)];

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

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const columnMap: Record<string, any> = {
      id: bookingTable.id,
      file_public_id: bookingTable.file_public_id,
      file_created_at: bookingTable.file_created_at,
      external_id: bookingTable.external_id,
      status: bookingTable.status
    };

    const orderByClause: SQL[] = [];
    if (parsedInput.sortBy) {
      const column = columnMap[parsedInput.sortBy];
      if (column) {
        const isDesc = parsedInput.sortDirection === 'desc';
        orderByClause.push(isDesc ? desc(column) : asc(column));
      }
    }

    // Si no hay ordenamiento específico, usar fecha de creación del file descendente por defecto
    if (orderByClause.length === 0) {
      orderByClause.push(desc(bookingTable.file_created_at));
    }

    const filteredFiles = await ctx.db
      .select({
        id: bookingTable.id,
        file_public_id: bookingTable.file_public_id,
        file_created_at: bookingTable.file_created_at,
        file_status_customer: bookingTable.file_status_customer,
        file_status_provider: bookingTable.file_status_provider,
        customer_name: accountCustomer.name,
        gross_price: bookingTable.gross_price,
        gross_price_usd: bookingTable.gross_price_usd,
        marketer_currency: accountContractTable.marketer_currency,
        file_customer_deadline: bookingTable.file_customer_deadline,
        provider_name: accountProvider.name,
        net_price: bookingTable.net_price,
        net_price_usd: bookingTable.net_price_usd,
        provider_currency: accountContractTable.provider_currency,
        file_provider_deadline: bookingTable.file_provider_deadline,
        external_id: bookingTable.external_id,
        payment_informed_date: bookingTable.payment_informed_date,
        status: bookingTable.status
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

    const [{ count: totalCount }] = await ctx.db
      .select({ count: count() })
      .from(bookingTable)
      .where(whereClause);

    return {
      files: filteredFiles as FileListDTO[],
      totalCount
    };
  });
