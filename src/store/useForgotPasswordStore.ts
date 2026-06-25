import { create } from 'zustand';

interface UseForgotPasswordStore {
    step: 0 | 1 | 2;
    isLoading: boolean;
    error: string | null;
    setStep: (step: 0 | 1 | 2) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
}

export const useForgotPasswordStore = create<UseForgotPasswordStore>((set) => ({
    step: 0,
    isLoading: false,
    error: null,
    setLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error }),
    setStep: (step) => set({ step }),
}));