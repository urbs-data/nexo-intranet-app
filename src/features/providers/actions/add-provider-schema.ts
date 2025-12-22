import * as z from 'zod';
import { PaymentRule } from '@/db/enums';

const paymentRuleValues = Object.values(PaymentRule) as [string, ...string[]];

export const addProviderSchema = z.object({
  name: z.string().min(2, {
    message: 'El nombre debe tener al menos 2 caracteres.'
  }),
  business_name: z.string().min(2, {
    message: 'La razón social debe tener al menos 2 caracteres.'
  }),
  payment_rule_id: z.enum(paymentRuleValues).default(PaymentRule.DEFAULT),
  country_id: z.string().min(1, {
    message: 'El país es requerido.'
  }),
  address: z.string().min(1, {
    message: 'La dirección es requerida.'
  }),
  city: z.string().min(1, {
    message: 'La ciudad es requerida.'
  }),
  language: z.string().min(1, {
    message: 'El idioma es requerido.'
  }),
  tax_id: z.string().min(1, {
    message: 'El nro. de identificación fiscal es requerido.'
  }),
  currency: z.string().min(1, {
    message: 'La moneda es requerida.'
  }),
  comments: z.string().optional(),
  support_contact_info: z.string().optional(),
  is_active: z.boolean().default(true)
});

export type AddProviderSchema = z.infer<typeof addProviderSchema>;
