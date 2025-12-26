import PageContainer from '@/components/layout/page-container';

type LayoutProps = { children: React.ReactNode };

export default async function Layout({ children }: LayoutProps) {
  return <PageContainer scrollable>{children}</PageContainer>;
}
