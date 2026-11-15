import type {
  AudienceSide,
  DemoProduct,
  HowItWorksStep,
  ImpactMetric,
  MarketplaceCategory,
  NavItem,
  PlatformFeature,
} from '../../types/home';

export const BRAND_INFO = {
  name: 'EcoLoop',
  tagline: 'Give electronics a second life.',
  description:
    'A Smart E-Waste Management and Circular Economy Platform connecting customers with collectors, refurbishers and authorized recyclers.',
} as const;

export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Home', sectionId: 'hero' },
  { label: 'Explore', sectionId: 'features' },
  { label: 'Marketplace', sectionId: 'marketplace' },
  { label: 'How It Works', sectionId: 'how-it-works' },
  { label: 'About', sectionId: 'impact' },
];

export const HERO_CONTENT = {
  eyebrow: 'Smart E-Waste & Circular Economy',
  headline: "Don't discard it. Reimagine it.",
  description:
    'Turn your old electronics into value. Sell, repair, refurbish and recycle with EcoLoop.',
  primaryCta: { label: 'Sell Your E-Waste', to: '/sell' },
  secondaryCta: { label: 'Explore Marketplace', sectionId: 'marketplace' },
  highlights: [
    'Smart valuation & transparent offers',
    'Verified doorstep pickup network',
    'Certified refurbishment & zero-landfill recycling',
  ],
} as const;

export const HOW_IT_WORKS_STEPS: readonly HowItWorksStep[] = [
  {
    stepNumber: '01',
    title: 'List your device',
    description:
      'Choose your electronics category, enter model details and condition, and get an instant smart estimate tailored for reuse or recovery.',
    highlight: 'Guided 2-minute intake',
  },
  {
    stepNumber: '02',
    title: 'Receive offers and schedule pickup',
    description:
      'Compare verified offers from authorized collectors, refurbishers, and recyclers, then lock in a convenient doorstep pickup window.',
    highlight: 'Verified circular partners',
  },
  {
    stepNumber: '03',
    title: 'Earn money or rewards',
    description:
      'Receive direct payouts or EcoLoop wallet rewards after inspection while keeping functional hardware in circulation and toxins out of landfills.',
    highlight: 'Trackable circular impact',
  },
];

export const PLATFORM_FEATURES: readonly PlatformFeature[] = [
  {
    id: 'valuation',
    title: 'Smart device valuation',
    description:
      'Condition-aware pricing guidance that evaluates functional reuse value alongside recoverable hardware components.',
    icon: 'valuation',
    accent: 'eco',
  },
  {
    id: 'pickup',
    title: 'Doorstep collection',
    description:
      'Scheduled home and office pickups handled by verified logistics and collection partners with status milestones.',
    icon: 'pickup',
    accent: 'gold',
  },
  {
    id: 'refurbishment',
    title: 'Refurbishment',
    description:
      'Multi-point diagnostics, battery health checks, and professional restoration that extend device lifespans reliably.',
    icon: 'refurbish',
    accent: 'eco',
  },
  {
    id: 'recycling',
    title: 'Authorized recycling',
    description:
      'End-of-life electronics routed strictly to compliant, authorized recyclers for safe dismantling and material recovery.',
    icon: 'recycle',
    accent: 'gold',
  },
  {
    id: 'wallet',
    title: 'Rewards wallet',
    description:
      'Unified balance for device payouts, circular green credits, and marketplace discounts tracked in one place.',
    icon: 'wallet',
    accent: 'eco',
  },
  {
    id: 'marketplace',
    title: 'Refurbished marketplace',
    description:
      'Browse quality-tested laptops, smartphones, and accessories graded transparently for confident second-life ownership.',
    icon: 'marketplace',
    accent: 'gold',
  },
];

export const AUDIENCE_SIDES: readonly AudienceSide[] = [
  {
    id: 'customers',
    badge: 'For Customers',
    title: 'Unlock value from idle drawers without the guesswork',
    subtitle:
      'Whether a device still works or has reached end-of-life, EcoLoop routes it cleanly to the highest-value circular path.',
    benefits: [
      'Upfront condition-based estimates with zero hidden collection surprises',
      'Doorstep handoff with traceable status from pickup to final disposition',
      'Flexible choice between cash payouts, rewards wallet credits, or circular upgrades',
      'Shop certified refurbished electronics at transparent, accessible prices',
    ],
    ctaLabel: 'Sell Your E-Waste',
    ctaPath: '/sell',
  },
  {
    id: 'partners',
    badge: 'For Business Partners',
    title: 'Verified inbound e-waste and structured circular operations',
    subtitle:
      'Built for authorized collectors, refurbishment labs, and licensed recyclers scaling compliant electronics recovery.',
    benefits: [
      'Structured device manifests with pre-screened condition notes before dispatch',
      'Streamlined pickup scheduling and hub-level intake verification workflows',
      'Direct visibility into refurbishment inventory and certified recovery batches',
      'Compliance-ready audit trails supporting circular economy reporting',
    ],
    ctaLabel: 'Explore Partner Onboarding',
    ctaPath: '/partner-apply',
  },
];

