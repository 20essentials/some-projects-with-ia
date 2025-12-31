import { type Metadata } from 'next';
import '@/styles/globalReset.css'
import '@/styles/global.css';
import { inter } from '@/lib/fonts';

export const metadata: Metadata = {
  title: 'Some Projects With IA providers, and more...',
  description: 'Doing Projects With IA providers, and more...',
  icons: {
    icon: '/assets/favicon.png'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
