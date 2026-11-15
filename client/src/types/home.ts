export type MarketplaceCategory = 'All' | 'Laptops' | 'Phones' | 'Accessories';

export type FeatureIconKey =
  | 'valuation'
  | 'pickup'
  | 'refurbish'
  | 'recycle'
  | 'wallet'
  | 'marketplace';

export interface NavItem {
  label: string;
  sectionId: string;
}

export interface HowItWorksStep {
  stepNumber: string;
  title: string;
  description: string;
  highlight: string;
}

export interface PlatformFeature {
  id: string;
  title: string;
  description: string;
  icon: FeatureIconKey;
  accent: 'eco' | 'gold';
}

export interface AudienceSide {
  id: 'customers' | 'partners';
  badge: string;
  title: string;
  subtitle: string;
  benefits: string[];
  ctaLabel: string;
  ctaPath: string;
}

export interface DemoProduct {
  id: string;
  name: string;
  category: Exclude<MarketplaceCategory, 'All'>;
  conditionGrade: string;
  specs: string;
  demoPriceLabel: string;
  warrantyNote: string;
  co2SavedLabel: string;
  isDemoData: true;
}

export interface ImpactMetric {
  id: string;
  value: string;
  label: string;
  detail: string;
  sampleTag: string;
  isIllustrative: true;
}