export const MARKETPLACE_CATEGORIES: readonly MarketplaceCategory[] = [
  'All',
  'Laptops',
  'Phones',
  'Accessories',
];

export const DEMO_MARKETPLACE_PRODUCTS: readonly DemoProduct[] = [
  {
    id: 'demo-laptop-1',
    name: 'EcoBook Pro 14" (Refurbished)',
    category: 'Laptops',
    conditionGrade: 'Grade A+ Renewed',
    specs: '16 GB RAM · 512 GB NVMe SSD · 94% Battery Health · 12-Mo Demo Warranty',
    demoPriceLabel: '$549',
    warrantyNote: 'Demo catalog listing',
    co2SavedLabel: '~185 kg CO2e avoided (sample)',
    isDemoData: true,
  },
  {
    id: 'demo-phone-1',
    name: 'Apex Nova 5G 128 GB (Refurbished)',
    category: 'Phones',
    conditionGrade: 'Grade A Certified',
    specs: 'OLED 120 Hz · 92% Battery Health · Unlocked · 24-Point Tested',
    demoPriceLabel: '$319',
    warrantyNote: 'Demo catalog listing',
    co2SavedLabel: '~58 kg CO2e avoided (sample)',
    isDemoData: true,
  },
  {
    id: 'demo-laptop-2',
    name: 'ThinkWork Ultra 13" (Refurbished)',
    category: 'Laptops',
    conditionGrade: 'Grade A Business',
    specs: '16 GB RAM · 256 GB SSD · Fresh Thermal Paste & Sanitized Chassis',
    demoPriceLabel: '$429',
    warrantyNote: 'Demo catalog listing',
    co2SavedLabel: '~160 kg CO2e avoided (sample)',
    isDemoData: true,
  },
  {
    id: 'demo-phone-2',
    name: 'Pixelis Core 256 GB (Refurbished)',
    category: 'Phones',
    conditionGrade: 'Grade A+ Mint',
    specs: 'Dual Camera · New Certified Cell · Verified Clean IMEI',
    demoPriceLabel: '$289',
    warrantyNote: 'Demo catalog listing',
    co2SavedLabel: '~52 kg CO2e avoided (sample)',
    isDemoData: true,
  },
  {
    id: 'demo-acc-1',
    name: 'USB-C 100W GaN Dock & Hub (Renewed)',
    category: 'Accessories',
    conditionGrade: 'Tested & Certified',
    specs: 'Dual 4K DisplayPort · PD Pass-Through · Braided Cable Included',
    demoPriceLabel: '$49',
    warrantyNote: 'Demo catalog listing',
    co2SavedLabel: '~12 kg CO2e avoided (sample)',
    isDemoData: true,
  },
  {
    id: 'demo-acc-2',
    name: 'Studio ANC Wireless Headset (Refurbished)',
    category: 'Accessories',
    conditionGrade: 'Sanitized Grade A',
    specs: 'New Memory Foam Cushions · 32h Battery · USB-C Fast Charge',
    demoPriceLabel: '$89',
    warrantyNote: 'Demo catalog listing',
    co2SavedLabel: '~19 kg CO2e avoided (sample)',
    isDemoData: true,
  },
];

export const ILLUSTRATIVE_IMPACT_METRICS: readonly ImpactMetric[] = [
  {
    id: 'devices-recirculated',
    value: '18,400+',
    label: 'Devices Given a Second Life',
    detail: 'Projected units diverted toward repair, refurbishment, or certified parts reuse.',
    sampleTag: 'Illustrative Goal',
    isIllustrative: true,
  },
  {
    id: 'co2-avoided',
    value: '1,420 t',
    label: 'CO2e Emissions Avoided',
    detail: 'Sample lifecycle carbon savings compared against newly manufactured replacements.',
    sampleTag: 'Illustrative Projection',
    isIllustrative: true,
  },
  {
    id: 'materials-recovered',
    value: '96.5%',
    label: 'Responsible Recovery Rate',
    detail: 'Target share of collected end-of-life electronics routed through authorized recyclers.',
    sampleTag: 'Illustrative Target',
    isIllustrative: true,
  },
  {
    id: 'partner-hubs',
    value: '85+',
    label: 'Authorized Partner Nodes',
    detail: 'Illustrative regional network of vetted collectors, repair labs, and recyclers.',
    sampleTag: 'Illustrative Network',
    isIllustrative: true,
  },
];
