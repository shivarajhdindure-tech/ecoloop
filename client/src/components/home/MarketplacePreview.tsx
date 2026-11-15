import { useMemo } from 'react';
import { Info, X } from 'lucide-react';
import {
  DEMO_MARKETPLACE_PRODUCTS,
  MARKETPLACE_CATEGORIES,
} from '../../features/home/homeData';
import { useUIStore } from '../../store/useUIStore';
import { Button } from '../common/Button';
import { ProductCard } from './ProductCard';

export function MarketplacePreview() {
  const {
    selectedMarketplaceCategory,
    setSelectedMarketplaceCategory,
    inspectedDemoProductId,
    setInspectedDemoProductId,
  } = useUIStore();

  const filteredProducts = useMemo(() => {
    if (selectedMarketplaceCategory === 'All') {
      return DEMO_MARKETPLACE_PRODUCTS;
    }
    return DEMO_MARKETPLACE_PRODUCTS.filter(
      (product) => product.category === selectedMarketplaceCategory,
    );
  }, [selectedMarketplaceCategory]);

  const inspectedProduct = useMemo(
    () =>
      DEMO_MARKETPLACE_PRODUCTS.find((product) => product.id === inspectedDemoProductId) ??
      null,
    [inspectedDemoProductId],
  );

  return (
    <section
      id="marketplace"
      className="relative border-t border-white/[0.08] bg-[#050505] py-24 text-white sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(0,80,255,0.06),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E8C46A]/40 bg-[#E8C46A]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#E8C46A]">
              <Info className="h-3.5 w-3.5" />
              Demo Marketplace Catalog
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Certified refurbished electronics.{' '}
              <span className="text-gradient-cyan block sm:inline">
                Graded transparently.
              </span>
            </h2>
            <p className="mt-3 text-base leading-relaxed text-white/60">
              Preview how verified laptops, smartphones, and accessories will appear once partner
              inventory feeds are connected.{' '}
              <strong className="font-semibold text-white/90">
                All listings and prices shown below are demo preview data.
              </strong>
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter demo marketplace products"
            className="flex flex-wrap gap-2"
          >
            {MARKETPLACE_CATEGORIES.map((category) => {
              const isSelected = selectedMarketplaceCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedMarketplaceCategory(category)}
                  className={`cursor-pointer rounded-xl px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00D6FF] sm:text-sm ${
                    isSelected
                      ? 'border border-[#00D6FF]/40 bg-[#0A0A0C] text-white shadow-[0_0_20px_-5px_rgba(0,214,255,0.3)]'
                      : 'border border-white/8 bg-white/[0.02] text-white/50 hover:border-white/20 hover:text-white/80'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onInspect={(id) => setInspectedDemoProductId(id)}
            />
          ))}
        </div>

        <div className="glass-dark mt-12 flex flex-col items-start justify-between gap-4 rounded-3xl border border-white/[0.08] p-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-white">
              Demo Catalog Notice — Live Inventory &amp; Trade-Ins Scheduled for Next Phase
            </p>
            <p className="mt-1 text-xs text-white/50">
              Purchasing, Firebase authentication, and Razorpay checkout will be enabled in
              upcoming milestone phases.
            </p>
          </div>
          <Button to="/marketplace-preview" variant="glass" size="sm">
            Marketplace Roadmap
          </Button>
        </div>
      </div>

      {inspectedProduct && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="demo-product-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]/85 p-4 backdrop-blur-md"
        >
          <div className="glass-dark w-full max-w-md rounded-3xl border border-white/15 bg-[#0A0A0C]/95 p-7 text-white shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="inline-flex rounded-full border border-[#E8C46A]/40 bg-[#E8C46A]/10 px-2.5 py-0.5 text-[11px] font-semibold text-[#E8C46A]">
                  Demo Hardware Profile
                </span>
                <h3
                  id="demo-product-dialog-title"
                  className="mt-2 text-xl font-bold tracking-tight text-white"
                >
                  {inspectedProduct.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setInspectedDemoProductId(null)}
                aria-label="Close demo preview dialog"
                className="cursor-pointer rounded-lg p-1.5 text-white/50 hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <dl className="mt-5 space-y-2.5 rounded-2xl border border-white/8 bg-white/[0.02] p-4 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-white/50">Category</dt>
                <dd className="font-semibold text-white">{inspectedProduct.category}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-white/50">Condition Grade</dt>
                <dd className="font-semibold text-[#20C878]">
                  {inspectedProduct.conditionGrade}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-white/50">Demo Price</dt>
                <dd className="font-bold text-white">
                  {inspectedProduct.demoPriceLabel}{' '}
                  <span className="text-[11px] font-normal text-white/40">(Sample)</span>
                </dd>
              </div>
              <div className="border-t border-white/8 pt-2.5">
                <dt className="text-xs text-white/50">Specifications</dt>
                <dd className="mt-1 text-xs font-medium text-white/80">
                  {inspectedProduct.specs}
                </dd>
              </div>
            </dl>

            <p className="mt-4 text-xs text-white/45">
              Live hardware checkout is disabled during Phase 2 UI development.
            </p>

            <div className="mt-6 flex justify-end">
              <Button
                type="button"
                onClick={() => setInspectedDemoProductId(null)}
                variant="glow"
                size="sm"
              >
                Close Profile
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
