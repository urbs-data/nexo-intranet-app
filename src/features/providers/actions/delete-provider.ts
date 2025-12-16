'use server';

import { authActionClient } from '@/lib/actions/safe-action';
import { deleteProviderSchema } from './delete-provider-schema';
import db from '@/db';
import { accountTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export const deleteProvider = authActionClient
  .metadata({ actionName: 'deleteProvider' })
  .inputSchema(deleteProviderSchema)
  .action(async ({ parsedInput }) => {
    await db.delete(accountTable).where(eq(accountTable.id, parsedInput.id));

    revalidatePath('/dashboard/providers');
    return {
      message: 'Proveedor eliminado exitosamente'
    };
  });
