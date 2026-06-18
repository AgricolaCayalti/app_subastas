import { useDispatch, useSelector } from "react-redux";
import { setLanguage, activateAcceptedTYC } from "../store/ui/uiSlice";

export const useUI = () => {
    const dispatch = useDispatch();
    const { strings, lang, isAcceptedTYC } = useSelector(state=>state.ui);
    const onSetLanguage = () => dispatch(setLanguage(lang === "EN" ? "ES": "EN"));

    const onActivateAcceptedTYC = () => {
        return dispatch(activateAcceptedTYC());
    };

    return {
        //* Propiedades
        strings,
        language: lang,
        onSetLanguage,
        isAcceptedTYC,
        onActivateAcceptedTYC
    }
}