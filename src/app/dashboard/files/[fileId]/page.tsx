import FileViewPage from '@/features/files/components/file-view-page';

export const metadata = {
  title: 'Dashboard : View File'
};

type PageProps = { params: Promise<{ fileId: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;
  return <FileViewPage fileId={params.fileId} />;
}
