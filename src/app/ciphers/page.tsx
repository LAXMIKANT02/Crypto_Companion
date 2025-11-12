import { CryptoTool } from '@/components/crypto-tool';
import { CiphersSection } from '@/components/ciphers-section';

export default function CiphersPage() {
  return (
    <>
        <section id="ciphers-intro" className="w-full max-w-5xl mx-auto pt-8 pb-12 text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Classical Ciphers</h1>
            <p className="mt-4 text-muted-foreground md:text-xl">
                Explore the manual techniques that formed the bedrock of secret communication for centuries.
            </p>
        </section>
        
        <section
          id="crypto-tool"
          className="w-full max-w-4xl mx-auto py-12 md:py-16"
        >
          <CryptoTool />
        </section>
        
        <section id="ciphers" className="w-full max-w-5xl mx-auto py-12 md:py-16">
           <h2 className="text-3xl font-bold text-center mb-8">Learn About the Ciphers</h2>
           <CiphersSection />
        </section>
    </>
  );
}
