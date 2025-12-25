import { notFound } from 'next/navigation';
import CustomerViewForm from './customer-view-form';
import { getCustomerById } from '../data/get-customer-by-id';
import { resolveActionResult } from '@/lib/actions/client';

type TCustomerViewPageProps = {
  customerId: string;
};

export default async function CustomerViewPage({
  customerId
}: TCustomerViewPageProps) {
  const fetchedCustomer = await resolveActionResult(
    getCustomerById({ id: customerId })
  );
  if (!fetchedCustomer) {
    notFound();
  }

  return <CustomerViewForm initialData={fetchedCustomer} />;
}
