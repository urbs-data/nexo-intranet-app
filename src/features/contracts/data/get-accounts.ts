'use server';

import { accountTable } from '@/db/schema';
import { like, and, eq, sql } from 'drizzle-orm';
import { AccountType } from '@/db/enums';
import { authActionClient } from '@/lib/actions/safe-action';
import { z } from 'zod';

export interface AccountOption {
  id: string;
  label: string;
}

const getAccountsSchema = z.object({
  search: z.string().optional(),
  currency: z.string().optional()
});

export const getCustomerAccounts = authActionClient
  .metadata({ actionName: 'getCustomerAccounts' })
  .inputSchema(getAccountsSchema)
  .action(async ({ parsedInput, ctx }) => {
    const conditions = [
      eq(accountTable.account_type, AccountType.CUSTOMER),
      eq(accountTable.is_active, true)
    ];

    if (parsedInput.search) {
      conditions.push(
        like(
          sql`lower(${accountTable.name})`,
          `%${parsedInput.search.toLowerCase()}%`
        )
      );
    }

    if (parsedInput.currency) {
      conditions.push(eq(accountTable.currency, parsedInput.currency));
    }

    const accounts = await ctx.db
      .select({
        id: accountTable.id,
        name: accountTable.name
      })
      .from(accountTable)
      .where(and(...conditions))
      .limit(50);

    return accounts.map((account) => ({
      id: account.id,
      label: account.name
    }));
  });

export const getProviderAccounts = authActionClient
  .metadata({ actionName: 'getProviderAccounts' })
  .inputSchema(getAccountsSchema)
  .action(async ({ parsedInput, ctx }) => {
    const conditions = [
      eq(accountTable.account_type, AccountType.PROVIDER),
      eq(accountTable.is_active, true)
    ];

    if (parsedInput.search) {
      conditions.push(
        like(
          sql`lower(${accountTable.name})`,
          `%${parsedInput.search.toLowerCase()}%`
        )
      );
    }

    if (parsedInput.currency) {
      conditions.push(eq(accountTable.currency, parsedInput.currency));
    }

    const accounts = await ctx.db
      .select({
        id: accountTable.id,
        name: accountTable.name
      })
      .from(accountTable)
      .where(and(...conditions))
      .limit(50);

    return accounts.map((account) => ({
      id: account.id,
      label: account.name
    }));
  });
