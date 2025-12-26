import PageContainer from '@/components/layout/page-container';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <PageContainer scrollable>{children}</PageContainer>;
}
