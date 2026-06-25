// store/usePasswordChangeStore.ts
import { ProductOffers } from '@/pages/ProductListClosed/types';
import { create } from 'zustand';

interface UseProductsOffersPassedStore {
    data: ProductOffers[],
    isLoading: boolean;
    setData: (data: ProductOffers[]) => void;
    setLoading: (loading: boolean) => void;
    reset: () => void;
}

export const useProductsOffersPassedStore = create<UseProductsOffersPassedStore>((set) => ({
    data: [],
    isLoading: false,
    setData: (data) => set({ data: data }),
    setLoading: (loading) => set({ isLoading: loading }),
    reset: () => set({ data: [], isLoading: false }),
}));