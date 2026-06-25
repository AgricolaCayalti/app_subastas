// store/usePasswordChangeStore.ts
import { create } from 'zustand';
import { ProductOffers } from '../pages/ProductList/types';

interface UseProductsOffersStore {
    data: ProductOffers[],
    selected: ProductOffers | null,
    isLoading: boolean;
    setData: (data: ProductOffers[]) => void;
    setLoading: (loading: boolean) => void;
    setSelected: (selected: ProductOffers | null) => void;
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