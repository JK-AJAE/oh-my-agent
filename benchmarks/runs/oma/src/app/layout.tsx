import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'WorldCraft Kids',
  description: 'A creative 3D learning playground where kids build their own worlds',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}
