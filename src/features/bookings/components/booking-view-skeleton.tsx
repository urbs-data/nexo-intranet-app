import { Skeleton } from '@/components/ui/skeleton';
import { BookingDetailSectionSkeleton } from '@/features/shared/components/booking-detail-section-skeleton';

export default function BookingViewSkeleton() {
  return (
    <div className='space-y-4'>
      {/* Header Section */}
      <div className='rounded-lg border p-4'>
        <div className='flex items-start gap-3'>
          <Skeleton className='h-6 w-6 shrink-0' />
          <div className='flex-1 space-y-2'>
            <Skeleton className='h-6 w-48' />
            <Skeleton className='h-5 w-24' />
            <div className='flex flex-wrap gap-4'>
              <Skeleton className='h-4 w-32' />
              <Skeleton className='h-4 w-32' />
              <Skeleton className='h-4 w-32' />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Skeleton className='h-10 w-48' />

      {/* Sections Grid */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <BookingDetailSectionSkeleton />
        <div className='space-y-3 rounded-lg border p-4'>
          <Skeleton className='h-5 w-24' />
          <div className='space-y-2'>
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className='h-4 w-full' />
            ))}
          </div>
        </div>
        <div className='space-y-3 rounded-lg border p-4'>
          <Skeleton className='h-5 w-24' />
          <div className='space-y-2'>
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className='h-4 w-full' />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
