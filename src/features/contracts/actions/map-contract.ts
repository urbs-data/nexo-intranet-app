'use server';

import { authActionClient } from '@/lib/actions/safe-action';
import { mapContractSchema } from './map-contract-schema';
import db from '@/db';
import { accountContractTable } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { eq, and, sql } from 'drizzle-orm';
import { ValidationError } from '@/lib/errors';

export const mapContract = authActionClient
  .metadata({ actionName: 'mapContract' })
  .inputSchema(mapContractSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { contractId, customerInternalId, providerInternalId, mapSameName } =
      parsedInput;

    const [contract] = await db
      .select()
      .from(accountContractTable)
      .where(eq(accountContractTable.id, contractId))
      .limit(1);

    if (!contract) {
      throw new ValidationError('Contrato no encontrado');
    }

    const updateData: {
      account_customer_id?: string | null;
      account_provider_id?: string | null;
    } = {};

    if (customerInternalId !== undefined) {
      updateData.account_customer_id = customerInternalId || null;
    }

    if (providerInternalId !== undefined) {
      updateData.account_provider_id = providerInternalId || null;
    }

    await db
      .update(accountContractTable)
      .set(updateData)
      .where(eq(accountContractTable.id, contractId));

    if (mapSameName) {
      if (customerInternalId !== undefined && contract.cto_marketer_name) {
        const conditions = [
          eq(
            accountContractTable.cto_marketer_name,
            contract.cto_marketer_name
          ),
          sql`${accountContractTable.id}::text != ${contractId}`
        ];

        await db
          .update(accountContractTable)
          .set({
            account_customer_id: customerInternalId || null
          })
          .where(and(...conditions));
      }
      if (providerInternalId !== undefined && contract.cto_provider_name) {
        const conditions = [
          eq(
            accountContractTable.cto_provider_name,
            contract.cto_provider_name
          ),
          sql`${accountContractTable.id}::text != ${contractId}`
        ];
        await db
          .update(accountContractTable)
          .set({
            account_provider_id: providerInternalId || null
          })
          .where(and(...conditions));
      }
    }

    revalidatePath('/dashboard/contracts');
    return { message: 'Contrato mapeado exitosamente' };
  });
