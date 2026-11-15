import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { LaptopScrollytelling } from '../components/hero/LaptopScrollytelling';
import { EngineeringSpecs } from '../components/home/EngineeringSpecs';
import { FeaturesSection } from '../components/home/FeaturesSection';
import { HowItWorks } from '../components/home/HowItWorks';
import { ImpactSection } from '../components/home/ImpactSection';
import { MarketplacePreview } from '../components/home/MarketplacePreview';
import { PartnerSection } from '../components/home/PartnerSection';
import { MainLayout } from '../layouts/MainLayout';

export default function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const sectionId = hash.replace('#', '');
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [hash]);

  return (
    <MainLayout>
      <LaptopScrollytelling />
      <EngineeringSpecs />
      <HowItWorks />
      <FeaturesSection />
      <PartnerSection />
      <MarketplacePreview />
      <ImpactSection />
    </MainLayout>
  );
}
