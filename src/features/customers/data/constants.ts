import { PaymentRule } from '@/db/enums';

export const PAYMENT_RULES = Object.values(PaymentRule).map((value) => ({
  value,
  label: value
}));

export const CURRENCIES = [
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' },
  { value: 'ARS', label: 'ARS' },
  { value: 'BRL', label: 'BRL' }
];

export const LANGUAGES = [
  { value: 'es', label: 'Español' },
  { value: 'en', label: 'English' },
  { value: 'pt', label: 'Português' }
];
