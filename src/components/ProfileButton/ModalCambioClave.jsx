import { FaLock } from 'react-icons/fa';
import styles from './ModalCambioClave.module.css';
import { ButtonForm, InputForm, LinearLoader, Space } from '../../components';
import { useModalCambioClave } from './useModalCambioClave';
import { useAppUtilityCordova } from '@/hooks/index.js';
import { useUI } from '../../hooks';

export const ModalCambioClave = ({open, setOpen }) => {
    const { form, cargando, errorClaves, onCambiarClave, onSetValueForm} = useModalCambioClave();
    const { strings } = useUI();
    const { alertar } = useAppUtilityCordova();
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleOnChange = (e) => {
        const { target } = e;
        onSetValueForm(target.name, target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onCambiarClave(()=>{
            alertar({
                txtMessage: strings.PAGE_FORGOTPASSWORD_MSG_PASSWORD_CHANGED
            });
            handleClose();
        });
    };

    return <div className={styles.modal} style={{display: Boolean(open) ? "block" : "none"}}>
            <div className={styles.modalDialog}>
                    <div className={styles.modalHeader}>
                        <h3 className={styles.title}>{strings.COMMON_CAMBIAR_CLAVE}</h3>
                        <span className={styles.modalClose} onClick={handleClose}>&times;</span>
                    </div>
                    <form className={styles.modalContent} onSubmit={handleSubmit}>
                        <h3 className={styles.lblSubtitle}>{strings.PAGE_FORGOTPASSWORD_CAMBIO_CLAVE}</h3>
                        {
                            errorClaves &&
                                <div className="blk-error">{strings.COMMON_CLAVES_NO_COINCIDEN}</div>
                        }
                        <InputForm icon = {<FaLock />} error={errorClaves} autofocus = {true} name={"clave"} required type="text" label={strings.PAGE_FORGOTPASSWORD_CLAVE} value = {form.clave ?? ""} onChange={handleOnChange}/> 
                        <InputForm icon = {<FaLock />} error={errorClaves} name={"clave_confirmar"} required type="text" label={strings.PAGE_FORGOTPASSWORD_CLAVE_CONFIRMAR} value = {form.clave_confirmar ?? ""} onChange={handleOnChange}/> 
                        <Space height={4}/>
                        {
                            cargando
                               ? <LinearLoader marginTop = {0} marginBottom={0} color='secondary'/>
                               : <ButtonForm disabled = { cargando || errorClaves } type="submit">{strings.PAGE_FORGOTPASSWORD_BTN_CAMBIAR_CLAVE}</ButtonForm>
                        }
                    </form>
                </div>
            </div>
}