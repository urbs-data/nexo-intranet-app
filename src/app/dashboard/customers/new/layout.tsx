import PageContainer from '@/components/layout/page-container';

export default async function Layout({
  children
}: {
  children: React.ReactNode;
}) {
  return <PageContainer scrollable>{children}</PageContainer>;
}
