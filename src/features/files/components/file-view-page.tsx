import { notFound } from 'next/navigation';
import FileViewForm from './file-view-form';
import { getFileById } from '../data/get-file-by-id';
import { resolveActionResult } from '@/lib/actions/client';

type TFileViewPageProps = {
  fileId: string;
};

export default async function FileViewPage({ fileId }: TFileViewPageProps) {
  const fetchedFile = await resolveActionResult(getFileById({ id: fileId }));
  if (!fetchedFile) {
    notFound();
  }

  return <FileViewForm initialData={fetchedFile} />;
}
