import './globals.css';
import { Navbar } from '@/components/Navbar';

export const metadata = { title: 'PashuBazaar' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Navbar />
        <main className="max-w-6xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
