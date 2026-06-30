import { create } from 'zustand';
import { ProductOffersActive } from '@/components/ProductOffers/types';

interface UseProductsOffersStore {
    selected: ProductOffersActive | null,
    data: ProductOffersActive[],
    isLoading: boolean;
    setData: (data: ProductOffersActive[]) => void;
    setLoading: (loading: boolean) => void;
    setSelected: (selected: ProductOffersActive | null) => void;
    reset: () => void;
}

export const useProductsOffersStore = create<UseProductsOffersStore>((set) => ({
    data: [],
    selected: null,
    isLoading: false,
    setData: (data) => set({ data: data }),
    setLoading: (loading) => set({ isLoading: loading }),
    setSelected: (selected) => set({ selected }),
    reset: () => set({ data: [], isLoading: false }),
}));