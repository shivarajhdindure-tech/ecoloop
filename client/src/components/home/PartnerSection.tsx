import { ArrowRight, Building2, Check, UserCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { AUDIENCE_SIDES } from '../../features/home/homeData';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';
import { Button } from '../common/Button';

export function PartnerSection() {
  const reducedMotion = useReducedMotionPreference();

  return (
    <section
      id="ecosystem"
      className="relative border-t border-white/[0.08] bg-[#050505] py-24 text-white sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(0,80,255,0.06),transparent_55%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#00D6FF]">
            Dual-Sided Ecosystem
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Built for device owners.{' '}
            <span className="text-gradient-cyan block sm:inline">
              Scaled for recyclers.
            </span>
          </h2>
          <p className="mt-3 text-base leading-relaxed text-white/60">
            EcoLoop bridges consumer convenience with structured B2B recovery pipelines for
            collectors, refurbishment facilities, and authorized metal refiners.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {AUDIENCE_SIDES.map((side, index) => {
            const isPartner = side.id === 'partners';
            const AudienceIcon = isPartner ? Building2 : UserCheck;

            return (
              <motion.div
                key={side.id}
                initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.4, delay: reducedMotion ? 0 : index * 0.1 }}
                className="glass-dark flex flex-col justify-between rounded-3xl border border-white/[0.08] p-8 transition-colors duration-300 hover:border-white/20 sm:p-10"
              >
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-semibold ${
                        isPartner
                          ? 'border-[#E8C46A]/35 bg-[#E8C46A]/10 text-[#E8C46A]'
                          : 'border-[#00D6FF]/35 bg-[#00D6FF]/10 text-[#00D6FF]'
                      }`}
                    >
                      <AudienceIcon className="h-3.5 w-3.5" />
                      {side.badge}
                    </span>
                  </div>

                  <h3 className="mt-6 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    {side.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">
                    {side.subtitle}
                  </p>

                  <ul className="mt-8 space-y-3.5">
                    {side.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3 text-sm text-white/80">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#00D6FF]/15 text-[#00D6FF]">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-10 border-t border-white/[0.08] pt-6">
                  <Button
                    to={side.ctaPath}
                    variant={isPartner ? 'gold' : 'glow'}
                    size="md"
                  >
                    {side.ctaLabel}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
