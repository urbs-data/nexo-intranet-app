import { notFound } from 'next/navigation';
import FileViewForm from './file-view-form';
import { getFileById } from '../data/get-file-by-id';

type TFileViewPageProps = {
  fileId: string;
};

export default async function FileViewPage({ fileId }: TFileViewPageProps) {
  const fetchedFile = await getFileById({ id: fileId });
  if (!fetchedFile) {
    notFound();
  }

  return <FileViewForm initialData={fetchedFile} />;
}
