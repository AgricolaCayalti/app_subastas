
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
    user: any | null;
    token: string | null;
    expiresAt: number | null;
    authenticated: boolean;
    login: (user: any, token: string, expiresAt: number) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            expiresAt: null,
            authenticated: false,
            login: (user, token, expiresAt) => set({ user, token, expiresAt, authenticated: true }),
            logout: () => set({ user: null, token: null, expiresAt: null, authenticated: false }),
        }),
        { name: 'auth-storage' } // persiste en localStorage automáticamente
    )
);