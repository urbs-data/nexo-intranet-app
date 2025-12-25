import { Suspense } from 'react';
import CustomerViewPage from '@/features/customers/components/customer-view-page';
import CustomerViewSkeleton from '@/features/customers/components/customer-view-skeleton';

export const metadata = {
  title: 'Dashboard : View Customer'
};

type PageProps = { params: Promise<{ customerId: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;
  return (
    <Suspense fallback={<CustomerViewSkeleton />}>
      <CustomerViewPage customerId={params.customerId} />
    </Suspense>
  );
}
