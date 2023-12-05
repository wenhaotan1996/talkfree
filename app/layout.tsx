import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AuthProvider from '@/components/AuthProvider';
import Header from '@/components/Header';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import LanguageProvider from '@/context/languageSelectContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Talk Free',
  description: 'Talk Free',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className="h-screen flex flex-col overflow-y-hidden w-full max-w-[1500px] mx-auto">
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange>
              <LanguageProvider>
                <Header />
                {children}
                <Toaster />
              </LanguageProvider>
            </ThemeProvider>
          </div>
        </body>
      </html>
    </AuthProvider>
  );
}
