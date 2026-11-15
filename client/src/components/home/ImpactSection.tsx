import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';
import { ILLUSTRATIVE_IMPACT_METRICS } from '../../features/home/homeData';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';

export function ImpactSection() {
  const reducedMotion = useReducedMotionPreference();

  return (
    <section
      id="impact"
      className="relative border-t border-white/[0.08] bg-[#050505] py-24 text-white sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,rgba(32,200,120,0.05),transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#20C878]">
              <BarChart3 className="h-3.5 w-3.5" />
              Circular Impact Projections
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Measurable sustainability.{' '}
              <span className="text-gradient-cyan block sm:inline">
                Elemental recovery.
              </span>
            </h2>
            <p className="mt-3 text-base leading-relaxed text-white/60">
              Extending the functional lifespan of laptops and personal electronics cuts
              high-energy virgin mineral extraction and eliminates toxic heavy metal landfill
              contamination.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-2.5 text-xs font-medium text-white/60">
            <strong className="font-semibold text-white">Audited Projections:</strong> Metrics
            represent platform modeling goals, not live enterprise production counts.
          </div>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ILLUSTRATIVE_IMPACT_METRICS.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.35, delay: reducedMotion ? 0 : index * 0.06 }}
              className="glass-dark flex flex-col justify-between rounded-3xl border border-white/[0.08] p-7 transition-all duration-300 hover:border-[#00D6FF]/40"
            >
              <div>
                <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] font-semibold text-white/70">
                  {metric.sampleTag}
                </span>
                <p className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                  {metric.value}
                </p>
                <h3 className="mt-2 text-sm font-bold text-[#00D6FF]">{metric.label}</h3>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-white/50">{metric.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
