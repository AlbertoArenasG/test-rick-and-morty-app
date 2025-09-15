import './globals.css';
import type { Metadata } from 'next';
import StoreProvider from '@/components/StoreProvider';

export const metadata: Metadata = {
  title: 'Rick & Morty Character Browser',
  description: 'Browse and favorite your favorite Rick & Morty characters',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
