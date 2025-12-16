import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { CustomerActions } from '@/features/customers/components/customer-actions';
import { CustomerFilters } from '@/features/customers/components/customer-filters';
import CustomerListPage from '@/features/customers/components/customer-list-page';
import CustomerListSkeleton from '@/features/customers/components/customer-list-skeleton';
import { customerSearchParamsCache } from '@/features/customers/searchparams';
import { serializeCustomerParams } from '@/features/customers/searchparams';
import { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';

export const metadata = {
  title: 'Dashboard: Customers'
};

type pageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Page(props: pageProps) {
  const searchParams = await props.searchParams;
  customerSearchParamsCache.parse(searchParams);

  const key = serializeCustomerParams({ ...searchParams });

  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title='Customers'
            description='Manage customers (Server side table functionalities.)'
          />
          <CustomerActions />
        </div>
        <Separator />

        <Suspense fallback={<div className='h-9' />}>
          <CustomerFilters />
        </Suspense>

        <Suspense key={key} fallback={<CustomerListSkeleton />}>
          <CustomerListPage />
        </Suspense>
      </div>
    </PageContainer>
  );
}
