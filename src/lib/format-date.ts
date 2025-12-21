import { format } from 'date-fns';
import { es } from 'date-fns/locale/es';

export const formatDate = (
  date: Date | string | null,
  formatStr: string = 'yyyy-MM-dd'
): string => {
  if (!date) return '-';
  return format(new Date(date), formatStr, { locale: es });
};
