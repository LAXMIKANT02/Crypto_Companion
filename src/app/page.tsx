import { Header } from '@/components/header';
import { CryptoTool } from '@/components/crypto-tool';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-1 container px-4 py-8 md:px-6">
        <Header />
        <CryptoTool />
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground">
        Built for educational purposes.
      </footer>
    </div>
  );
}
