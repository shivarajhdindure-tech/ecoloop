import { useState } from 'react';
import { Cpu, RefreshCw, ShieldCheck, Sparkles, Wrench } from 'lucide-react';
import { Button } from '../common/Button';

interface SpecDetail {
  id: string;
  category: string;
  headline: string;
  subtext: string;
  metrics: { label: string; value: string; hint: string }[];
  highlight: string;
}

const SPEC_DETAILS: readonly SpecDetail[] = [
  {
    id: 'silicon',
    category: 'Modular Compute',
    headline: 'Multi-Die Architecture with Zero-Solder Sockets',
    subtext:
      'Engineered to detach. Upgrading your processor or GPU no longer requires replacing the display, chassis, or battery. Swap logic cores in under four minutes.',
    metrics: [
      { label: 'Socket Retention', value: '10,000+', hint: 'Zero-degradation cycles' },
      { label: 'Memory Standard', value: 'LPDDR5X-CAMM2', hint: 'Swappable modular RAM' },
      { label: 'Thermal Interface', value: 'Liquid Metal Block', hint: 'Non-corrosive sealed seal' },
    ],
    highlight: 'Upgrade CPU/GPU generationally with 80% lower cost than a new laptop.',
  },
  {
    id: 'chassis',
    category: 'Materials & Chassis',
    headline: '100% Reclaimed 7000-Series Aerospace Alloy',
    subtext:
      'Milled from certified circular aluminum collected through EcoLoop’s enterprise intake network. Anodized in deep near-black charcoal with diamond-cut bevels.',
    metrics: [
      { label: 'Recycled Content', value: '100%', hint: 'Traceable alloy feedstock' },
      { label: 'Embodied Carbon', value: '-68%', hint: 'vs virgin smelted chassis' },
      { label: 'Fastener Type', value: 'Torx T5 Uniform', hint: 'Single tool dismantles all' },
    ],
    highlight: 'No glued seams. Zero toxic solvents required during disassembly.',
  },
  {
    id: 'display',
    category: 'Visual & Acoustic',
    headline: '14.2" Ultra-Retina XDR with Modular Ribbon',
    subtext:
      'Individually replaceable display assembly. A reinforced quick-disconnect ribbon cable prevents cracked-hinge repairs from requiring full screen replacement.',
    metrics: [
      { label: 'Peak Brightness', value: '1,600 nits', hint: 'HDR sustained outdoor' },
      { label: 'Color Accuracy', value: '100% DCI-P3', hint: 'Factory calibrated' },
      { label: 'Refresh Rate', value: '120Hz ProMotion', hint: 'Adaptive 10-120Hz' },
    ],
    highlight: 'Acoustic chambers tuned with neodymium drivers for deep spatial presence.',
  },
  {
    id: 'power',
    category: 'Energy & Power',
    headline: '99.6Wh Swappable Cell Pack with Smart BMS',
    subtext:
      'High-energy density battery cells with individual impedance telemetry. Replace degraded cells in 60 seconds with our click-release mechanical tray.',
    metrics: [
      { label: 'Runtime', value: '22 Hours', hint: 'Continuous mixed workflow' },
      { label: 'Fast Charge', value: '50% in 28m', hint: '140W USB-C PD 3.1' },
      { label: 'Health Telemetry', value: 'Per-Cell Bus', hint: 'Real-time state of health' },
    ],
    highlight: 'Degraded battery packs are routed directly to certified closed-loop hydrometallurgy.',
  },
];

