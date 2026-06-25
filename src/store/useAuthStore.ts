
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
    user: any | null;
    token: string | null;
    expiresAt: number | null;
    authenticated: boolean;
    isLoading: boolean;
    error: string | null;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    login: (user: any, token: string, expiresAt: number) => void;
    logout: () => void;
    verifySession: () => boolean;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            expiresAt: null,
            authenticated: false,
            isLoading: false,
            error: null,
            setLoading: (loading: boolean) => set({ isLoading: loading }),
            setError: (error: string | null) => set({ error }),
            login: (user: any, token: string, expiresAt: number) => set({ user, token, expiresAt, authenticated: true }),
            logout: () => set({ user: null, token: null, expiresAt: null, authenticated: false }),
            verifySession: () => {
                const { logout, token, expiresAt } = get();
                const now = new Date().getTime();
                if (!token || !expiresAt || now >= expiresAt) {
                    logout();
                    return false;
                }
                return true;
            },
        }),
        { name: 'auth-storage' }
    )
);