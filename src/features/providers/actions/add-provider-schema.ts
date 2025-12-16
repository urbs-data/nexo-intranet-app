import * as z from 'zod';
import { PaymentRule } from '@/db/enums';

const paymentRuleValues = Object.values(PaymentRule) as [string, ...string[]];

export const addProviderSchema = z.object({
  name: z.string().min(2, {
    message: 'El nombre debe tener al menos 2 caracteres.'
  }),
  business_name: z.string().optional(),
  payment_rule_id: z.enum(paymentRuleValues).default(PaymentRule.DEFAULT),
  country_id: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  language: z.string().optional(),
  tax_id: z.string().optional(),
  currency: z.string().optional(),
  comments: z.string().optional(),
  support_contact_info: z.string().optional(),
  is_active: z.boolean().default(true)
});

export type AddProviderSchema = z.infer<typeof addProviderSchema>;
