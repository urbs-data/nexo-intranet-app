'use client';

import { ProviderWithCountry } from '../../data/get-providers';
import { Table } from '@tanstack/react-table';

interface ProviderTableActionsProps {
  table: Table<ProviderWithCountry>;
  totalItems: number;
}

export function ProviderTableActions({
  table,
  totalItems
}: ProviderTableActionsProps) {
  return null;
}
