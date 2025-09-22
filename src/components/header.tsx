import { Lock } from 'lucide-react';

export function Header() {
  return (
    <header className="flex items-center justify-center gap-3 py-8 text-center md:py-12">
      <Lock className="h-8 w-8 text-primary" />
      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
        CryptoCompanion
      </h1>
    </header>
  );
}
