import { useState } from "react"
import { consultarDNIRUCService } from "@/services/consultarDNIRUCService.js";
import {useNotistack} from "@/hooks/index.js";

export const useConsultaDocumento = () => {
    const [loading, setLoading] = useState(false);
    const {showNotyError } = useNotistack();

    const onConsultar = async (numeroDocumento, fnImperative) => {
        if (numeroDocumento.length === 0 || (numeroDocumento.length !== 8 && numeroDocumento.length !== 11)){
            return;
        }

        setLoading(true);
        try {
            const data = await consultarDNIRUCService(numeroDocumento);

            if (data?.respuesta === "ok"){
                fnImperative({
                    razon_social: data?.razon_social ?? (`${data?.nombres} ${data?.ap_paterno} ${data?.ap_materno}`),
                });
                return;
            } 

            fnImperative({ razon_social: "" });
            throw new Error("Número documento no encontrado.");
        } catch (error) {
            showNotyError({error})
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        onConsultar
    }
}
