import { Navbar } from '@/components/Navbar';
import { MouseFollower } from '@/components/MouseFollower';
import { HeroSection } from '@/components/HeroSection';
import { ExploreSection } from '@/components/ExploreSection';
import { AmenitiesSection } from '@/components/AmenitiesSection';
import { ListingsSection } from '@/components/ListingsSection';
import { VirtualTourSection } from '@/components/VirtualTourSection';
import { TeamSection } from '@/components/TeamSection';
import { FAQSection } from '@/components/FAQSection';
import { ReviewsSection } from '@/components/ReviewsSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';

export default function Index() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <MouseFollower />
      <Navbar />
      <main>
        <HeroSection />
        <ExploreSection />
        <AmenitiesSection />
        <ListingsSection />
        <VirtualTourSection />
        <TeamSection />
        <FAQSection />
        <ReviewsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
