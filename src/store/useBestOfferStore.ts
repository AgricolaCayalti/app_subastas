import { create } from 'zustand';

export interface BestOffers {
    id: number;
    precioOfertado : string;
    fechaHoraOfertado: string;
}

interface UseBestOfferStore {
    data: BestOffers[];
    isLoading: boolean;
    error: string | null;
    setData: (data: BestOffers[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    reset: () => void;
}

export const useBestOfferStore = create<UseBestOfferStore>((set) => ({
    data: [],
    isLoading: false,
    error: null,
    setData: (data) => set({ data: data, error: null }),
    setLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error }),
    reset: () => set({ data: [], isLoading: false, error: null }),
}));