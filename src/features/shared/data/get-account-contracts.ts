'use server';

import { accountContractTable, accountTable } from '@/db/schema';
import { eq, and, desc } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';
import { authActionClient } from '@/lib/actions/safe-action';
import { z } from 'zod';

const getAccountContractsSchema = z.object({
  account_customer_id: z.uuid().optional(),
  account_provider_id: z.uuid().optional()
});

export type AccountContractDto = {
  id: string;
  account_provider_id: string | null;
  account_provider_name: string | null;
  cto_provider_name: string;
  account_customer_id: string | null;
  account_customer_name: string | null;
  cto_marketer_name: string;
  provider_currency: string | null;
  marketer_currency: string | null;
};

export const getAccountContracts = authActionClient
  .metadata({ actionName: 'getAccountContracts' })
  .inputSchema(getAccountContractsSchema)
  .action(async ({ parsedInput, ctx }) => {
    // Crear alias para la tabla de cuenta proveedora
    const accountProvider = alias(accountTable, 'account_provider');
    const accountCustomer = alias(accountTable, 'account_customer');
    const conditions = [];

    if (parsedInput.account_customer_id) {
      conditions.push(
        eq(
          accountContractTable.account_customer_id,
          parsedInput.account_customer_id
        )
      );
    }

    if (parsedInput.account_provider_id) {
      conditions.push(
        eq(
          accountContractTable.account_provider_id,
          parsedInput.account_provider_id
        )
      );
    }

    // Seleccionar contratos del cliente con información del proveedor
    const contracts = await ctx.db
      .select({
        id: accountContractTable.id,
        account_provider_id: accountContractTable.account_provider_id,
        account_provider_name: accountProvider.name,
        account_customer_id: accountContractTable.account_customer_id,
        account_customer_name: accountCustomer.name,
        cto_provider_name: accountContractTable.cto_provider_name,
        cto_marketer_name: accountContractTable.cto_marketer_name,
        provider_currency: accountContractTable.provider_currency,
        marketer_currency: accountContractTable.marketer_currency
      })
      .from(accountContractTable)
      .leftJoin(
        accountProvider,
        eq(accountContractTable.account_provider_id, accountProvider.id)
      )
      .leftJoin(
        accountCustomer,
        eq(accountContractTable.account_customer_id, accountCustomer.id)
      )
      .where(and(...conditions))
      .orderBy(desc(accountContractTable.created_at));

    return contracts as AccountContractDto[];
  });
