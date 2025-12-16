import { notFound } from 'next/navigation';
import ContractViewForm from './contract-view-form';
import { getContractById } from '../data/get-contract-by-id';

type TContractViewPageProps = {
  contractId: string;
};

export default async function ContractViewPage({
  contractId
}: TContractViewPageProps) {
  const fetchedContract = await getContractById({ id: contractId });
  if (!fetchedContract) {
    notFound();
  }

  return (
    <ContractViewForm initialData={fetchedContract} pageTitle='Ver Contrato' />
  );
}
