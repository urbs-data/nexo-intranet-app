import * as z from 'zod';

export const mapContractSchema = z.object({
  contractId: z.string().uuid(),
  customerInternalId: z.string().uuid().optional(),
  providerInternalId: z.string().uuid().optional(),
  mapSameName: z.boolean().optional().default(false)
});

export type MapContractSchema = z.infer<typeof mapContractSchema>;
