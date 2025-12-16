import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import ProviderNewPage from '@/features/providers/components/provider-new-page';
// import ProviderNewSkeleton from '@/features/providers/components/provider-new-skeleton';

export const metadata = {
  title: 'Dashboard : New Provider'
};

export default async function Page() {
  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4'>
        <Suspense fallback={<div className='h-9' />}>
          <ProviderNewPage />
        </Suspense>
      </div>
    </PageContainer>
  );
}
