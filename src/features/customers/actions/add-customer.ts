'use server';

import { authActionClient } from '@/lib/actions/safe-action';
import { addCustomerSchema } from './add-customer-schema';
import db from '@/db';
import { accountTable } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { ValidationError } from '@/lib/errors';
import { eq, and } from 'drizzle-orm';
import { AccountType } from '@/db/enums';
import { v7 as uuidv7 } from 'uuid';

export const addCustomer = authActionClient
  .metadata({ actionName: 'addCustomer' })
  .inputSchema(addCustomerSchema)
  .action(async ({ parsedInput }) => {
    const accountData = {
      id: uuidv7(),
      name: parsedInput.name,
      account_type: AccountType.CUSTOMER,
      payment_rule_id: parsedInput.payment_rule_id,
      country_id: parsedInput.country_id
        ? parseInt(parsedInput.country_id)
        : null,
      is_active: parsedInput.is_active,
      business_name: parsedInput.business_name || null,
      address: parsedInput.address || null,
      city: parsedInput.city || null,
      language: parsedInput.language || null,
      tax_id: parsedInput.tax_id || null,
      currency: parsedInput.currency || null,
      comments: parsedInput.comments || null,
      bank_account: parsedInput.bank_account || null,
      max_overdraft_amount: parsedInput.max_overdraft_amount || null,
      minimum_balance: parsedInput.minimum_balance || null,
      can_book_with_balance: parsedInput.can_book_with_balance,
      can_book_with_overdraft: parsedInput.can_book_with_overdraft,
      created_at: new Date(),
      updated_at: new Date()
    };

    const existingAccount = await db
      .select()
      .from(accountTable)
      .where(
        and(
          eq(accountTable.name, accountData.name),
          eq(accountTable.account_type, AccountType.CUSTOMER)
        )
      )
      .limit(1);

    if (existingAccount.length > 0) {
      throw new ValidationError('Ya existe un cliente con ese nombre');
    }

    await db.insert(accountTable).values(accountData);

    revalidatePath('/dashboard/customers');
    return { message: 'Cliente creado exitosamente' };
  });
