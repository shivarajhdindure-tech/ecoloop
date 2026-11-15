import { ArrowLeft, CalendarClock, Shield } from 'lucide-react';
import { Button } from '../components/common/Button';
import { MainLayout } from '../layouts/MainLayout';

interface UpcomingModulePageProps {
  badge: string;
  title: string;
  description: string;
  plannedCapabilities: string[];
}

export function UpcomingModulePage({
  badge,
  title,
  description,
  plannedCapabilities,
}: UpcomingModulePageProps) {
  return (
    <MainLayout>
      <section className="relative min-h-[80vh] bg-[#050505] py-28 text-white sm:py-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(0,80,255,0.08),transparent_60%)]" />

        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="glass-dark rounded-3xl border border-white/[0.09] p-8 sm:p-12">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#00D6FF]/35 bg-[#00D6FF]/10 px-3.5 py-1 text-xs font-semibold text-[#00D6FF]">
              <CalendarClock className="h-3.5 w-3.5" />
              {badge}
            </span>

            <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {title}
            </h1>
            <p className="mt-3 text-base leading-relaxed text-white/70">{description}</p>

            <div className="mt-8 rounded-2xl border border-white/8 bg-[#050505]/70 p-6">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#00D6FF]">
                <Shield className="h-4 w-4 text-[#00D6FF]" />
                Scheduled Platform Milestone
              </div>
              <ul className="mt-4 space-y-2.5 text-sm text-white/80">
                {plannedCapabilities.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00D6FF]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 flex flex-wrap gap-3.5">
              <Button to="/" variant="glow" size="md">
                <ArrowLeft className="h-4 w-4" />
                Back to Homepage
              </Button>
              <Button to="/#marketplace" variant="glass" size="md">
                View Refurbished Marketplace
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
