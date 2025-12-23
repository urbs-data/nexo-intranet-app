import { notFound } from 'next/navigation';
import ProviderViewForm from './provider-view-form';
import { getProviderById } from '../data/get-provider-by-id';
import { resolveActionResult } from '@/lib/actions/client';

type TProviderViewPageProps = {
  providerId: string;
};

export default async function ProviderViewPage({
  providerId
}: TProviderViewPageProps) {
  const fetchedProvider = await resolveActionResult(
    getProviderById({ id: providerId })
  );
  if (!fetchedProvider) {
    notFound();
  }

  return (
    <ProviderViewForm initialData={fetchedProvider} pageTitle='Ver Proveedor' />
  );
}
