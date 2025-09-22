import { Header } from '@/components/header';
import { CryptoTool } from '@/components/crypto-tool';
import { AboutSection } from '@/components/about-section';
import { FeatureCards } from '@/components/feature-cards';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <main className="flex-1 container px-4 py-8 md:px-6">
        <Header />
        <section
          id="crypto-tool"
          className="w-full max-w-4xl mx-auto py-12 md:py-16"
        >
          <CryptoTool />
        </section>
        <section id="features" className="w-full max-w-5xl mx-auto py-12 md:py-16">
           <FeatureCards />
        </section>
        <section id="about" className="w-full max-w-4xl mx-auto py-12 md:py-16">
           <AboutSection />
        </section>
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground">
        Built for educational purposes.
      </footer>
    </div>
  );
}
