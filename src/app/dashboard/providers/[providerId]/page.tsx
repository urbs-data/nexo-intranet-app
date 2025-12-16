import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import ProviderViewPage from '@/features/providers/components/provider-view-page';
import ProviderViewSkeleton from '@/features/providers/components/provider-view-skeleton';

export const metadata = {
  title: 'Dashboard : View Provider'
};

type PageProps = { params: Promise<{ providerId: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;
  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4'>
        <Suspense fallback={<ProviderViewSkeleton />}>
          <ProviderViewPage providerId={params.providerId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
