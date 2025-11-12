import { AlgorithmsSection } from '@/components/algorithms-section';
import { AsymmetricCryptoDemo } from '@/components/asymmetric-crypto-demo';

export default function AlgorithmsPage() {
  return (
    <>
       <section id="algorithms-intro" className="w-full max-w-5xl mx-auto pt-8 pb-12 text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Modern Algorithms</h1>
            <p className="mt-4 text-muted-foreground md:text-xl">
                Dive into the powerful symmetric and asymmetric algorithms that secure our digital world.
            </p>
        </section>

        <section id="algorithms" className="w-full max-w-5xl mx-auto py-12 md:py-16">
           <AlgorithmsSection />
        </section>
        
        <section id="asymmetric-demo" className="w-full max-w-6xl mx-auto py-12 md:py-16">
          <AsymmetricCryptoDemo />
        </section>
    </>
  );
}
