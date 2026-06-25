import { create } from 'zustand';

interface UseForgotPasswordStore {
    step: 0 | 1 | 2;
    email: string;
    expiredAt: number | null;
    isLoading: boolean;
    error: string | null;
    setStep: (step: 0 | 1 | 2, expiredAt?: number) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setEmail: (email: string) => void;
}

export const useForgotPasswordStore = create<UseForgotPasswordStore>((set) => ({
    step: 0,
    email: "",
    expiredAt: null,
    isLoading: false,
    error: null,
    setLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error }),
    setStep: (step, expiredAt) => set({ step, expiredAt }),
    setEmail: (email) => set({ email }),
}));