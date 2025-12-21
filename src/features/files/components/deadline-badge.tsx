import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';
import { formatDate } from '@/lib/format-date';

type DeadlineBadgeProps = {
  deadline: Date | string | null;
  daysRemaining: number | null;
  label: string;
};

export function DeadlineBadge({
  deadline,
  daysRemaining,
  label
}: DeadlineBadgeProps) {
  return (
    <div className='flex flex-wrap items-center gap-2 text-sm'>
      <Clock className='text-error h-4 w-4' />
      <span className='text-muted-foreground'>{label}</span>
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
      {deadline && <span>{formatDate(deadline)}</span>}
    </div>
  );
}
