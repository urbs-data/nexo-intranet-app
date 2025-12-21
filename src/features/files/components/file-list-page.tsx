import { fileSearchParamsCache } from '@/features/files/searchparams';
import { FileTable } from './file-tables';
import { columns } from './file-tables/columns';
import { getFiles } from '../data/get-files';

type FileListPage = {};

export default async function FileListPage({}: FileListPage) {
  const page = fileSearchParamsCache.get('page');
  const pageLimit = fileSearchParamsCache.get('perPage');
  const search = fileSearchParamsCache.get('search');
  const sortBy = fileSearchParamsCache.get('sortBy');
  const sortDirection = fileSearchParamsCache.get('sortDirection');

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(sortBy && { sortBy }),
    ...(sortDirection && { sortDirection })
  };

  const data = await getFiles(filters);
  const totalFiles = data.totalCount;
  const files = data.files;

  return <FileTable data={files} totalItems={totalFiles} columns={columns} />;
}
