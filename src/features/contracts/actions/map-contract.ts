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

    // Obtener el contrato actual
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

    // Actualizar el contrato actual
    await db
      .update(accountContractTable)
      .set(updateData)
      .where(eq(accountContractTable.id, contractId));

    // Si mapSameName es true, actualizar otros contratos con el mismo nombre
    if (mapSameName) {
      const conditions = [];

      if (customerInternalId !== undefined && contract.cto_marketer_name) {
        conditions.push(
          eq(accountContractTable.cto_marketer_name, contract.cto_marketer_name)
        );
      }

      if (providerInternalId !== undefined && contract.cto_provider_name) {
        conditions.push(
          eq(accountContractTable.cto_provider_name, contract.cto_provider_name)
        );
      }

      if (conditions.length > 0) {
        const whereConditions = [
          ...conditions,
          // No actualizar el contrato actual
          sql`${accountContractTable.id}::text != ${contractId}`
        ];

        const bulkUpdateData: {
          account_customer_id?: string | null;
          account_provider_id?: string | null;
        } = {};

        // Solo actualizar los campos que se están mapeando
        if (customerInternalId !== undefined) {
          bulkUpdateData.account_customer_id = customerInternalId || null;
        }

        if (providerInternalId !== undefined) {
          bulkUpdateData.account_provider_id = providerInternalId || null;
        }

        await db
          .update(accountContractTable)
          .set(bulkUpdateData)
          .where(and(...whereConditions));
      }
    }

    revalidatePath('/dashboard/contract');
    return { message: 'Contrato mapeado exitosamente' };
  });
