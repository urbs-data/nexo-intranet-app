import CustomerContractsPage from '@/features/customers/components/contracts/customer-contracts-page';

export const metadata = {
  title: 'Dashboard : Customer Contracts'
};

type PageProps = { params: Promise<{ customerId: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;
  return <CustomerContractsPage customerId={params.customerId} />;
}
