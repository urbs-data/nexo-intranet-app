'use client';

import { CustomerWithCountry } from '../../data/get-customers';
import { Table } from '@tanstack/react-table';

interface CustomerTableActionsProps {
  table: Table<CustomerWithCountry>;
  totalItems: number;
}

export function CustomerTableActions({
  table,
  totalItems
}: CustomerTableActionsProps) {
  return null;
}
