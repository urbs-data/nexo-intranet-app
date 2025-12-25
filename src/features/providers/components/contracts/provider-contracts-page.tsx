import { ProviderContractsTable } from './provider-contracts-table';
import { Suspense } from 'react';
import ProviderContractsSkeleton from './provider-contracts-skeleton';

type ProviderContractsPageProps = {
  providerId: string;
};

export default function ProviderContractsPage({
  providerId
}: ProviderContractsPageProps) {
  return (
    <Suspense fallback={<ProviderContractsSkeleton />}>
      <ProviderContractsTable providerId={providerId} />
    </Suspense>
  );
}
