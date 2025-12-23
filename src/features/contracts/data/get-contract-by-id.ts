'use server';

import { accountContractTable } from '@/db/schema';
import { getContractByIdSchema } from './get-contract-by-id-schema';
import { AccountContract } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { authActionClient } from '@/lib/actions/safe-action';

export const getContractById = authActionClient
  .metadata({ actionName: 'getContractById' })
  .inputSchema(getContractByIdSchema)
  .action(async ({ parsedInput, ctx }) => {
    const contract = await ctx.db
      .select()
      .from(accountContractTable)
      .where(eq(accountContractTable.id, parsedInput.id))
      .limit(1);

    return contract[0] as AccountContract;
  });