export function EngineeringSpecs() {
  const [activeTab, setActiveTab] = useState<string>('silicon');
  const current = SPEC_DETAILS.find((s) => s.id === activeTab) ?? SPEC_DETAILS[0];

  return (
    <section id="specs" className="relative border-t border-white/[0.08] bg-[#050505] py-24 text-white sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(0,80,255,0.06),transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#00D6FF]/30 bg-white/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#00D6FF]">
              <Sparkles className="h-3.5 w-3.5" />
              Flagship Technical Matrix
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Engineered to lead.{' '}
              <span className="text-gradient-cyan block sm:inline">Built to last.</span>
            </h2>
            <p className="mt-3 text-base text-white/60">
              Explore the four architectural pillars that redefine luxury computing through
              uncompromising circularity.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button to="/sell" variant="glow" size="sm">
              Trade In Your Laptop
            </Button>
          </div>
        </div>

        {/* Category Tabs */}
        <div
          role="tablist"
          aria-label="Engineering specifications tabs"
          className="mt-12 flex flex-wrap gap-2 border-b border-white/[0.08] pb-4"
        >
          {SPEC_DETAILS.map((spec) => {
            const isActive = activeTab === spec.id;
            return (
              <button
                key={spec.id}
                role="tab"
                aria-selected={isActive}
                type="button"
                onClick={() => setActiveTab(spec.id)}
                className={`cursor-pointer rounded-xl px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00D6FF] sm:text-sm ${
                  isActive
                    ? 'border border-[#00D6FF]/40 bg-[#0A0A0C] text-white shadow-[0_0_20px_-5px_rgba(0,214,255,0.3)]'
                    : 'border border-transparent text-white/50 hover:border-white/10 hover:text-white/80'
                }`}
              >
                {spec.category}
              </button>
            );
          })}
        </div>

        {/* Active Spec Showcase Card */}
        <div className="glass-dark mt-8 rounded-3xl border border-white/[0.09] p-8 sm:p-12">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="text-xs font-mono uppercase tracking-widest text-[#00D6FF]">
                {current.category}
              </span>
              <h3 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {current.headline}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">
                {current.subtext}
              </p>

              <div className="mt-6 rounded-2xl border border-[#20C878]/25 bg-[#20C878]/5 p-4 text-xs font-medium text-white/85 sm:text-sm">
                <span className="font-semibold text-[#20C878]">Circularity Breakthrough: </span>
                {current.highlight}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:col-span-5">
              {current.metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-2xl border border-white/8 bg-white/[0.03] p-5 backdrop-blur-md"
                >
                  <span className="text-[11px] font-medium uppercase tracking-wider text-white/45">
                    {m.label}
                  </span>
                  <p className="mt-2 text-2xl font-extrabold tracking-tight text-white">
                    {m.value}
                  </p>
                  <p className="mt-1 text-xs text-white/50">{m.hint}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4-Pillar Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="glass-dark rounded-2xl border border-white/8 p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#00D6FF]/30 bg-[#00D6FF]/10 text-[#00D6FF]">
              <Cpu className="h-5 w-5" />
            </div>
            <h4 className="mt-4 text-base font-bold text-white">Modular Motherboard</h4>
            <p className="mt-2 text-xs leading-relaxed text-white/60">
              Replaceable logic board standard. Swap components individually instead of discarding
              functional displays.
            </p>
          </div>

          <div className="glass-dark rounded-2xl border border-white/8 p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#20C878]/30 bg-[#20C878]/10 text-[#20C878]">
              <RefreshCw className="h-5 w-5" />
            </div>
            <h4 className="mt-4 text-base font-bold text-white">100% Recycled Cobalt</h4>
            <p className="mt-2 text-xs leading-relaxed text-white/60">
              Recovered through closed-loop hydrometallurgical recycling, preventing environmental
              degradation.
            </p>
          </div>

          <div className="glass-dark rounded-2xl border border-white/8 p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E8C46A]/30 bg-[#E8C46A]/10 text-[#E8C46A]">
              <Wrench className="h-5 w-5" />
            </div>
            <h4 className="mt-4 text-base font-bold text-white">9.8/10 Repairability</h4>
            <p className="mt-2 text-xs leading-relaxed text-white/60">
              Standard fasteners, transparent repair manuals, and QR diagnostic codes on every internal module.
            </p>
          </div>

          <div className="glass-dark rounded-2xl border border-white/8 p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#0050FF]/40 bg-[#0050FF]/15 text-[#00D6FF]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h4 className="mt-4 text-base font-bold text-white">Hardware Audit Trail</h4>
            <p className="mt-2 text-xs leading-relaxed text-white/60">
              Cryptographically signed component manifests verify origin, service history, and
              certified recycling path.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
