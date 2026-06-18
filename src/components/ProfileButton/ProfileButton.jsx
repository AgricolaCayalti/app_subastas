import { FaLockOpen, FaSignOutAlt } from 'react-icons/fa'
import styles from './ProfileButton.module.css'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth, useUI } from '../../hooks';
import { ModalCambioClave } from './ModalCambioClave';
import rutas from "@/data/rutas.js";

export const ProfileButton = () => {
    const { user, isLoggedIn, onSignOut } = useAuth();
    const [ openModalCambiarclave, setOpenModalCambiarClave ] = useState();
    const { strings } = useUI();
    const navigate = useNavigate();

    useEffect(()=>{
        if (isLoggedIn === true){
            return;
        }

        navigate(rutas.LOGIN);
    }, [isLoggedIn]);

    const onCambiarClave = () => {
        setOpenModalCambiarClave(true);
    };

    return  <div className={styles.main}>
                <div className={styles.submain}>
                    <div className={styles.signOut} onClick={()=>{onCambiarClave()}}>
                        <FaLockOpen className={styles.icon} />
                        {strings.COMMON_CAMBIAR_CLAVE}
                    </div>
                    <div className={styles.signOut} onClick={()=>{onSignOut()}}>
                        <FaSignOutAlt className={styles.icon} />
                        {strings.COMMON_CERRAR_SESION}
                    </div>
                </div>
                <div className={styles.username}>{user.nombres}</div>
                {
                    openModalCambiarclave &&
                        <ModalCambioClave open = {openModalCambiarclave} setOpen ={setOpenModalCambiarClave} />
                }
                
            </div>
}