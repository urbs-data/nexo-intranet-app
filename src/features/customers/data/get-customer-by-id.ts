'use server';

import db from '@/db';
import { accountTable, countryTable } from '@/db/schema';
import {
  getCustomerByIdSchema,
  GetCustomerByIdSchema
} from './get-customer-by-id-schema';
import { Account } from '@/db/schema';
import { ValidationError } from '@/lib/errors';
import { eq, and } from 'drizzle-orm';
import { AccountType } from '@/db/enums';

export type CustomerDTO = Account & {
  country_name: string | null;
  created_at: Date | null;
  ended_at: Date | null;
};

export async function getCustomerById(
  input: GetCustomerByIdSchema
): Promise<CustomerDTO | null> {
  const result = getCustomerByIdSchema.safeParse(input);
  if (!result.success) {
    throw new ValidationError(JSON.stringify(result.error));
  }

  const [account] = await db
    .select({
      id: accountTable.id,
      name: accountTable.name,
      account_type: accountTable.account_type,
      payment_rule_id: accountTable.payment_rule_id,
      country_id: accountTable.country_id,
      is_active: accountTable.is_active,
      quickbooks_id: accountTable.quickbooks_id,
      business_name: accountTable.business_name,
      address: accountTable.address,
      city: accountTable.city,
      language: accountTable.language,
      tax_id: accountTable.tax_id,
      currency: accountTable.currency,
      comments: accountTable.comments,
      bank_account: accountTable.bank_account,
      max_overdraft_amount: accountTable.max_overdraft_amount,
      minimum_balance: accountTable.minimum_balance,
      can_book_with_balance: accountTable.can_book_with_balance,
      can_book_with_overdraft: accountTable.can_book_with_overdraft,
      created_at: accountTable.created_at,
      updated_at: accountTable.updated_at,
      // ended_at: accountTable.ended_at,
      country_name: countryTable.name_es
    })
    .from(accountTable)
    .leftJoin(countryTable, eq(accountTable.country_id, countryTable.id))
    .where(
      and(
        eq(accountTable.id, result.data.id),
        eq(accountTable.account_type, AccountType.CUSTOMER)
      )
    )
    .limit(1);

  return account as CustomerDTO | null;
}
