'use server';

import db from '@/db';
import { accountTable, countryTable } from '@/db/schema';
import {
  getProvidersSchema,
  GetProvidersSchema as GetProvidersSchema
} from './get-providers-schema';
import { Account } from '@/db/schema';
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
  sql
} from 'drizzle-orm';
import { AccountType } from '@/db/enums';

export type ProviderWithCountry = Account & {
  country_name: string | null;
};

export async function getProviders(input: GetProvidersSchema): Promise<{
  providers: ProviderWithCountry[];
  totalCount: number;
}> {
  const result = getProvidersSchema.safeParse(input);
  if (!result.success) {
    throw new ValidationError(JSON.stringify(result.error));
  }

  const parsedInput = result.data;
  const page = parsedInput.page || 1;
  const limit = parsedInput.limit || 50;
  const offset = (page - 1) * limit;

  const conditions = [eq(accountTable.account_type, AccountType.PROVIDER)];

  if (parsedInput.search) {
    conditions.push(
      like(
        sql`LOWER(${accountTable.name})`,
        `%${parsedInput.search.toLowerCase()}%`
      )
    );
  }

  if (parsedInput.isActive !== undefined) {
    conditions.push(eq(accountTable.is_active, parsedInput.isActive));
  }

  if (parsedInput.countryId) {
    conditions.push(eq(accountTable.country_id, parsedInput.countryId));
  }

  if (parsedInput.ids && parsedInput.ids.length > 0) {
    conditions.push(inArray(accountTable.id, parsedInput.ids));
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  const columnMap: Record<string, any> = {
    id: accountTable.id,
    name: accountTable.name,
    account_type: accountTable.account_type,
    payment_rule_id: accountTable.payment_rule_id,
    country_id: accountTable.country_id,
    is_active: accountTable.is_active,
    quickbooks_id: accountTable.quickbooks_id,
    created_at: accountTable.created_at,
    updated_at: accountTable.updated_at
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
    orderByClause.push(desc(accountTable.created_at));
  }

  const filteredAccounts = await db
    .select({
      id: accountTable.id,
      name: accountTable.name,
      account_type: accountTable.account_type,
      payment_rule_id: accountTable.payment_rule_id,
      country_id: accountTable.country_id,
      is_active: accountTable.is_active,
      quickbooks_id: accountTable.quickbooks_id,
      created_at: accountTable.created_at,
      updated_at: accountTable.updated_at,
      country_name: countryTable.name_es
    })
    .from(accountTable)
    .leftJoin(countryTable, eq(accountTable.country_id, countryTable.id))
    .where(whereClause)
    .orderBy(...orderByClause)
    .limit(limit)
    .offset(offset);

  const [{ count: totalCount }] = await db
    .select({ count: count() })
    .from(accountTable)
    .where(whereClause);

  return {
    providers: filteredAccounts as ProviderWithCountry[],
    totalCount
  };
}
