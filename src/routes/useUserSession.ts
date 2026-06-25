// hooks/useSession.ts
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export const useSession = () => {
    const { verifySession, logout } = useAuthStore(); // asumo que logout existe
    const navigate = useNavigate();
    const confirmShownRef = useRef(false); // para evitar múltiples confirms

    useEffect(() => {
        const checkSession = () => {
            const isValid = verifySession();
            if (!isValid && !confirmShownRef.current) {
                confirmShownRef.current = true; // marcamos que ya mostramos
                const userConfirmed = window.confirm(
                    "Tu sesión ha expirado. ¿Deseas cerrar sesión?"
                );
                if (userConfirmed) {
                    logout(); // limpia estado y localStorage
                    navigate('/login');
                } else {
                    // El usuario canceló, pero la sesión sigue inválida.
                    // Podemos permitir que siga navegando pero las peticiones fallarán.
                    // Podríamos volver a intentar verificar en el próximo intervalo,
                    // pero como el token es inválido, volverá a saltar el confirm.
                    // Para evitar spam, podemos resetear el flag después de un tiempo o
                    // permitir un nuevo intento solo si pasa cierto tiempo.
                    // O simplemente no hacer nada, pero el flag sigue en true,
                    // y no volverá a preguntar. Pero si el usuario hace una acción que
                    // requiera autenticación, deberíamos forzar logout.
                    // Simplificamos: si cancela, no hacemos nada y no volvemos a preguntar.
                    // Pero si queremos darle otra oportunidad, podríamos resetear el flag
                    // después de unos segundos.
                    // Por ahora, lo dejamos así: no volverá a preguntar.
                }
            }
        };

        checkSession(); // comprobación inicial
        const interval = setInterval(checkSession, 30000);
        return () => {
            clearInterval(interval);
            confirmShownRef.current = false; // limpiar
        };
    }, [verifySession, logout, navigate]);
};

// al volver de segundo plano, verificar si el usuario está autenticado
/* const escucharVolverDeSegundoPlano = () => {
    if (!verifySession()) {
        navigate('/login');
    }
};
window.addEventListener('resume', escucharVolverDeSegundoPlano);
return () => {
    window.removeEventListener('resume', escucharVolverDeSegundoPlano);
}; */
