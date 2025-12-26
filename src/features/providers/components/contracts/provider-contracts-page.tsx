import { ProviderContractsTable } from './provider-contracts-table';

type ProviderContractsPageProps = {
  providerId: string;
};

export default function ProviderContractsPage({
  providerId
}: ProviderContractsPageProps) {
  return <ProviderContractsTable providerId={providerId} />;
}
