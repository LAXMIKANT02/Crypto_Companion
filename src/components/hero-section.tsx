import Link from "next/link";
import { Button } from "./ui/button";
import { LockKeyhole, ArrowRight } from 'lucide-react';


export function HeroSection() {
  return (
    <section className="w-full py-20 md:py-32 lg:py-40 text-center">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center gap-6">
            <div className="rounded-full bg-primary/10 p-5 border-2 border-primary/20 shadow-lg">
                <LockKeyhole className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                Unlock the Secrets of Encryption
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                CryptoCompanion is an interactive educational tool that makes learning about cryptography easy and fun. Explore historical ciphers and understand the principles behind modern digital security.
            </p>
            <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center">
                <Button asChild size="lg">
                    <Link href="/ciphers">
                        Start Learning <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                    <Link href="/about">
                        About The Project
                    </Link>
                </Button>
            </div>
        </div>
      </div>
    </section>
  );
}
