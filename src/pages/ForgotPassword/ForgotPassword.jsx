import { ButtonForm } from '../../components/ButtonForm/ButtonForm';
import { InputForm } from '../../components/InputForm/InputForm';
import { FaCode, FaEnvelope } from 'react-icons/fa6'
import styles from './ForgotPassword.module.css'
import { useForgotPassword } from './useForgotPassword';
import { LinearLoader, Space } from '../../components';
import { TopBar } from '../../components/TopBar/TopBar';
import { useAppUtilityCordova } from '../../hooks/useAppUtilityCordova';
import { useUI } from '../../hooks';
import { useEffect, useState } from 'react';
import { FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const TITLE_PAGE_NAME = "SUBASTA AGRÍCOLA CAYALTÍ Y SUBSIDIARIAS";

export const ForgotPassword = ()=> {
    const [errorClaves, setErrorClaves] = useState(false);
    const { form, onSetValueForm, isCodeSent, isShowingChangePassword, 
        loading: cargandoForm, loadingValidar : cargandoFormValidacion,
            onEnviarCorreo, onValidarCodigo, onRefreshCodigo, onCambiarClave } = useForgotPassword();
    const { alertar } = useAppUtilityCordova();
    const navigate = useNavigate();
    const { strings } = useUI();

    const handleSubmit = (e) => {
        e.preventDefault();
        onEnviarCorreo(()=>{
            alertar({
                txtMessage : strings.PAGE_FORGOTPASSWORD_MSG_ENVIADO_OK
            });
        });
    };

    const handleSubmitValidar = (e) => {
        e.preventDefault();
        onValidarCodigo(res);
    }

    const handleSubmitCambiarClave = (e) => {
        e.preventDefault();
        onCambiarClave(()=>{
            navigate(-1);
            alertar({
                txtMessage : strings.PAGE_FORGOTPASSWORD_MSG_PASSWORD_CHANGED
            });
        });
    };

    const handleOnChange = (e) => {
        const { target } = e;
        onSetValueForm(target.name, target.value);
    };

    useEffect(()=>{
        if (form.clave === "" && form.clave_confirmar === ""){
            setErrorClaves(false);
            return;
        }

       setErrorClaves(form.clave != form.clave_confirmar);
    }, [form.clave, form.clave_confirmar]);

    useEffect(()=>{
        onRefreshCodigo();
    }, []);

    return  <div className={styles.boxContainer}>
                <TopBar title={TITLE_PAGE_NAME} bgColor={"white"} ftColor={"primary"} shouldShowBackBtn={true}/>
                <h3 className={styles.lblSubtitle}>{strings.PAGE_FORGOTPASSWORD_INGRESE_CORREO}</h3>
                <form className={styles.frmMain} onSubmit={handleSubmit}>
                    <InputForm icon = {<FaEnvelope />} name={"correo"} readOnly={isCodeSent} required type="email" label={strings.PAGE_FORGOTPASSWORD_CORREO} value = {form.correo ?? ""} onChange={handleOnChange}/> 
                    {
                    cargandoForm &&
                        <LinearLoader marginTop = {0} marginBottom={0}/>
                    }
                    {
                    !Boolean(isCodeSent) &&
                        <ButtonForm disabled = { cargandoForm } type="submit">{strings.PAGE_FORGOTPASSWORD_BTN_ENVIAR_CORREO}</ButtonForm>
                    }
                </form>
                <Space height={10}/>
                {
                    (isCodeSent && !isShowingChangePassword) &&
                        <form className={styles.frmMain} onSubmit={handleSubmitValidar}>
                            <InputForm icon = {<FaCode />} name={"codigo"} required type="text" label={strings.PAGE_FORGOTPASSWORD_CODIGO} value = {form.codigo ?? ""} onChange={handleOnChange}/> 
                            {
                            cargandoFormValidacion &&
                                <LinearLoader marginTop = {0} marginBottom={0}/>
                            }
                            <ButtonForm disabled = { cargandoFormValidacion } type="submit">{strings.PAGE_FORGOTPASSWORD_BTN_VALIDAR_CODIGO}</ButtonForm>
                        </form>
                }
                {
                    isShowingChangePassword &&
                        <form className={styles.frmMain} onSubmit={handleSubmitCambiarClave}>
                            <h3 className={styles.lblSubtitle}>{strings.PAGE_FORGOTPASSWORD_CAMBIO_CLAVE}</h3>
                            {
                                errorClaves &&
                                    <div className="blk-error">{strings.COMMON_CLAVES_NO_COINCIDEN}</div>
                            }
                            <InputForm icon = {<FaLock />} error={errorClaves} name={"clave"} required type="text" label={strings.PAGE_FORGOTPASSWORD_CLAVE} value = {form.clave ?? ""} onChange={handleOnChange}/> 
                            <InputForm icon = {<FaLock />} error={errorClaves} name={"clave_confirmar"} required type="text" label={strings.PAGE_FORGOTPASSWORD_CLAVE_CONFIRMAR} value = {form.clave_confirmar ?? ""} onChange={handleOnChange}/> 
                            {
                            cargandoFormValidacion &&
                                <LinearLoader marginTop = {0} marginBottom={0}/>
                            }
                            <ButtonForm disabled = { cargandoFormValidacion || errorClaves } type="submit">{strings.PAGE_FORGOTPASSWORD_BTN_CAMBIAR_CLAVE}</ButtonForm>
                        </form>
                }
            </div>
};