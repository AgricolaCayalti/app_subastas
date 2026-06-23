import { create } from 'zustand';

export interface ProductDetail {
    id: number;
    cantidadKg: string;
    descripcion: string;
    idProducto: number;
    importeTotal: string;
    precioBaseKg: string;
}

interface UseProductsDetailsStore {
    data: ProductDetail[];
    isLoading: boolean;
    error: string | null;
    setData: (data: ProductDetail[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    reset: () => void;
}

export const useProductsDetailsStore = create<UseProductsDetailsStore>((set) => ({
    data: [],
    isLoading: false,
    error: null,
    setData: (data) => set({ data: data, error: null }),
    setLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error }),
    reset: () => set({ data: [], isLoading: false, error: null }),
}));