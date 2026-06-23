// store/usePasswordChangeStore.ts
import { create } from 'zustand';
import { ProductOffers } from '../pages/ProductList/types';

interface UseProductsOffersStore {
    data: [],
    selected: ProductOffers | null,
    isLoading: boolean;
    error: string | null;
    setData: (data: []) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setSelected: (selected: ProductOffers | null) => void;
    reset: () => void;
}

export const useProductsOffersStore = create<UseProductsOffersStore>((set) => ({
    data: [],
    selected: null,
    isLoading: false,
    error: null,
    setData: (data) => set({ data: data, error: null }),
    setLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error }),
    setSelected: (selected) => set({ selected }),
    reset: () => set({ data: [], isLoading: false, error: null }),
}));