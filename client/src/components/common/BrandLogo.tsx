interface BrandLogoProps {
  showTagline?: boolean;
}

export function BrandLogo({ showTagline = false }: BrandLogoProps) {
  return (
    <span className="inline-flex items-center gap-2.5 group">
      <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/12 bg-[#0A0A0C] transition-colors duration-200 group-hover:border-[#00D6FF]/40">
        <svg
          viewBox="0 0 32 32"
          fill="none"
          className="h-4.5 w-4.5 transition-transform duration-300 group-hover:rotate-45"
          aria-hidden="true"
        >
          <path
            d="M16 4.5C10.5 4.5 6 8.3 4.8 13.4"
            stroke="#00D6FF"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path
            d="M27.2 18.6C26 23.7 21.5 27.5 16 27.5C12.2 27.5 8.8 25.6 6.8 22.8"
            stroke="#20C878"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path
            d="M21 5.6L26 9.6L20.4 11.4"
            stroke="#E8C46A"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="16" cy="16" r="3.2" fill="#00D6FF" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[17px] font-bold tracking-tight text-white/95">
          Eco<span className="text-white/60 font-normal">Loop</span>
          <span className="ml-1 text-[10px] font-medium tracking-widest text-[#00D6FF] uppercase">
            Ultra
          </span>
        </span>
        {showTagline && (
          <span className="mt-1 text-[11px] font-medium tracking-wide text-white/50">
            Give electronics a second life.
          </span>
        )}
      </span>
    </span>
  );
}
