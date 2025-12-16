import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import ContractViewPage from '@/features/contracts/components/contract-view-page';
import ContractViewSkeleton from '@/features/contracts/components/contract-view-skeleton';

export const metadata = {
  title: 'Dashboard : Ver Contrato'
};

type PageProps = { params: Promise<{ contractId: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;
  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4'>
        <Suspense fallback={<ContractViewSkeleton />}>
          <ContractViewPage contractId={params.contractId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
