import { Headphones, Laptop, Leaf, Smartphone } from 'lucide-react';
import type { DemoProduct } from '../../types/home';
import { Button } from '../common/Button';

interface ProductCardProps {
  product: DemoProduct;
  onInspect: (productId: string) => void;
}

const CATEGORY_ICON_MAP = {
  Laptops: Laptop,
  Phones: Smartphone,
  Accessories: Headphones,
} as const;

export function ProductCard({ product, onInspect }: ProductCardProps) {
  const CategoryIcon = CATEGORY_ICON_MAP[product.category];

  return (
    <article className="glass-dark group flex flex-col justify-between rounded-3xl border border-white/[0.08] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#00D6FF]/40 hover:bg-[#0A0A0C]/90 hover:shadow-[0_0_30px_-5px_rgba(0,214,255,0.15)]">
      <div>
        <div className="relative flex h-44 items-center justify-center overflow-hidden rounded-2xl border border-white/8 bg-[#050505] p-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[#00D6FF] transition-transform duration-300 group-hover:scale-110 group-hover:text-[#20C878]">
            <CategoryIcon className="h-8 w-8" />
          </div>

          <span className="absolute left-3.5 top-3.5 rounded-full border border-[#E8C46A]/30 bg-[#E8C46A]/10 px-2.5 py-0.5 text-[11px] font-semibold text-[#E8C46A]">
            Demo Item
          </span>

          <span className="absolute right-3.5 top-3.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] font-medium text-[#20C878]">
            {product.conditionGrade}
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between gap-2 text-xs font-medium text-white/50">
          <span>{product.category}</span>
          <span className="inline-flex items-center gap-1 text-[#20C878]">
            <Leaf className="h-3.5 w-3.5" />
            {product.co2SavedLabel}
          </span>
        </div>

        <h3 className="mt-2 text-lg font-bold tracking-tight text-white group-hover:text-[#00D6FF] transition-colors">
          {product.name}
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-white/60">{product.specs}</p>
      </div>

      <div className="mt-6 border-t border-white/[0.08] pt-4">
        <div className="flex items-baseline justify-between gap-2">
          <div>
            <span className="text-xl font-extrabold text-white">
              {product.demoPriceLabel}
            </span>
            <span className="ml-1.5 text-[11px] font-mono uppercase tracking-wide text-white/40">
              Demo Price
            </span>
          </div>
          <span className="text-[11px] text-white/45">{product.warrantyNote}</span>
        </div>

        <Button
          type="button"
          onClick={() => onInspect(product.id)}
          variant="glass"
          size="sm"
          className="mt-4 w-full text-xs"
        >
          Inspect Demo Specs
        </Button>
      </div>
    </article>
  );
}
