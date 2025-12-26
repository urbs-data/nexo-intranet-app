import { CustomerContractsTable } from './customer-contracts-table';

type CustomerContractsPageProps = {
  customerId: string;
};

export default function CustomerContractsPage({
  customerId
}: CustomerContractsPageProps) {
  return <CustomerContractsTable customerId={customerId} />;
}
