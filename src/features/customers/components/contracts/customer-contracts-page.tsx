import { CustomerContractsTable } from './customer-contracts-table';
import { Suspense } from 'react';
import CustomerContractsSkeleton from './customer-contracts-skeleton';

type CustomerContractsPageProps = {
  customerId: string;
};

export default function CustomerContractsPage({
  customerId
}: CustomerContractsPageProps) {
  return (
    <Suspense fallback={<CustomerContractsSkeleton />}>
      <CustomerContractsTable customerId={customerId} />
    </Suspense>
  );
}
