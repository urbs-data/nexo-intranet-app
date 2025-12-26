import { Skeleton } from '@/components/ui/skeleton';
import { BookingDetailSectionSkeleton } from '@/features/shared/components/booking-detail-section-skeleton';

export default function FileViewSkeleton() {
  return (
    <div className='flex flex-1 flex-col space-y-4'>
      {/* Header */}
      <Skeleton className='h-8 w-48' />
      <Skeleton className='h-px w-full' />

      {/* Account Headers Grid */}
      <div className='grid gap-4 md:grid-cols-2'>
        {/* Cliente Header */}
        <div className='space-y-3 rounded-lg border p-4'>
          <Skeleton className='h-4 w-16' />
          <Skeleton className='h-6 w-40' />
          <Skeleton className='h-5 w-24' />
          <div className='flex gap-4'>
            <Skeleton className='h-4 w-32' />
            <Skeleton className='h-4 w-32' />
          </div>
        </div>

        {/* Proveedor Header */}
        <div className='space-y-3 rounded-lg border p-4'>
          <Skeleton className='h-4 w-20' />
          <Skeleton className='h-6 w-40' />
          <Skeleton className='h-5 w-24' />
          <div className='flex gap-4'>
            <Skeleton className='h-4 w-32' />
            <Skeleton className='h-4 w-32' />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className='space-y-4'>
        <Skeleton className='h-10 w-64' />

        {/* Tab Content */}
        <div className='flex flex-col gap-4 lg:grid lg:grid-cols-3 lg:gap-6'>
          {/* Left Column (2 cols span) */}
          <div className='space-y-4 lg:col-span-2 lg:space-y-6'>
            {/* Operation Card */}
            <div className='space-y-4 rounded-lg border p-4 md:p-6'>
              <Skeleton className='h-5 w-24' />

              {/* Customer Transaction */}
              <div className='space-y-3 border-b pb-4'>
                <Skeleton className='h-5 w-32' />
                <div className='flex justify-between'>
                  <Skeleton className='h-4 w-24' />
                  <Skeleton className='h-4 w-28' />
                </div>
                <div className='flex justify-between'>
                  <Skeleton className='h-4 w-28' />
                  <Skeleton className='h-4 w-20' />
                </div>
              </div>

              {/* Provider Transaction */}
              <div className='space-y-3 pb-4'>
                <Skeleton className='h-5 w-32' />
                <div className='flex justify-between'>
                  <Skeleton className='h-4 w-24' />
                  <Skeleton className='h-4 w-28' />
                </div>
                <div className='flex justify-between'>
                  <Skeleton className='h-4 w-28' />
                  <Skeleton className='h-4 w-20' />
                </div>
              </div>

              {/* Summary */}
              <div className='flex flex-wrap items-center justify-end gap-4 border-t pt-4 md:gap-8'>
                <div className='space-y-2 text-center'>
                  <Skeleton className='mx-auto h-7 w-12' />
                  <Skeleton className='h-4 w-12' />
                </div>
                <div className='space-y-2 text-center'>
                  <Skeleton className='mx-auto h-7 w-12' />
                  <Skeleton className='h-4 w-12' />
                </div>
                <div className='space-y-2 text-right'>
                  <Skeleton className='h-7 w-24' />
                  <Skeleton className='h-4 w-16' />
                </div>
              </div>
            </div>

            {/* Account Details Grid */}
            <div className='grid gap-4 sm:grid-cols-2'>
              {/* Cliente Details */}
              <div className='space-y-3 rounded-lg border p-4'>
                <Skeleton className='h-5 w-20' />
                <div className='space-y-2'>
                  <Skeleton className='h-4 w-full' />
                  <Skeleton className='h-4 w-24' />
                  <Skeleton className='h-4 w-full' />
                  <Skeleton className='h-4 w-32' />
                </div>
              </div>

              {/* Proveedor Details */}
              <div className='space-y-3 rounded-lg border p-4'>
                <Skeleton className='h-5 w-24' />
                <div className='space-y-2'>
                  <Skeleton className='h-4 w-full' />
                  <Skeleton className='h-4 w-24' />
                  <Skeleton className='h-4 w-full' />
                  <Skeleton className='h-4 w-32' />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Details */}
          <div className='lg:col-span-1'>
            <BookingDetailSectionSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}
