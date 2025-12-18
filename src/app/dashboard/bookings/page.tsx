import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { BookingActions } from '@/features/bookings/components/booking-actions';
import { BookingFilters } from '@/features/bookings/components/booking-filters';
import BookingListPage from '@/features/bookings/components/booking-list-page';
import BookingListSkeleton from '@/features/bookings/components/booking-list-skeleton';
import { bookingSearchParamsCache } from '@/features/bookings/searchparams';
import { serializeBookingParams } from '@/features/bookings/searchparams';
import { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';

export const metadata = {
  title: 'Intranet: Reservas'
};

type pageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Page(props: pageProps) {
  const searchParams = await props.searchParams;
  bookingSearchParamsCache.parse(searchParams);

  const key = serializeBookingParams({ ...searchParams });

  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading title='Reservas' />
          <BookingActions />
        </div>
        <Separator />

        <Suspense fallback={<div className='h-9' />}>
          <BookingFilters />
        </Suspense>

        <Suspense key={key} fallback={<BookingListSkeleton />}>
          <BookingListPage />
        </Suspense>
      </div>
    </PageContainer>
  );
}
