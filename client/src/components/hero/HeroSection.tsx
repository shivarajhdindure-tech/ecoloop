import { Suspense, lazy } from 'react';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { HERO_CONTENT } from '../../features/home/homeData';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';
import { Button } from '../common/Button';

const EWasteScene = lazy(() => import('./EWasteScene'));

function SceneLoadingSkeleton() {
  return (
    <div className="glass-dark flex h-full w-full items-center justify-center rounded-3xl">
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="h-10 w-10 animate-pulse rounded-full border border-[#20C878]/50 bg-[#20C878]/20" />
        <p className="text-xs font-medium text-[#B9F27C]/85">Loading 3D Circular Scene...</p>
      </div>
    </div>
  );
}

export function HeroSection() {
  const reducedMotion = useReducedMotionPreference();

  const scrollToMarketplace = () => {
    const el = document.getElementById(HERO_CONTENT.secondaryCta.sectionId);
    el?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[#071C15] text-[#F2F5EF]"
    >
      {/* Subtle layered forest ambiance without busy multi-color gradients */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(16,61,43,0.75),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(32,200,120,0.12),transparent_48%)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:py-20">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="flex flex-col items-start lg:col-span-6"
        >
          <span className="glass-dark inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium tracking-wide text-[#B9F27C]">
            <Sparkles className="h-3.5 w-3.5 text-[#E8C46A]" />
            {HERO_CONTENT.eyebrow}
          </span>

          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-[#F2F5EF] sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08]">
            Don&apos;t discard it.{' '}
            <span className="text-[#20C878]">Reimagine it.</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-[#F2F5EF]/80 sm:text-lg">
            {HERO_CONTENT.description}
          </p>

          <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-[#F2F5EF]/65">
            Give electronics a second life by connecting seamlessly with verified collectors,
            refurbishers, and authorized recyclers.
          </p>

          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button to={HERO_CONTENT.primaryCta.to} variant="primary" size="lg">
              {HERO_CONTENT.primaryCta.label}
              <ArrowRight className="h-4 w-4" />
            </Button>

            <Button
              type="button"
              onClick={scrollToMarketplace}
              variant="secondary"
              size="lg"
            >
              {HERO_CONTENT.secondaryCta.label}
            </Button>
          </div>

          <ul className="mt-9 grid w-full gap-2.5 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {HERO_CONTENT.highlights.map((item) => (
              <li
                key={item}
                className="glass-dark flex items-start gap-2 rounded-xl px-3.5 py-2.5 text-xs font-medium text-[#F2F5EF]/85"
              >
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#20C878]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.1, ease: 'easeOut' }}
          className="h-[360px] w-full sm:h-[440px] lg:col-span-6 lg:h-[540px]"
        >
          <Suspense fallback={<SceneLoadingSkeleton />}>
            <EWasteScene />
          </Suspense>
        </motion.div>
      </div>
    </section>
  );
}
