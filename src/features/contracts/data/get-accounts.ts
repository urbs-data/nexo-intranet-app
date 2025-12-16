'use server';

import db from '@/db';
import { accountTable } from '@/db/schema';
import { like, and, eq } from 'drizzle-orm';
import { AccountType } from '@/db/enums';

export interface AccountOption {
  id: string;
  label: string;
}

export async function getCustomerAccounts(
  search?: string,
  currency?: string
): Promise<AccountOption[]> {
  const conditions = [eq(accountTable.account_type, AccountType.CUSTOMER)];

  if (search) {
    conditions.push(like(accountTable.name, `%${search}%`));
  }

  if (currency) {
    conditions.push(eq(accountTable.currency, currency));
  }

  const accounts = await db
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
}

export async function getProviderAccounts(
  search?: string,
  currency?: string
): Promise<AccountOption[]> {
  const conditions = [eq(accountTable.account_type, AccountType.PROVIDER)];

  if (search) {
    conditions.push(like(accountTable.name, `%${search}%`));
  }

  if (currency) {
    conditions.push(eq(accountTable.currency, currency));
  }

  const accounts = await db
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
}
