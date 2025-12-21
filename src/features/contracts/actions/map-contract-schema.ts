import * as z from 'zod';

export const mapContractSchema = z.object({
  contractId: z.uuid(),
  customerInternalId: z.uuid().optional(),
  providerInternalId: z.uuid().optional(),
  customerCurrency: z.string(),
  providerCurrency: z.string(),
  mapSameName: z.boolean().optional().default(false)
});

export type MapContractSchema = z.infer<typeof mapContractSchema>;
