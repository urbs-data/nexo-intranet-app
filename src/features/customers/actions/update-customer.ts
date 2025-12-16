'use server';

import { authActionClient } from '@/lib/actions/safe-action';
import { updateCustomerSchema } from './update-customer-schema';
import db from '@/db';
import { accountTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export const updateCustomer = authActionClient
  .metadata({ actionName: 'updateCustomer' })
  .inputSchema(updateCustomerSchema)
  .action(async ({ parsedInput }) => {
    const now = new Date();

    const updateData: any = {
      name: parsedInput.name,
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
      updated_at: now
    };

    await db
      .update(accountTable)
      .set(updateData)
      .where(eq(accountTable.id, parsedInput.id));

    revalidatePath('/dashboard/customers');
    revalidatePath(`/dashboard/customers/${parsedInput.id}`);

    return {
      message: 'Cliente actualizado exitosamente'
    };
  });
