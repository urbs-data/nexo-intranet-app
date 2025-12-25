import ProviderContractsPage from '@/features/providers/components/contracts/provider-contracts-page';

export const metadata = {
  title: 'Dashboard : Provider Contracts'
};

type PageProps = { params: Promise<{ providerId: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;
  return <ProviderContractsPage providerId={params.providerId} />;
}
