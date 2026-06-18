import { ButtonForm } from '@/components/index.js';
import { InputForm } from '@/components/index.js';
import { FaUser, FaAddressCard, FaLock, FaPhone, FaEnvelope } from 'react-icons/fa6'
import styles from './SignUp.module.css'
import { useNavigate } from 'react-router-dom';
import { useSignUp } from './useSignUp';
import { useEffect, useState } from 'react';
import { useConsultaDocumento } from './useConsultaDocumento';
import { LinearLoader } from '../../components';
import { TopBar } from '../../components/TopBar/TopBar';
import { useAppUtilityCordova } from '@/hooks/index.js';
import { useUI } from '../../hooks';
import rutas from '@/data/rutas';

const TITLE_PAGE_NAME = "SUBASTA AGRÍCOLA CAYALTÍ Y SUBSIDIARIAS";

export const SignUp = ()=> {
    const [errorClaves, setErrorClaves] = useState(false);
    const [lastSearchedNumber, setLastSearchedNumber] = useState("");
    const { form, onSetValueForm, loading: cargandoForm, onGuardar } = useSignUp();
    const { loading: loadingDocument, onConsultar: onConsultarDocument} = useConsultaDocumento();
    const { alertar } = useAppUtilityCordova();
    const navigate = useNavigate();
    const { strings, isAcceptedTYC } = useUI();

    const handleSubmit = (e) => {
        e.preventDefault();
        onGuardar(()=>{
            alertar({
                txtMessage : strings.PAGE_SIGNUP_MSG_REGISTRADO_OK,
                callback : () => {
                    navigate(rutas.LOGIN);
                }
            })
        });
    };

    if (!isAcceptedTYC){
        return false;
    }

    const handleOnChange = (e) => {
        const { target } = e;
        onSetValueForm(target.name, target.value);
    };

    const handleFocus = ()=>{
        if (form.numero_documento.length <= 0){
            return;
        }

        if(form.numero_documento === lastSearchedNumber){
            return;
        }

        onConsultarDocument(form.numero_documento, (data)=>{
            setLastSearchedNumber(form.numero_documento);
            onSetValueForm("razon_social", data?.razon_social ?? "");
        });
    };

    useEffect(()=>{
        if (form.password === "" && form.password_confirm === ""){
            setErrorClaves(false);
            return;
        }

       setErrorClaves(form.password != form.password_confirm);
    }, [form.password, form.password_confirm]);

    return  <div className={styles.signupBoxContainer}>
                <TopBar title={TITLE_PAGE_NAME} bgColor={"white"} ftColor={"primary"} shouldShowBackBtn={true}/>
                <h3 className={styles.signupLblSubtitle}>{strings.PAGE_SIGNUP_REGISTRATE}</h3>
                <form className={styles.signupFrmMain} onSubmit={handleSubmit}>
                    <InputForm icon = {<FaAddressCard />} name={"numero_documento"} required label={strings.PAGE_SIGNUP_RUCDNI} value = {form.numero_documento ?? ""} onChange={handleOnChange}/> 
                    {
                    loadingDocument &&
                        <LinearLoader marginTop = {0} marginBottom={0}/>
                    }
                    <InputForm icon = {<FaUser />} disabled={loadingDocument} name={"razon_social"} required label={strings.PAGE_SIGNUP_NOMBRE_RAZON_SOCIAL} value = {form.razon_social ?? ""} readOnly={true}/> 
                    <InputForm icon = {<FaUser />} name={"nombre_contacto"} required label={strings.PAGE_SIGNUP_NOMBRE_CONTACTO} value = {form.nombre_contacto ?? ""} onFocus={handleFocus}  onChange={handleOnChange}/> 
                    <InputForm icon = {<FaEnvelope />} name={"correo"} required type="email" label={strings.PAGE_SIGNUP_CORREO} value = {form.correo ?? ""} onChange={handleOnChange}/> 
                    <InputForm icon = {<FaPhone />} name={"telefono"} pattern="[0-9]{9}" required label={strings.PAGE_SIGNUP_NUMERO_TELEFONO} value = {form.telefono ?? ""} onChange={handleOnChange}/> 

                    <h6 className={styles.signupLblSubtitle}>{strings.PAGE_SIGNUP_CREDENCIALES_ACCESO}</h6>
                    <InputForm icon = {<FaUser />} name={"username"} required label={strings.PAGE_SIGNUP_NOMBRE_USUARIO} value = {form.correo ?? ""} readOnly = { true } /> 
                    <InputForm icon = {<FaLock />} type='password' required error={errorClaves} name={"password"} label={strings.PAGE_SIGNUP_CONTRASENA} value = {form.password ?? ""} onChange={handleOnChange}/>
                    <InputForm icon = {<FaLock />} type='password' required error={errorClaves} name={"password_confirm"} label={strings.PAGE_SIGNUP_CONFIRMAR_CONTRASENA} value = {form.password_confirm ?? ""} onChange={handleOnChange}/>
                    {
                    cargandoForm 
                        ? <LinearLoader marginTop = {0} marginBottom={0}/>
                        : <ButtonForm disabled = { cargandoForm || errorClaves } bgColor='secondary' type="submit">{strings.PAGE_SIGNUP_BTN_REGISTRAR}</ButtonForm>
                    }
                </form>
            </div>
};