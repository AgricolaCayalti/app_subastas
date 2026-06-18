import { useSnackbar } from "notistack";
import { MdClose as CloseIcon  } from 'react-icons/md';
import { processError } from "../api/processError";
import { AxiosError } from "axios";
import { Constantes } from "@/data/constantes.js";
/*
interface NotiStackShowNotyProps {
    text: string;
    severity: "info" | "default" | "error" | "success" | "warning" | undefined;
    autoHideDuration?: number;
};

interface NotiStackShowErrorProps {
    error: string | ReferenceError | TypeError | DexieError | AxiosError;
    autoHideDuration?: number;
};

interface NotiStackShowOKProps {
    message : string;
    autoHideDuration?: number;
}
*/

export const useNotistack = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const showNoty = ( { text, severity, autoHideDuration = Constantes.MILISEGUNDOS_MOSTRAR_TOAST}) => {
        enqueueSnackbar(text, {
            variant: severity,
            autoHideDuration,
            hideIconVariant: true,
            action: (snackbarId) => (
                <div style={{fontSize: "2em", lineHeight: ".5"}} onClick={() => closeSnackbar(snackbarId)}>
                    <CloseIcon />
                </div>
            )
        });
    };

    const showNotyError = ( { error, autoHideDuration } ) => {
        if (error?.code === 'CANCEL' || error?.name === 'AbortError') return;
        showNoty( {text: error?.message  ?? 'Ha ocurrido un error.',  severity: 'error' , autoHideDuration } );
    };

    const showNotyOK = ( { message, autoHideDuration } ) => {
        showNoty( {
            text : message,
            severity: "success",
            autoHideDuration
        });
    }

    return {
        showNotyOK,
        showNotyError,
        showNoty
    };
}