import axios from 'axios';
import {setupInterceptors} from "@/api/interceptors.js";

const BASE_URL = import.meta.env.VITE_URL_API;
const SESSION_NAME = import.meta.env.VITE_SESSION_NAME;
const DEFAULT_HEADERS = {
    'Accept' : 'application/json',
    'Content-Type': 'application/json'
};

const axiosInstance =  axios.create({
    timeout: 50000,
    headers: DEFAULT_HEADERS,
    baseURL : BASE_URL,
});

setupInterceptors(axiosInstance);

const axiosPrivate = axios.create({
    baseURL : BASE_URL,
    timeout: 50000,
    headers: DEFAULT_HEADERS,
    withCredentials : true
});

setupInterceptors(axiosPrivate, SESSION_NAME);

export default axiosInstance;
export { axiosPrivate }