import { useSnackbar } from "notistack";
import { MdClose as CloseIcon } from 'react-icons/md';
import { Constantes } from "@/data/constantes.js";

interface ShowNoty {
    text: string;
    severity: 'success' | 'error' | 'warning' | 'info';
    autoHideDuration?: number;
}

interface ShowNotyError {
    error: string,
    autoHideDuration?: number
}

interface ShowNotyOK {
    message: string,
    autoHideDuration?: number
}

interface ShowConfirmOptions {
    message: string;
    confirmText?: string;
    cancelText?: string;
    severity?: 'success' | 'error' | 'warning' | 'info';
}

export const useNotistack = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const showNoty = ({ text, severity, autoHideDuration = Constantes.MILISEGUNDOS_MOSTRAR_TOAST }: ShowNoty) => {
        enqueueSnackbar(text, {
            variant: severity,
            autoHideDuration,
            hideIconVariant: true,
            action: (snackbarId: any) => (
                <div style={{ fontSize: "2em", lineHeight: ".5" }} onClick={() => closeSnackbar(snackbarId)}>
                    <CloseIcon />
                </div>
            )
        });
    };

    const showNotyError = ({ error, autoHideDuration }: ShowNotyError) => {
        showNoty({ text: error ?? 'Ha ocurrido un error', severity: 'error', autoHideDuration });
    };

    const showNotyOK = ({ message, autoHideDuration }: ShowNotyOK) => {
        showNoty({
            text: message,
            severity: "success",
            autoHideDuration
        });
    }

    const showConfirm = ({
        message,
        confirmText = 'Aceptar',
        cancelText = 'Cancelar',
        severity = 'warning',
    }: ShowConfirmOptions): Promise<boolean> => {
        return new Promise((resolve) => {
            enqueueSnackbar(message, {
                variant: severity,
                persist: true,
                hideIconVariant: true,
                action: (id) => (
                    <div className="flex gap-2 items-center">
                        <button
                            className="bg-transparent border-none text-inherit cursor-pointer text-sm font-bold"
                            onClick={() => {
                                resolve(true);
                                closeSnackbar(id);
                            }}
                        >
                            {confirmText}
                        </button>
                        <button
                            className="bg-transparent border-none text-inherit cursor-pointer text-sm"
                            onClick={() => {
                                resolve(false);
                                closeSnackbar(id);
                            }}
                        >
                            {cancelText}
                        </button>
                    </div>
                )
            });
        });
    }


    return {
        showNotyOK,
        showNotyError,
        showNoty,
        showConfirm,
    };
}