import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { FileFilters } from '@/features/files/components/file-filters';
import FileListPage from '@/features/files/components/file-list-page';
import FileListSkeleton from '@/features/files/components/file-list-skeleton';
import { fileSearchParamsCache } from '@/features/files/searchparams';
import { serializeFileParams } from '@/features/files/searchparams';
import { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';

export const metadata = {
  title: 'Intranet: Files'
};

type pageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Page(props: pageProps) {
  const searchParams = await props.searchParams;
  fileSearchParamsCache.parse(searchParams);

  const key = serializeFileParams({ ...searchParams });

  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading title='Files' />
        </div>
        <Separator />

        <Suspense fallback={<div className='h-9' />}>
          <FileFilters />
        </Suspense>

        <Suspense key={key} fallback={<FileListSkeleton />}>
          <FileListPage />
        </Suspense>
      </div>
    </PageContainer>
  );
}
