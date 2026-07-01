

import { httpClient } from "@/api/httpClient";

export const consultarDNIRUCService = async (numeroDocumento: string) => {
    const { data } = await httpClient.get(`/consultar-documento/${numeroDocumento}`);
    return data.data;
};