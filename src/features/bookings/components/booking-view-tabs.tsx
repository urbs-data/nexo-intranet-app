'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type BookingViewTabsProps = {
  bookingId: string;
};

export function BookingViewTabs({ bookingId }: BookingViewTabsProps) {
  const pathname = usePathname();
  const basePath = `/dashboard/bookings/${bookingId}`;
  const isHistoryTab = pathname.includes('/history');

  return (
    <Tabs value={isHistoryTab ? 'history' : 'info'} className='w-full'>
      <TabsList>
        <TabsTrigger value='info' asChild>
          <Link href={basePath}>Información</Link>
        </TabsTrigger>
        <TabsTrigger value='history' asChild>
          <Link href={`${basePath}/history`}>Historia</Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
