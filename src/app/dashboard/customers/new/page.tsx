import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import CustomerNewPage from '@/features/customers/components/customer-new-page';
// import CustomerNewSkeleton from '@/features/customers/components/customer-new-skeleton';

export const metadata = {
  title: 'Dashboard : New Customer'
};

export default async function Page() {
  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4'>
        <Suspense fallback={<div className='h-9' />}>
          <CustomerNewPage />
        </Suspense>
      </div>
    </PageContainer>
  );
}
