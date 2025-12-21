'use client';

import { Table } from '@tanstack/react-table';
import { FileListDTO } from '../../data/get-files';

interface FileTableActionsProps {
  table: Table<FileListDTO>;
  totalItems: number;
}

export function FileTableActions({ table, totalItems }: FileTableActionsProps) {
  return null;
}
