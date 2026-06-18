import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIStore {
    lang: string;
    isAcceptedTYC: boolean;
    setLanguage: () => void;
    activateAcceptedTYC: () => void;
}

const SESSION_LANG_NAME = import.meta.env.VITE_SESSION_LANG_NAME;
const DEFAULT_LANG = import.meta.env.VITE_LANGUAGE_DEFAULT || 'EN';

export const useUIStore = create<UIStore>()(
    persist(
        (set, get) => ({
            lang: DEFAULT_LANG,
            isAcceptedTYC: false,
            setLanguage: () => {
                const currentLang = get().lang;
                const newLang = currentLang === 'EN' ? 'ES' : 'EN';
                set({ lang: newLang });
            },
            activateAcceptedTYC: () => {
                set({ isAcceptedTYC: true });
            },
        }),
        {
            name: SESSION_LANG_NAME,
            partialize: (state) => ({ lang: state.lang }),
        }
    )
);