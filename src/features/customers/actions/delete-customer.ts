'use server';

import { authActionClient } from '@/lib/actions/safe-action';
import { deleteCustomerSchema } from './delete-customer-schema';
import db from '@/db';
import { accountTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export const deleteCustomer = authActionClient
  .metadata({ actionName: 'deleteCustomer' })
  .inputSchema(deleteCustomerSchema)
  .action(async ({ parsedInput }) => {
    await db.delete(accountTable).where(eq(accountTable.id, parsedInput.id));

    revalidatePath('/dashboard/customers');
    return {
      message: 'Cliente eliminado exitosamente'
    };
  });
