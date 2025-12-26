import { Suspense } from 'react';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { BookingLayoutContent } from '@/features/bookings/components/booking-layout-content';
import BookingViewSkeleton from '@/features/bookings/components/booking-view-skeleton';

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ bookingId: string }>;
};

export default async function BookingLayout({ children, params }: LayoutProps) {
  const { bookingId } = await params;

  return (
    <PageContainer scrollable>
      <div className='flex flex-1 flex-col space-y-4'>
        <Heading title='Ver Reserva' />
        <Separator />

        <Suspense fallback={<BookingViewSkeleton />}>
          <BookingLayoutContent bookingId={bookingId}>
            {children}
          </BookingLayoutContent>
        </Suspense>
      </div>
    </PageContainer>
  );
}
