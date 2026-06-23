import { create } from 'zustand';

interface MyOffers {
    id: number;
    isFromUser: boolean;
    precioOfertado: string;
    fechaHoraOfertado: string;
}

interface UseMyOffersStore {
    data: MyOffers[];
    isLoading: boolean;
    error: string | null;
    setData: (data: MyOffers[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    reset: () => void;
}

export const useMyOffersStore = create<UseMyOffersStore>((set) => ({
    data: [],
    isLoading: false,
    error: null,
    setData: (data) => set({ data: data, error: null }),
    setLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error }),
    reset: () => set({ data: [], isLoading: false, error: null }),
}));