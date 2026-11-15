import { create } from 'zustand';
import type { MarketplaceCategory } from '../types/home';

interface UIState {
  isMobileMenuOpen: boolean;
  selectedMarketplaceCategory: MarketplaceCategory;
  inspectedDemoProductId: string | null;
  setMobileMenuOpen: (isOpen: boolean) => void;
  toggleMobileMenu: () => void;
  setSelectedMarketplaceCategory: (category: MarketplaceCategory) => void;
  setInspectedDemoProductId: (productId: string | null) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMobileMenuOpen: false,
  selectedMarketplaceCategory: 'All',
  inspectedDemoProductId: null,
  setMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  setSelectedMarketplaceCategory: (category) =>
    set({ selectedMarketplaceCategory: category }),
  setInspectedDemoProductId: (productId) => set({ inspectedDemoProductId: productId }),
}));
