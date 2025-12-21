export const formatCurrency = (
  value: string | number | null,
  currency: string = 'USD',
  digits: number = 2
): string => {
  if (!value) return '-';
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency || 'USD',
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  }).format(numValue);
};
