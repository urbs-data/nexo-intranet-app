import CustomerViewPage from '@/features/customers/components/customer-view-page';

export const metadata = {
  title: 'Dashboard : View Customer'
};

type PageProps = { params: Promise<{ customerId: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;
  return <CustomerViewPage customerId={params.customerId} />;
}
