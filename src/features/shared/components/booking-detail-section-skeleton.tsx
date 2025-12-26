import { Skeleton } from '@/components/ui/skeleton';

export function BookingDetailSectionSkeleton() {
  return (
    <div className='space-y-3 rounded-lg border p-4'>
      {/* Header with title, link and badge */}
      <div className='flex flex-wrap items-center gap-2'>
        <Skeleton className='h-5 w-16' />
        <Skeleton className='h-5 w-24' />
        <Skeleton className='h-5 w-20' />
      </div>

      {/* Date items */}
      <div className='mt-4 space-y-3'>
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className='flex items-center gap-2'>
            <Skeleton className='h-4 w-4 shrink-0' />
            <Skeleton className='h-4 w-28' />
            <Skeleton className='ml-auto h-4 w-20' />
          </div>
        ))}
      </div>

      {/* Footer - Last update */}
      <div className='mt-4 border-t pt-3'>
        <Skeleton className='h-3 w-48' />
      </div>
    </div>
  );
}
