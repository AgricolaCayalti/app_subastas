import { create } from 'zustand';

interface UseForgotPasswordStore {
    step: 0 | 1 | 2;
    email: string;
    expiredAt: number | null;
    isLoading: boolean;
    setStep: (step: 0 | 1 | 2, expiredAt?: number) => void;
    setLoading: (loading: boolean) => void;
    setEmail: (email: string) => void;
}

export const useForgotPasswordStore = create<UseForgotPasswordStore>((set) => ({
    step: 0,
    email: "",
    expiredAt: null,
    isLoading: false,
    setLoading: (loading) => set({ isLoading: loading }),
    setStep: (step, expiredAt) => set({ step, expiredAt }),
    setEmail: (email) => set({ email }),
}));