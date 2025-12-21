import { Badge } from '@/components/ui/badge';
import { Clock, CreditCard } from 'lucide-react';
import { formatDate } from '@/lib/format-date';

type AccountDetailSectionProps = {
  title: string;
  deadline: Date | string | null;
  daysRemaining: number | null;
  deadlineLabel: string;
  paymentStatus: string;
  paymentRule: string | null;
};

export function AccountDetailSection({
  title,
  deadline,
  daysRemaining,
  deadlineLabel,
  paymentStatus,
  paymentRule
}: AccountDetailSectionProps) {
  return (
    <div className='rounded-lg border p-4'>
      <h4 className='mb-4 font-semibold'>{title}</h4>
      <div className='space-y-3'>
        <div className='flex flex-wrap items-center gap-2'>
          <Clock className='text-error h-4 w-4 shrink-0' />
          <span className='text-muted-foreground text-sm'>{deadlineLabel}</span>
          {daysRemaining !== null && (
            <Badge
              variant='outline'
              className={
                daysRemaining >= 0
                  ? 'bg-success-subtle text-success'
                  : 'bg-error-subtle text-error'
              }
            >
              {daysRemaining >= 0 ? '+' : ''}
              {daysRemaining}
            </Badge>
          )}
          <span className='ml-auto font-medium'>{formatDate(deadline)}</span>
        </div>
        <div className='flex items-center gap-2'>
          <CreditCard className='text-success h-4 w-4' />
          <span className='text-muted-foreground text-sm'>{paymentStatus}</span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-muted-foreground text-sm'>
            Forma de {title === 'Cliente' ? 'cobro' : 'pago'}
          </span>
          <span className='font-medium'>{paymentRule || '-'}</span>
        </div>
      </div>
    </div>
  );
}
