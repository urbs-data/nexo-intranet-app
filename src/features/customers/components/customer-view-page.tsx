import { notFound } from 'next/navigation';
import CustomerViewForm from './customer-view-form';
import { getCustomerById } from '../data/get-customer-by-id';

type TCustomerViewPageProps = {
  customerId: string;
};

export default async function CustomerViewPage({
  customerId
}: TCustomerViewPageProps) {
  const fetchedCustomer = await getCustomerById({ id: customerId });
  if (!fetchedCustomer) {
    notFound();
  }

  return (
    <CustomerViewForm initialData={fetchedCustomer} pageTitle='Ver Cliente' />
  );
}
