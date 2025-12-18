import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { ContractActions } from '@/features/contracts/components/contract-actions';
import { ContractFilters } from '@/features/contracts/components/contract-filters';
import ContractListPage from '@/features/contracts/components/contract-list-page';
import ContractListSkeleton from '@/features/contracts/components/contract-list-skeleton';
import { contractSearchParamsCache } from '@/features/contracts/searchparams';
import { serializeContractParams } from '@/features/contracts/searchparams';
import { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';

export const metadata = {
  title: 'Intranet: Contratos'
};

type pageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Page(props: pageProps) {
  const searchParams = await props.searchParams;
  contractSearchParamsCache.parse(searchParams);

  const key = serializeContractParams({ ...searchParams });

  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading title='Contratos' />
          <ContractActions />
        </div>
        <Separator />

        <Suspense fallback={<div className='h-9' />}>
          <ContractFilters />
        </Suspense>

        <Suspense key={key} fallback={<ContractListSkeleton />}>
          <ContractListPage />
        </Suspense>
      </div>
    </PageContainer>
  );
}
