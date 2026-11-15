import { Mail, MapPin, PhoneCall } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BRAND_INFO } from '../../features/home/homeData';
import { BrandLogo } from './BrandLogo';

export function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const navigateToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
      return;
    }

    const target = document.getElementById(sectionId);
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer className="border-t border-white/[0.08] bg-[#050505] text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-5 lg:col-span-1">
            <BrandLogo showTagline />
            <p className="text-xs leading-relaxed text-white/55">
              {BRAND_INFO.description}
            </p>
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-[#00D6FF]">
              Circular Computing Standard
            </span>
          </div>

          <div>
            <h2 className="text-xs font-mono font-semibold uppercase tracking-widest text-white/40">
              Hardware
            </h2>
            <ul className="mt-5 space-y-3 text-xs text-white/60">
              <li>
                <button
                  type="button"
                  onClick={() => navigateToSection('hero')}
                  className="cursor-pointer transition-colors hover:text-white"
                >
                  EcoBook Precision
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateToSection('specs')}
                  className="cursor-pointer transition-colors hover:text-white"
                >
                  Technical Specifications
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateToSection('architecture')}
                  className="cursor-pointer transition-colors hover:text-white"
                >
                  Modular Architecture
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateToSection('marketplace')}
                  className="cursor-pointer transition-colors hover:text-white"
                >
                  Refurbished Marketplace
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-mono font-semibold uppercase tracking-widest text-white/40">
              Circularity Platform
            </h2>
            <ul className="mt-5 space-y-3 text-xs text-white/60">
              <li>
                <Link to="/sell" className="transition-colors hover:text-white">
                  Sell Your E-Waste (Intake Preview)
                </Link>
              </li>
              <li>
                <Link to="/partner-apply" className="transition-colors hover:text-white">
                  Partner Onboarding (Recyclers &amp; Refurbishers)
                </Link>
              </li>
              <li>
                <Link to="/auth/signin" className="transition-colors hover:text-white">
                  Member Portal (Upcoming)
                </Link>
              </li>
              <li>
                <Link to="/auth/get-started" className="transition-colors hover:text-white">
                  Create Account (Upcoming)
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-mono font-semibold uppercase tracking-widest text-white/40">
              Hardware Lab &amp; Support
            </h2>
            <ul className="mt-5 space-y-3 text-xs text-white/60">
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#00D6FF]" />
                <span>precision@ecoloop.example</span>
              </li>
              <li className="flex items-start gap-2.5">
                <PhoneCall className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#00D6FF]" />
                <span>+1 (800) 010-LOOP (Support Placeholder)</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#E8C46A]" />
                <span>Circular Engineering Lab · Global Hub 01</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/[0.08] pt-8 text-xs text-white/40 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} EcoLoop Inc. Precision Circular Hardware &amp; E-Waste Network.</p>
          <p>
            Apple-inspired Scrollytelling Experience · 118-Frame Image Sequence Architecture.
          </p>
        </div>
      </div>
    </footer>
  );
}
