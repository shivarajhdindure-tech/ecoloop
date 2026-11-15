import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUIStore } from '../../store/useUIStore';
import { BrandLogo } from './BrandLogo';
import { Button } from './Button';

interface NavItem {
  label: string;
  sectionId: string;
}

const PRODUCT_NAV_ITEMS: readonly NavItem[] = [
  { label: 'Overview', sectionId: 'hero' },
  { label: 'Architecture', sectionId: 'architecture' },
  { label: 'Engineering', sectionId: 'engineering' },
  { label: 'Specs', sectionId: 'specs' },
  { label: 'Marketplace', sectionId: 'marketplace' },
  { label: 'Circularity', sectionId: 'impact' },
];

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isMobileMenuOpen, toggleMobileMenu, setMobileMenuOpen } = useUIStore();
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 25);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, location.hash, setMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMobileMenuOpen, setMobileMenuOpen]);

  const handleSectionLink = (sectionId: string) => {
    setMobileMenuOpen(false);

    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
      return;
    }

    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        hasScrolled
          ? 'bg-[#050505]/75 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav
        aria-label="Primary product navigation"
        className="mx-auto flex h-13 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        {/* Left: Brand Logo / Product Name */}
        <Link
          to="/"
          onClick={() => handleSectionLink('hero')}
          className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D6FF]"
          aria-label="EcoLoop home"
        >
          <BrandLogo />
        </Link>

        {/* Center: Apple-style Minimalist Nav Links */}
        <ul className="hidden items-center gap-7 md:flex">
          {PRODUCT_NAV_ITEMS.map((item) => (
            <li key={item.sectionId}>
              <button
                type="button"
                onClick={() => handleSectionLink(item.sectionId)}
                className="cursor-pointer text-xs font-medium tracking-wide text-white/60 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00D6FF]"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Right: Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <Button
            to="/sell"
            variant="ghostDark"
            size="sm"
            className="text-xs text-white/70 hover:text-white"
          >
            Sell Device
          </Button>

          <Button
            type="button"
            onClick={() => handleSectionLink('specs')}
            variant="glow"
            size="sm"
            className="text-xs tracking-wide"
          >
            Experience EcoBook
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation-drawer"
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/90 transition-colors hover:border-white/25 md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D6FF]"
        >
          {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="border-b border-white/10 bg-[#050505]/95 px-6 pb-6 pt-3 backdrop-blur-2xl md:hidden"
        >
          <ul className="flex flex-col divide-y divide-white/5">
            {PRODUCT_NAV_ITEMS.map((item) => (
              <li key={item.sectionId}>
                <button
                  type="button"
                  onClick={() => handleSectionLink(item.sectionId)}
                  className="w-full cursor-pointer py-3 text-left text-sm font-medium text-white/80 transition-colors hover:text-[#00D6FF]"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-col gap-2.5 pt-2">
            <Button
              to="/sell"
              variant="secondary"
              size="md"
              className="w-full text-center"
            >
              Sell Your E-Waste
            </Button>
            <Button
              type="button"
              onClick={() => handleSectionLink('specs')}
              variant="glow"
              size="md"
              className="w-full text-center"
            >
              Experience EcoBook
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
