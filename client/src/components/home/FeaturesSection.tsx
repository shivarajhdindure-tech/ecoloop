import { motion } from 'framer-motion';
import {
  Cpu,
  Recycle,
  ShieldCheck,
  ShoppingBag,
  Truck,
  Wallet,
  type LucideIcon,
} from 'lucide-react';
import { PLATFORM_FEATURES } from '../../features/home/homeData';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';
import type { FeatureIconKey } from '../../types/home';

const FEATURE_ICON_MAP: Record<FeatureIconKey, LucideIcon> = {
  valuation: Cpu,
  pickup: Truck,
  refurbish: ShieldCheck,
  recycle: Recycle,
  wallet: Wallet,
  marketplace: ShoppingBag,
};

export function FeaturesSection() {
  const reducedMotion = useReducedMotionPreference();

  return (
    <section
      id="features"
      className="relative border-t border-white/[0.08] bg-[#050505] py-24 text-white sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(0,80,255,0.05),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#00D6FF]">
            Platform Infrastructure
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            End-to-end architecture for{' '}
            <span className="text-gradient-cyan">hardware circularity</span>
          </h2>
          <p className="mt-3 text-base leading-relaxed text-white/60">
            Every layer inside EcoLoop balances fair device valuation, verified chain of custody,
            and environmentally compliant material reclamation.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PLATFORM_FEATURES.map((feature, index) => {
            const Icon = FEATURE_ICON_MAP[feature.icon];
            const isGold = feature.accent === 'gold';

            return (
              <motion.article
                key={feature.id}
                initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: reducedMotion ? 0 : index * 0.05 }}
                className="glass-dark group rounded-3xl border border-white/[0.08] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#00D6FF]/40 hover:bg-[#0A0A0C]/90 hover:shadow-[0_0_25px_-5px_rgba(0,214,255,0.12)]"
              >
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl border transition-colors ${
                    isGold
                      ? 'border-[#E8C46A]/30 bg-[#E8C46A]/10 text-[#E8C46A] group-hover:border-[#E8C46A]/60'
                      : 'border-[#00D6FF]/30 bg-[#0050FF]/15 text-[#00D6FF] group-hover:border-[#00D6FF]/60'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="mt-6 text-lg font-bold tracking-tight text-white">
                  {feature.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-white/65">
                  {feature.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
