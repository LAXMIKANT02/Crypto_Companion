import { HeroSection } from '@/components/hero-section';
import { FeatureCards } from '@/components/feature-cards';

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <HeroSection />
      <section className="w-full max-w-5xl mx-auto py-12 md:py-16">
        <FeatureCards />
      </section>
    </div>
  );
}
