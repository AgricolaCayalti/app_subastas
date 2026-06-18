import { createSlice } from "@reduxjs/toolkit";
import Cadenas from "../../data/cadenas.ts";
import { loadStorage, saveStorage} from "@/assets/localStorager.js";
const SESSION_LANG_NAME = import.meta.env.VITE_SESSION_LANG_NAME;

const storageLanguage = loadStorage({key: SESSION_LANG_NAME, isJSON: false});
const defaultLanguage = storageLanguage ?? import.meta.env.VITE_LANGUAGE_DEFAULT;

export const uiSlice = createSlice({
   name : 'ui',
   initialState : {
        lang: defaultLanguage,
        strings: Cadenas[defaultLanguage],
        isAcceptedTYC : false
   },
   reducers : {
        setLanguage: ( state, { payload : lang}) => {
            state.lang = lang;
            state.strings = Cadenas[lang]
            saveStorage({key: SESSION_LANG_NAME, data : lang, isJSON : false});
        },
        activateAcceptedTYC: ( state ) => {
            state.isAcceptedTYC = true;
        }
   }
});

export const {
    setLanguage,
    activateAcceptedTYC
} = uiSlice.actions;