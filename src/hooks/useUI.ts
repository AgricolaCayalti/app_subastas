import { useUIStore } from '../store/useUIStore';
import Cadenas from '../data/cadenas';

export const useUI = () => {
    const { lang, isAcceptedTYC, setLanguage, toggleCheck } = useUIStore();
    const strings = Cadenas[lang as keyof typeof Cadenas];
    const languages = ["ES", "EN"];

    const onSetLanguage = () => setLanguage();
    const onToggleCheck = () => {
        toggleCheck();
    };
    return {
        strings,
        language: lang,
        onSetLanguage,
        isAcceptedTYC,
        onToggleCheck,
        languages
    };
};
