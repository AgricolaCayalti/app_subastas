// store/usePasswordChangeStore.ts
import { create } from 'zustand';

interface UseAuthChangePasswordStore {
    isDialogOpen: boolean;
    isLoading: boolean;
    error: string | null;
    setDialogOpen: (open: boolean) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    reset: () => void;
}

export const useAuthChangePasswordStore = create<UseAuthChangePasswordStore>((set) => ({
    isDialogOpen: false,
    isLoading: false,
    error: null,
    setDialogOpen: (open) => set({ isDialogOpen: open, error: null }),
    setLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error }),
    reset: () => set({ isDialogOpen: false, isLoading: false, error: null }),
}));