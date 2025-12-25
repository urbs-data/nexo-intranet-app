'use client';

import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

export default function ProviderLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const params = useParams<{ providerId: string }>();
  const pathname = usePathname();

  const basePath = `/dashboard/providers/${params.providerId}`;
  const isContractsTab = pathname.includes('/contracts');

  return (
    <PageContainer scrollable>
      <div className='flex flex-1 flex-col space-y-4'>
        <Heading title='Ver Proveedor' />
        <Separator />

        <Tabs value={isContractsTab ? 'contracts' : 'info'} className='w-full'>
          <TabsList>
            <TabsTrigger value='info' asChild>
              <Link href={basePath}>Información</Link>
            </TabsTrigger>
            <TabsTrigger value='contracts' asChild>
              <Link href={`${basePath}/contracts`}>Contratos</Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {children}
      </div>
    </PageContainer>
  );
}
