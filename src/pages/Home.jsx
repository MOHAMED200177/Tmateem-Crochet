import Hero from '../components/home/Hero';
import CategoryShowcase from '../components/home/CategoryShowcase';
import PhilosophySection from '../components/home/PhilosophySection';
import ProcessSection from '../components/home/ProcessSection';
import WhatsAppBanner from '../components/home/WhatsAppBanner';

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryShowcase />
      <PhilosophySection />
      <ProcessSection />
      <WhatsAppBanner />
    </>
  );
}
