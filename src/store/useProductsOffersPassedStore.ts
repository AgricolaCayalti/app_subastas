// store/usePasswordChangeStore.ts
import { create } from 'zustand';

interface UseProductsOffersPassedStore {
    data: [],
    isLoading: boolean;
    error: string | null;
    setData: (data: []) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    reset: () => void;
}

export const useProductsOffersPassedStore = create<UseProductsOffersPassedStore>((set) => ({
    data: [],
    isLoading: false,
    error: null,
    setData: (data) => set({ data: data, error: null }),
    setLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error }),
    reset: () => set({ data: [], isLoading: false, error: null }),
}));