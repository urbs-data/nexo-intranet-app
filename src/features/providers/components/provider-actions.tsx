'use client';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function ProviderActions() {
  const router = useRouter();

  return (
    <Button onClick={() => router.push('/dashboard/providers/new')}>
      <Plus className='mr-2 h-4 w-4' />
      Nuevo
    </Button>
  );
}
