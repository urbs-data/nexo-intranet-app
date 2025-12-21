import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import { formatCurrency } from '@/lib/format-currency';
import { DeadlineBadge } from './deadline-badge';

type OperationTransactionProps = {
  type: 'customer' | 'provider';
  name: string | null;
  currency: string | null;
  deadline: Date | string | null;
  daysRemaining: number | null;
  price: string;
  priceUsd: string;
};

export function OperationTransaction({
  type,
  name,
  currency,
  deadline,
  daysRemaining,
  price,
  priceUsd
}: OperationTransactionProps) {
  const isCustomer = type === 'customer';
  const Icon = isCustomer ? ArrowDownCircle : ArrowUpCircle;
  const bgColor = isCustomer ? 'bg-success-subtle' : 'bg-error-subtle';
  const iconColor = isCustomer ? 'text-success' : 'text-error';
  const label = isCustomer ? 'Venta' : 'Compra';
  const deadlineLabel = isCustomer ? 'Deadline cobro' : 'Deadline pago';

  return (
    <div className='flex flex-col gap-3 py-3 md:flex-row md:items-start md:gap-4'>
      <div className='flex items-center gap-3'>
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${bgColor}`}
        >
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
        <div className='md:flex-1'>
          <div className='font-medium'>{name || '-'}</div>
          <div className='text-muted-foreground text-sm'>
            {label} {currency || 'US'}
          </div>
        </div>
      </div>
      <div className='ml-11 flex flex-col gap-2 md:ml-0 md:flex-1 md:flex-row md:items-center md:justify-end md:gap-4'>
        <DeadlineBadge
          deadline={deadline}
          daysRemaining={daysRemaining}
          label={deadlineLabel}
        />
        <div className='text-left md:text-right'>
          <div className='font-semibold'>
            {formatCurrency(price, currency || 'USD')}
          </div>
          <div className='text-muted-foreground text-sm'>
            {formatCurrency(priceUsd, 'USD')}
          </div>
        </div>
      </div>
    </div>
  );
}
