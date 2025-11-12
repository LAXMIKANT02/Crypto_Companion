import { Header } from '@/components/header';
import { AboutSection } from '@/components/about-section';

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <Header />
      <section id="about" className="w-full max-w-4xl mx-auto py-12 md:py-16">
        <AboutSection />
      </section>
    </div>
  );
}
