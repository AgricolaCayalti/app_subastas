import { useUIStore } from '../store/useUIStore';
import Cadenas from '../data/cadenas';

export const useUI = () => {
    const { lang, isAcceptedTYC, setLanguage, activateAcceptedTYC } = useUIStore();
    const strings = Cadenas[lang as keyof typeof Cadenas];
    const languages = ["ES", "EN"];

    const onSetLanguage = () => setLanguage();
    const onActivateAcceptedTYC = () => {
        activateAcceptedTYC();
    };
    return {
        strings,
        language: lang,
        onSetLanguage,
        isAcceptedTYC,
        onActivateAcceptedTYC,
        languages
    };
};
