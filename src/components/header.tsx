import { LockKeyhole } from 'lucide-react';

export function Header() {
  return (
    <header className="flex flex-col items-center justify-center gap-4 pt-12 text-center md:pt-16">
      <div className="rounded-full bg-primary/10 p-4 border border-primary/20">
        <LockKeyhole className="h-10 w-10 text-primary" />
      </div>
      <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline">
        CryptoCompanion
      </h1>
      <p className="max-w-[700px] text-muted-foreground md:text-xl">
        An interactive educational tool to explore the fascinating world of encryption.
      </p>
    </header>
  );
}
