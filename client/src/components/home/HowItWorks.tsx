import { motion } from 'framer-motion';
import { CalendarCheck2, ClipboardList, Coins } from 'lucide-react';
import { HOW_IT_WORKS_STEPS } from '../../features/home/homeData';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';

const STEP_ICONS = [ClipboardList, CalendarCheck2, Coins] as const;

export function HowItWorks() {
  const reducedMotion = useReducedMotionPreference();

  return (
    <section
      id="how-it-works"
      className="relative border-t border-white/[0.08] bg-[#050505] py-24 text-white sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(0,214,255,0.04),transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#00D6FF]">
            Platform Process
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Three deliberate steps.{' '}
            <span className="text-gradient-cyan block sm:inline">Zero e-waste.</span>
          </h2>
          <p className="mt-3 text-base leading-relaxed text-white/60">
            Designed to make responsible device resale, component recovery, and certified circular
            upgrading as effortless as everyday consumer electronics.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {HOW_IT_WORKS_STEPS.map((step, index) => {
            const StepIcon = STEP_ICONS[index] ?? ClipboardList;

            return (
              <motion.article
                key={step.stepNumber}
                initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.4, delay: reducedMotion ? 0 : index * 0.08 }}
                className="glass-dark group relative flex flex-col justify-between rounded-3xl border border-white/[0.08] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#00D6FF]/40 hover:shadow-[0_0_30px_-5px_rgba(0,214,255,0.15)]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[#00D6FF] transition-colors group-hover:border-[#00D6FF]/40 group-hover:bg-[#0050FF]/20">
                      <StepIcon className="h-5 w-5" />
                    </span>
                    <span className="text-xs font-mono font-bold tracking-widest text-white/30">
                      STEP {step.stepNumber}
                    </span>
                  </div>

                  <h3 className="mt-7 text-xl font-bold tracking-tight text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">
                    {step.description}
                  </p>
                </div>

                <div className="mt-8 border-t border-white/[0.08] pt-4">
                  <span className="inline-flex items-center gap-2 text-xs font-medium text-white/70">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#20C878]" />
                    {step.highlight}
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
