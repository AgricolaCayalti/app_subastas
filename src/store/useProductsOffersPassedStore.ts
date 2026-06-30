import { create } from 'zustand';
import { ProductOffers } from '@/components/ProductOffers/types';

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