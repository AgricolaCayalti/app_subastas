import { create } from 'zustand';
import { persist/* , createJSONStorage */ } from 'zustand/middleware';

type step = 0 | 1 | 2;

interface UseForgotPasswordStore {
    step: step;
    email: string;
    code: string;
    expiredAt: number | null;
    isLoading: boolean;
    setStep: (step: step) => void;
    setLoading: (loading: boolean) => void;
    setEmail: (email: string, expiredAt?: number) => void;
    setCode: (code: string) => void;
    clear: () => void;
}

export const useForgotPasswordStore = create<UseForgotPasswordStore>()(
    persist(
        (set) => ({
            step: 0,
            email: "",
            code: "",
            expiredAt: null,
            isLoading: false,
            setLoading: (loading) => set({ isLoading: loading }),
            setStep: (step) => set({ step }),
            setEmail: (email, expiredAt) => set({ email, expiredAt }),
            setCode: (code) => set({ code }),
            clear: () => set({ step: 0, email: "", code: "", expiredAt: null, isLoading: false })
        }),
        {
            name: 'forgot-password-storage'
        }
    )
);