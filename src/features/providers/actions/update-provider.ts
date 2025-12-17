'use server';

import { authActionClient } from '@/lib/actions/safe-action';
import { updateProviderSchema } from './update-provider-schema';
import db from '@/db';
import { accountTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { publishMessage } from '@/messaging/client';
import { EVENTS } from '@/messaging/events';

export const updateProvider = authActionClient
  .metadata({ actionName: 'updateProvider' })
  .inputSchema(updateProviderSchema)
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
      support_contact_info: parsedInput.support_contact_info || null,
      updated_at: now
    };

    const [account] = await db
      .update(accountTable)
      .set(updateData)
      .where(eq(accountTable.id, parsedInput.id))
      .returning();

    await publishMessage(EVENTS.PROVIDER_UPSERTED, { account_id: account.id });

    revalidatePath('/dashboard/providers');
    revalidatePath(`/dashboard/providers/${parsedInput.id}`);

    return {
      message: 'Proveedor actualizado exitosamente'
    };
  });
