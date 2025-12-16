'use server';

import db from '@/db';
import { accountContractTable } from '@/db/schema';
import {
  getContractByIdSchema,
  GetContractByIdSchema
} from './get-contract-by-id-schema';
import { AccountContract } from '@/db/schema';
import { ValidationError } from '@/lib/errors';
import { eq } from 'drizzle-orm';

export async function getContractById(
  input: GetContractByIdSchema
): Promise<AccountContract | null> {
  const result = getContractByIdSchema.safeParse(input);
  if (!result.success) {
    throw new ValidationError(JSON.stringify(result.error));
  }

  const parsedInput = result.data;

  const contract = await db
    .select()
    .from(accountContractTable)
    .where(eq(accountContractTable.id, parsedInput.id))
    .limit(1);

  return (contract[0] as AccountContract) || null;
}
