import { MoreVertical, Plus } from 'lucide-react';
import { formatDate } from '@/lib/format-date';
import { DeadlineBadge } from './deadline-badge';
import { FileStatusBadge } from '@/features/shared/components/file-status-badge';
import { FileCustomerStatus, FileProviderStatus } from '@/db/enums';

type AccountHeaderProps = {
  label: string;
  name: string | null;
  status: FileCustomerStatus | FileProviderStatus | null;
  statusType: 'customer' | 'provider';
  createdAt?: Date | string | null;
  deadline?: Date | string | null;
  daysRemaining?: number | null;
};

export function AccountHeader({
  label,
  name,
  status,
  statusType,
  createdAt,
  deadline,
  daysRemaining
}: AccountHeaderProps) {
  return (
    <div className='rounded-lg border p-4'>
      <div className='flex items-start justify-between'>
        <div>
          <div className='text-muted-foreground text-sm'>{label}</div>
          <div className='text-lg font-semibold md:text-xl'>{name || '-'}</div>
        </div>
        <div className='flex items-center gap-2'>
          {status && <FileStatusBadge status={status} type={statusType} />}
          <button className='hover:text-foreground text-muted-foreground'>
            <MoreVertical className='h-5 w-5' />
          </button>
        </div>
      </div>
      <div className='mt-3 flex flex-wrap items-center gap-2 text-sm md:gap-4'>
        {createdAt && (
          <div className='flex items-center gap-1'>
            <Plus className='text-muted-foreground h-4 w-4' />
            {formatDate(createdAt)}
          </div>
        )}
        {deadline && (
          <div className='flex items-center gap-1'>
            {daysRemaining && (
              <DeadlineBadge
                deadline={deadline}
                daysRemaining={daysRemaining}
                label='Días restantes'
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
