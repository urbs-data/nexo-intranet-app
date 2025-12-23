import { notFound } from 'next/navigation';
import ContractViewForm from './contract-view-form';
import { getContractById } from '../data/get-contract-by-id';
import { resolveActionResult } from '@/lib/actions/client';

type TContractViewPageProps = {
  contractId: string;
};

export default async function ContractViewPage({
  contractId
}: TContractViewPageProps) {
  const fetchedContract = await resolveActionResult(
    getContractById({ id: contractId })
  );
  if (!fetchedContract) {
    notFound();
  }

  return (
    <ContractViewForm initialData={fetchedContract} pageTitle='Ver Contrato' />
  );
}
