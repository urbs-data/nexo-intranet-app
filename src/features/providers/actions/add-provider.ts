'use server';

import { authActionClient } from '@/lib/actions/safe-action';
import { addProviderSchema } from './add-provider-schema';
import { accountTable } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { ValidationError } from '@/lib/errors';
import { eq, and } from 'drizzle-orm';
import { AccountType, PaymentRule } from '@/db/enums';
import { v7 as uuidv7 } from 'uuid';
import { publishMessage } from '@/messaging/client';
import { EVENTS } from '@/messaging/events';

export const addProvider = authActionClient
  .metadata({ actionName: 'addProvider' })
  .inputSchema(addProviderSchema)
  .action(async ({ parsedInput, ctx }) => {
    const accountData = {
      id: uuidv7(),
      name: parsedInput.name,
      account_type: AccountType.PROVIDER,
      payment_rule_id:
        PaymentRule[parsedInput.payment_rule_id as keyof typeof PaymentRule],
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

    const existingAccount = await ctx.db
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

    const [account] = await ctx.db
      .insert(accountTable)
      .values(accountData)
      .returning();

    await publishMessage(EVENTS.PROVIDER_UPSERTED, { account_id: account.id });

    revalidatePath('/dashboard/providers');
    return { message: 'Proveedor creado exitosamente' };
  });
