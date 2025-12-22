import * as z from 'zod';
import { PaymentRule } from '@/db/enums';

const paymentRuleValues = Object.values(PaymentRule) as [string, ...string[]];

export const addCustomerSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  business_name: z.string().min(1, 'El nombre de la empresa es requerido'),
  payment_rule_id: z.enum(paymentRuleValues),
  country_id: z.string().min(1, 'El país es requerido'),
  address: z.string().min(1, 'La dirección es requerida'),
  city: z.string().min(1, 'La ciudad es requerida'),
  language: z.string().min(1, 'El idioma es requerido'),
  tax_id: z.string().min(1, 'El CUIT/RUT es requerido'),
  currency: z.string().min(1, 'La moneda es requerida'),
  comments: z.string().optional(),
  bank_account: z.string().min(1, 'La cuenta bancaria es requerida'),
  max_overdraft_amount: z
    .union([z.number(), z.undefined()])
    .refine((val) => val !== undefined, {
      message: 'El monto máximo de sobregiro es requerido'
    }),
  minimum_balance: z
    .union([z.number(), z.undefined()])
    .refine((val) => val !== undefined, {
      message: 'El saldo mínimo es requerido'
    }),
  can_book_with_balance: z.boolean().default(false),
  can_book_with_overdraft: z.boolean().default(false),
  is_active: z.boolean().default(true)
});

export type AddCustomerSchema = z.infer<typeof addCustomerSchema>;
