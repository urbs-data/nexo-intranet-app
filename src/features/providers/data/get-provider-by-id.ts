'use server';

import db from '@/db';
import { accountTable, countryTable } from '@/db/schema';
import {
  getProviderByIdSchema,
  GetProviderByIdSchema
} from './get-provider-by-id-schema';
import { Account } from '@/db/schema';
import { ValidationError } from '@/lib/errors';
import { eq, and } from 'drizzle-orm';
import { AccountType } from '@/db/enums';

export type ProviderWithCountry = Account & {
  country_name: string | null;
};

export async function getProviderById(
  input: GetProviderByIdSchema
): Promise<ProviderWithCountry | null> {
  const result = getProviderByIdSchema.safeParse(input);
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
      support_contact_info: accountTable.support_contact_info,
      created_at: accountTable.created_at,
      updated_at: accountTable.updated_at,
      country_name: countryTable.name_es
    })
    .from(accountTable)
    .leftJoin(countryTable, eq(accountTable.country_id, countryTable.id))
    .where(
      and(
        eq(accountTable.id, result.data.id),
        eq(accountTable.account_type, AccountType.PROVIDER)
      )
    )
    .limit(1);

  return account as ProviderWithCountry | null;
}
