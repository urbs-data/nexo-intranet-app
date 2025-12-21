'use server';

import { authActionClient } from '@/lib/actions/safe-action';
import { mapContractSchema } from './map-contract-schema';
import db from '@/db';
import { accountContractTable } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { eq, and, ne, isNull, sql } from 'drizzle-orm';
import { ValidationError } from '@/lib/errors';
import { publishMessage } from '@/messaging/client';
import { EVENTS } from '@/messaging/events';

export const mapContract = authActionClient
  .metadata({ actionName: 'mapContract' })
  .inputSchema(mapContractSchema)
  .action(async ({ parsedInput, ctx }) => {
    const {
      contractId,
      customerInternalId,
      providerInternalId,
      customerCurrency,
      providerCurrency,
      mapSameName
    } = parsedInput;

    const [contract] = await db
      .select()
      .from(accountContractTable)
      .where(eq(accountContractTable.id, contractId))
      .limit(1);

    if (!contract) {
      throw new ValidationError('Contrato no encontrado');
    }

    const updateData: {
      account_customer_id?: string;
      account_provider_id?: string;
    } = {};

    if (customerInternalId !== undefined) {
      updateData.account_customer_id = customerInternalId;
    }

    if (providerInternalId !== undefined) {
      updateData.account_provider_id = providerInternalId;
    }

    await db
      .update(accountContractTable)
      .set(updateData)
      .where(eq(accountContractTable.id, contractId));

    const modifiedContracts = [contractId];

    if (mapSameName) {
      if (customerInternalId !== undefined && contract.cto_marketer_name) {
        const conditions = [
          eq(
            sql`TRIM(BOTH FROM ${accountContractTable.cto_marketer_name})`,
            sql`TRIM(BOTH FROM ${contract.cto_marketer_name})`
          ),
          isNull(accountContractTable.account_customer_id),
          ne(accountContractTable.id, contractId),
          eq(accountContractTable.marketer_currency, customerCurrency)
        ];

        const result = await db
          .update(accountContractTable)
          .set({
            account_customer_id: customerInternalId
          })
          .where(and(...conditions))
          .returning({ id: accountContractTable.id });

        modifiedContracts.push(...result.map((r) => r.id));
      }
      if (providerInternalId !== undefined && contract.cto_provider_name) {
        const conditions = [
          eq(
            sql`TRIM(BOTH FROM ${accountContractTable.cto_provider_name})`,
            sql`TRIM(BOTH FROM ${contract.cto_provider_name})`
          ),
          isNull(accountContractTable.account_provider_id),
          ne(accountContractTable.id, contractId),
          eq(accountContractTable.provider_currency, providerCurrency)
        ];
        const result = await db
          .update(accountContractTable)
          .set({
            account_provider_id: providerInternalId
          })
          .where(and(...conditions))
          .returning({ id: accountContractTable.id });
        modifiedContracts.push(...result.map((r) => r.id));
      }
    }

    await publishMessage(EVENTS.CONTRACTS_MAPPED, { ids: modifiedContracts });

    revalidatePath('/dashboard/contracts');
    return { message: 'Contrato mapeado exitosamente' };
  });
