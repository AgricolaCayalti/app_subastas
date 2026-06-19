import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
    user: any | null;
    token: string | null;
    expiresAt: number | null;
    loadingLogin: boolean;
    login: (user: any, token: string, expiresAt: number) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            expiresAt: null,
            loadingLogin: false,
            login: (user, token, expiresAt) => set({ user, token, expiresAt }),
            logout: () => set({ user: null, token: null, expiresAt: null }),
        }),
        { name: 'auth-storage' } // persiste en localStorage automáticamente
    )
);