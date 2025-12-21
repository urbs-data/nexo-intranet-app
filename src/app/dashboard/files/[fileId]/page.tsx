import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import FileViewPage from '@/features/files/components/file-view-page';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';

export const metadata = {
  title: 'Dashboard : View File'
};

type PageProps = { params: Promise<{ fileId: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;
  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4'>
        <Suspense fallback={<DataTableSkeleton columnCount={1} rowCount={5} />}>
          <FileViewPage fileId={params.fileId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
