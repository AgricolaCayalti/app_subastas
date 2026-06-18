import axiosInstance, { axiosPrivate } from "@/api/axios";

export async function apiRequest(config){
    const res = await axiosInstance.request(config);
    return res.data;
}

export async function apiRequestPrivate(config) {
    const res = await axiosPrivate.request(config);
    return res.data;
}