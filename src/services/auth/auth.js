import axios, { axiosPrivate } from "../../api/axios";
import {apiRequest, apiRequestPrivate} from "@/api/apiRequest.js";

const APP_KEY = import.meta.env.VITE_APP_KEY;

export const logIn = async ({username, password}, signal ) => {
    return apiRequest({
        url: `sesion/login`,
        data : { username, password, app: APP_KEY },
        method: "POST",
        signal
    });
};

export const logOut = async (signal) => {
    return apiRequestPrivate({
        url: `sesion/logout`,
        method: "POST",
        signal
    })
};

export const validateMyToken = async() => {
    return apiRequestPrivate({
       url: `sesion/me`,
       method: "POST",
    });
};