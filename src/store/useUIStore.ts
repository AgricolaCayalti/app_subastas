import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIStore {
    lang: string;
    isAcceptedTYC: boolean;
    setLanguage: () => void;
    toggleCheck: () => void;
}

const SESSION_LANG_NAME = import.meta.env.VITE_SESSION_LANG_NAME;

export const useUIStore = create<UIStore>()(
    persist(
        (set, get) => ({
            lang: "ES",
            isAcceptedTYC: false,
            setLanguage: () => {
                const currentLang = get().lang;
                const newLang = currentLang === 'EN' ? 'ES' : 'EN';
                set({ lang: newLang });
            },
            toggleCheck: () => {
                const currentCheck = get().isAcceptedTYC;
                set({ isAcceptedTYC: !currentCheck });
            }
        }),
        {
            name: SESSION_LANG_NAME,
            partialize: (state) => ({ lang: state.lang }),
        }
    )
);