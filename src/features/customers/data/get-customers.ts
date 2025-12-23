'use server';

import { accountTable, countryTable } from '@/db/schema';
import { getCustomersSchema } from './get-customers-schema';
import { Account } from '@/db/schema';
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
import { authActionClient } from '@/lib/actions/safe-action';

export type CustomerWithCountry = Account & {
  country_name: string | null;
};

export const getCustomers = authActionClient
  .metadata({ actionName: 'getCustomers' })
  .inputSchema(getCustomersSchema)
  .action(async ({ parsedInput, ctx }) => {
    const page = parsedInput.page || 1;
    const limit = parsedInput.limit || 50;
    const offset = (page - 1) * limit;

    const conditions = [eq(accountTable.account_type, AccountType.CUSTOMER)];

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

    const filteredAccounts = await ctx.db
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
        country_name: countryTable.name_es,
        currency: accountTable.currency
      })
      .from(accountTable)
      .leftJoin(countryTable, eq(accountTable.country_id, countryTable.id))
      .where(whereClause)
      .orderBy(...orderByClause)
      .limit(limit)
      .offset(offset);

    const [{ count: totalCount }] = await ctx.db
      .select({ count: count() })
      .from(accountTable)
      .where(whereClause);

    return {
      customers: filteredAccounts as CustomerWithCountry[],
      totalCount
    };
  });
