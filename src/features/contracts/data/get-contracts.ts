'use server';

import db from '@/db';
import { accountContractTable, accountTable } from '@/db/schema';
import { getContractsSchema, GetContractsSchema } from './get-contracts-schema';
import { AccountContract } from '@/db/schema';
import { ValidationError } from '@/lib/errors';
import {
  eq,
  and,
  or,
  asc,
  desc,
  SQL,
  count,
  inArray,
  sql,
  isNull
} from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';

export type ContractWithAccounts = AccountContract & {
  account_customer_name: string | null;
  account_provider_name: string | null;
};

export async function getContracts(input: GetContractsSchema): Promise<{
  contracts: ContractWithAccounts[];
  totalCount: number;
}> {
  const result = getContractsSchema.safeParse(input);
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

  if (parsedInput.channelType) {
    conditions.push(
      eq(accountContractTable.channel_type_id, parsedInput.channelType)
    );
  }

  if (parsedInput.customerInternal) {
    conditions.push(
      eq(accountContractTable.account_customer_id, parsedInput.customerInternal)
    );
  }

  if (parsedInput.customerExternal) {
    conditions.push(
      sql`LOWER(${accountContractTable.cto_marketer_name}) LIKE LOWER(${`%${parsedInput.customerExternal}%`})`
    );
  }

  if (parsedInput.providerInternal) {
    conditions.push(
      eq(accountContractTable.account_provider_id, parsedInput.providerInternal)
    );
  }

  if (parsedInput.providerExternal) {
    conditions.push(
      sql`LOWER(${accountContractTable.cto_provider_name}) LIKE LOWER(${`%${parsedInput.providerExternal}%`})`
    );
  }

  if (parsedInput.unmapped === 'true') {
    conditions.push(
      or(
        isNull(accountContractTable.account_customer_id),
        isNull(accountContractTable.account_provider_id)
      )
    );
  }

  if (parsedInput.ids && parsedInput.ids.length > 0) {
    conditions.push(inArray(accountContractTable.id, parsedInput.ids));
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  const columnMap: Record<string, any> = {
    id: accountContractTable.id,
    account_customer_id: accountContractTable.account_customer_id,
    account_provider_id: accountContractTable.account_provider_id,
    channel_type_id: accountContractTable.channel_type_id,
    cto_provider_id: accountContractTable.cto_provider_id,
    cto_provider_name: accountContractTable.cto_provider_name,
    cto_producer_id: accountContractTable.cto_producer_id,
    cto_producer_name: accountContractTable.cto_producer_name,
    cto_marketer_id: accountContractTable.cto_marketer_id,
    cto_marketer_name: accountContractTable.cto_marketer_name,
    cto_operator_id: accountContractTable.cto_operator_id,
    cto_operator_name: accountContractTable.cto_operator_name,
    marketer_currency: accountContractTable.marketer_currency,
    provider_currency: accountContractTable.provider_currency,
    created_at: accountContractTable.created_at,
    updated_at: accountContractTable.updated_at,
    account_customer_name: accountCustomer.name,
    account_provider_name: accountProvider.name
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
    orderByClause.push(desc(accountContractTable.created_at));
  }

  // Seleccionar todos los campos del contrato más los nombres de las cuentas
  const filteredContracts = await db
    .select({
      id: accountContractTable.id,
      account_customer_id: accountContractTable.account_customer_id,
      account_provider_id: accountContractTable.account_provider_id,
      channel_type_id: accountContractTable.channel_type_id,
      cto_provider_id: accountContractTable.cto_provider_id,
      cto_provider_name: accountContractTable.cto_provider_name,
      cto_producer_id: accountContractTable.cto_producer_id,
      cto_producer_name: accountContractTable.cto_producer_name,
      cto_marketer_id: accountContractTable.cto_marketer_id,
      cto_marketer_name: accountContractTable.cto_marketer_name,
      cto_operator_id: accountContractTable.cto_operator_id,
      cto_operator_name: accountContractTable.cto_operator_name,
      marketer_currency: accountContractTable.marketer_currency,
      provider_currency: accountContractTable.provider_currency,
      created_at: accountContractTable.created_at,
      updated_at: accountContractTable.updated_at,
      account_customer_name: accountCustomer.name,
      account_provider_name: accountProvider.name
    })
    .from(accountContractTable)
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
    .from(accountContractTable)
    .where(whereClause);

  return {
    contracts: filteredContracts as ContractWithAccounts[],
    totalCount
  };
}
