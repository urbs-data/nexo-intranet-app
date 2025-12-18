import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { ProviderActions } from '@/features/providers/components/provider-actions';
import { ProviderFilters } from '@/features/providers/components/provider-filters';
import ProviderListPage from '@/features/providers/components/provider-list-page';
import ProviderListSkeleton from '@/features/providers/components/provider-list-skeleton';
import { providerSearchParamsCache } from '@/features/providers/searchparams';
import { serializeProviderParams } from '@/features/providers/searchparams';
import { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';

export const metadata = {
  title: 'Intranet: Proveedores'
};

type pageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Page(props: pageProps) {
  const searchParams = await props.searchParams;
  providerSearchParamsCache.parse(searchParams);

  const key = serializeProviderParams({ ...searchParams });

  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading title='Proveedores' />
          <ProviderActions />
        </div>
        <Separator />

        <Suspense fallback={<div className='h-9' />}>
          <ProviderFilters />
        </Suspense>

        <Suspense key={key} fallback={<ProviderListSkeleton />}>
          <ProviderListPage />
        </Suspense>
      </div>
    </PageContainer>
  );
}
