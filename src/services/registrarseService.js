import axiosInstance from "@/api/axios";

const APP_KEY = import.meta.env.VITE_APP_KEY;

export const registrarseService = async (form) => {
    const res = await axiosInstance.post(`/usuarios`, {...form, app: APP_KEY});
    return res.data;
};