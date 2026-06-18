import {apiRequest} from "@/api/apiRequest.js";

export const consultarDNIRUCService = async (numeroDocumento) => {
    return apiRequest({
        url: `consultar-documento/${numeroDocumento}`,
        method: "GET",
    });
};