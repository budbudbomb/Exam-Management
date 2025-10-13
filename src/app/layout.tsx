import type { Metadata } from 'next';
import { Inter, PT_Sans } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

const fontBody = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

const fontHeadline = PT_Sans({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-headline',
});

export const metadata: Metadata = {
  title: 'EduReport Pro',
  description:
    'Manage student marks, auto calculate results and auto generate the report card.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn('font-body antialiased', fontBody.variable, fontHeadline.variable)}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
