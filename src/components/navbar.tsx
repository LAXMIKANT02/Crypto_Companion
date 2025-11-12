import Link from 'next/link';
import { LockKeyhole, Github } from 'lucide-react';
import { Button } from './ui/button';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <LockKeyhole className="h-6 w-6 text-primary" />
            <span className="font-bold">CryptoCompanion</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link
              href="/ciphers"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Classical Ciphers
            </Link>
            <Link
              href="/algorithms"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Modern Algorithms
            </Link>
            <Link
              href="/about"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              About
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end">
           <Button variant="ghost" size="icon" asChild>
                <Link href="https://github.com/LAXMIKANT02/Crypto_Companion" target="_blank">
                    <Github />
                    <span className="sr-only">GitHub</span>
                </Link>
           </Button>
        </div>
      </div>
    </header>
  );
}
