import Providers from '@/components/layout/providers';
import { Toaster } from '@/components/ui/sonner';
import { fontVariables } from '@/lib/font';
import ThemeProvider from '@/components/layout/ThemeToggle/theme-provider';
import { cn } from '@/lib/utils';
import type { Metadata, Viewport } from 'next';
import { cookies } from 'next/headers';
import NextTopLoader from 'nextjs-toploader';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import './globals.css';
import './theme.css';

export const metadata: Metadata = {
  title: 'Nexo Intranet',
  description: 'Nexo Intranet',
  icons: {
    icon: '/logo-sm_us.svg',
    apple: '/logo-sm_us.svg'
  }
};

export const viewport: Viewport = {
  themeColor: '#ffffff'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const activeThemeValue = cookieStore.get('active_theme')?.value || 'nexo';
  const isScaled = activeThemeValue?.endsWith('-scaled');

  return (
    <html lang='es' suppressHydrationWarning>
      <body
        className={cn(
          'bg-background overflow-hidden overscroll-none font-sans antialiased',
          `theme-${activeThemeValue}`,
          isScaled ? 'theme-scaled' : '',
          fontVariables
        )}
      >
        <NextTopLoader color='var(--primary)' showSpinner={false} />
        <NuqsAdapter>
          <ThemeProvider
            attribute='class'
            defaultTheme='light'
            enableSystem={false}
            disableTransitionOnChange
            enableColorScheme={false}
          >
            <Providers activeThemeValue={activeThemeValue as string}>
              <Toaster />
              {children}
            </Providers>
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
