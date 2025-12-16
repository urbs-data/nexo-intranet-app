'use server';

import { authActionClient } from '@/lib/actions/safe-action';
import { addProviderSchema } from './add-provider-schema';
import db from '@/db';
import { accountTable } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { ValidationError } from '@/lib/errors';
import { eq, and } from 'drizzle-orm';
import { AccountType } from '@/db/enums';
import { v7 as uuidv7 } from 'uuid';

export const addProvider = authActionClient
  .metadata({ actionName: 'addProvider' })
  .inputSchema(addProviderSchema)
  .action(async ({ parsedInput }) => {
    const accountData = {
      id: uuidv7(),
      name: parsedInput.name,
      account_type: AccountType.PROVIDER,
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
      support_contact_info: parsedInput.support_contact_info || null,
      created_at: new Date(),
      updated_at: new Date()
    };

    console.log(accountData);

    const existingAccount = await db
      .select()
      .from(accountTable)
      .where(
        and(
          eq(accountTable.name, accountData.name),
          eq(accountTable.account_type, AccountType.PROVIDER)
        )
      )
      .limit(1);

    if (existingAccount.length > 0) {
      throw new ValidationError('Ya existe un proveedor con ese nombre');
    }

    await db.insert(accountTable).values(accountData);

    revalidatePath('/dashboard/providers');
    return { message: 'Proveedor creado exitosamente' };
  });
