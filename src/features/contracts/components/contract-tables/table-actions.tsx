'use client';

import { ContractWithAccounts } from '../../data/get-contracts';
import { Table } from '@tanstack/react-table';

interface ContractTableActionsProps {
  table: Table<ContractWithAccounts>;
  totalItems: number;
}

export function ContractTableActions({
  table,
  totalItems
}: ContractTableActionsProps) {
  // No hay acciones de descarga según los requisitos
  return null;
}
