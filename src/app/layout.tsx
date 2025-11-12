import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Source_Code_Pro } from 'next/font/google';
import { Navbar } from '@/components/navbar';

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-code-pro',
});

export const metadata: Metadata = {
  title: 'CryptoCompanion',
  description: 'An educational tool to learn about classical encryption.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${sourceCodePro.variable}`}>
      <body className="font-body antialiased">
        <div className="flex flex-col min-h-dvh bg-background text-foreground">
          <Navbar />
          <main className="flex-1 container px-4 py-8 md:px-6">
            {children}
          </main>
          <footer className="py-6 text-center text-sm text-muted-foreground">
            Built for educational purposes.
          </footer>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
