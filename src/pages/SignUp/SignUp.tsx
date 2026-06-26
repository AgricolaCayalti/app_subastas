/* import { ButtonForm, Input } from '@/components/index.js';
import { InputForm } from '@/components/index.js'; */
import { /* FaUser, FaAddressCard, */ FaLock/* , FaPhone, FaEnvelope */ } from 'react-icons/fa6'
import styles from './SignUp.module.css'
/* import { useNavigate } from 'react-router-dom';
import { useSignUp } from './useSignUp';
import { useEffect, useState } from 'react';
import { useConsultaDocumento } from './useConsultaDocumento';
import { LinearLoader } from '../../components';
import { TopBar } from '../../components/TopBar/TopBar';
import { useAppUtilityCordova } from '@/hooks/index.js'; */
import { useUI } from '../../hooks';
import { Layout } from '@/components/Layout/Layout';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ButtonForm, Input } from '@/components';
import { RegisterForm, registerSchema } from '@/schemas/register.schema';
import { FaAddressCard, FaEnvelope, FaUser } from 'react-icons/fa';
import { FaPhone } from "react-icons/fa6";
import { Loading } from '@/components/Loading/Loading';
import { useState } from 'react';
import { registrarseService } from '@/services/registrarseService';
import { useNavigate } from 'react-router-dom';
import rutas from '@/data/rutas';


export const SignUp = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const { strings } = useUI();

    const {
        control,
        handleSubmit,
        /* formState: { errors, isSubmitting, isValid }, */
    } = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema),
        mode: 'onChange'
    });

    const handleRegister = async (payload: any) => {
        setIsLoading(true);
        try {
            /* const { token, expiresAt, user } = await loginService(payload);
            const expirationDate = new Date(expiresAt).getTime();
            login(user, token, expirationDate);
            navigate(rutas.MAIN); */
            await registrarseService(payload);
            navigate(rutas.LOGIN);
        } catch (error: any) {
            /* showNotyError({ error: (error as any).msg }); */
        } finally {
            setIsLoading(false);
        }
    };

    /* const [errorClaves, setErrorClaves] = useState(false);
    const [lastSearchedNumber, setLastSearchedNumber] = useState("");
    const { form, onSetValueForm, loading: cargandoForm, onGuardar } = useSignUp();
    const { loading: loadingDocument, onConsultar: onConsultarDocument } = useConsultaDocumento();
    const { alertar } = useAppUtilityCordova();
    const navigate = useNavigate();
    

    const handleSubmit = (e) => {
        e.preventDefault();
        onGuardar(() => {
            alertar({
                txtMessage: strings.PAGE_SIGNUP_MSG_REGISTRADO_OK,
                callback: () => {
                    
                }
            })
        });
    };

    if (!isAcceptedTYC) {
        return false;
    }

    const handleOnChange = (e) => {
        const { target } = e;
        onSetValueForm(target.name, target.value);
    };

    const handleFocus = () => {
        if (form.numero_documento.length <= 0) {
            return;
        }

        if (form.numero_documento === lastSearchedNumber) {
            return;
        }

        onConsultarDocument(form.numero_documento, (data) => {
            setLastSearchedNumber(form.numero_documento);
            onSetValueForm("razon_social", data?.razon_social ?? "");
        });
    };

    useEffect(() => {
        if (form.password === "" && form.password_confirm === "") {
            setErrorClaves(false);
            return;
        }

        setErrorClaves(form.password != form.password_confirm);
    }, [form.password, form.password_confirm]); */

    return <Layout>
        <form className={styles.signupFrmMain} onSubmit={handleSubmit(handleRegister)}>
            <h3 className={styles.signupLblSubtitle}>{strings.PAGE_SIGNUP_REGISTRATE}</h3>
            <Controller
                name="numero_documento"
                control={control}
                render={({ field, fieldState }) => (
                    <Input
                        {...field}
                        required
                        type="text"
                        icon={<FaAddressCard />}
                        label={strings.PAGE_SIGNUP_RUCDNI}
                        placeholder="Ej: *****************"
                        errorMessage={fieldState.error?.message}
                    />
                )}
            />

            <Controller
                name="razon_social"
                control={control}
                render={({ field, fieldState }) => (
                    <Input
                        {...field}
                        required
                        type="text"
                        icon={<FaUser />}
                        label={strings.PAGE_SIGNUP_NOMBRE_RAZON_SOCIAL}
                        placeholder="Ej: *****************"
                        errorMessage={fieldState.error?.message}
                    />
                )}
            />

            <Controller
                name="nombre_contacto"
                control={control}
                render={({ field, fieldState }) => (
                    <Input
                        {...field}
                        required
                        type="text"
                        icon={<FaUser />}
                        label={strings.PAGE_SIGNUP_NOMBRE_CONTACTO}
                        placeholder="Ej: *****************"
                        errorMessage={fieldState.error?.message}
                    />
                )}
            />

            <Controller
                name="correo"
                control={control}
                render={({ field, fieldState }) => (
                    <Input
                        {...field}
                        required
                        type="email"
                        icon={<FaEnvelope />}
                        label={strings.PAGE_SIGNUP_CORREO}
                        placeholder="Ej: *****************"
                        errorMessage={fieldState.error?.message}
                    />
                )}
            />

            <Controller
                name="telefono"
                control={control}
                render={({ field, fieldState }) => (
                    <Input
                        {...field}
                        required
                        type="text"
                        icon={<FaPhone />}
                        label={strings.PAGE_SIGNUP_NUMERO_TELEFONO}
                        placeholder="Ej: *****************"
                        errorMessage={fieldState.error?.message}
                    />
                )}
            />
            <h6 className={styles.signupLblSubtitle}>{strings.PAGE_SIGNUP_CREDENCIALES_ACCESO}</h6>

            <Controller
                name="username"
                control={control}
                render={({ field, fieldState }) => (
                    <Input
                        {...field}
                        required
                        type="email"
                        icon={<FaUser />}
                        label={strings.PAGE_SIGNUP_NOMBRE_USUARIO}
                        placeholder="Ej: *****************"
                        errorMessage={fieldState.error?.message}
                    />
                )}
            />

            <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                    <Input
                        {...field}
                        required
                        type="password"
                        icon={<FaLock />}
                        label={strings.PAGE_SIGNUP_CONTRASENA}
                        placeholder="Ej: *****************"
                        errorMessage={fieldState.error?.message}
                    />
                )}
            />

            <Controller
                name="confirm_password"
                control={control}
                render={({ field, fieldState }) => (
                    <Input
                        {...field}
                        required
                        type="password"
                        icon={<FaLock />}
                        label={strings.PAGE_SIGNUP_CONFIRMAR_CONTRASENA}
                        placeholder="Ej: *****************"
                        errorMessage={fieldState.error?.message}
                    />
                )}
            />
            {
                isLoading
                    ? <Loading />
                    : <ButtonForm disabled={isLoading} bgColor='secondary' type="submit">{strings.PAGE_SIGNUP_BTN_REGISTRAR}</ButtonForm>
            }
        </form>
    </Layout>
};


















{/* <form className={styles.signupFrmMain} onSubmit={handleSubmit}>
            <InputForm icon={<FaAddressCard />} name={"numero_documento"} required label={strings.PAGE_SIGNUP_RUCDNI} value={form.numero_documento ?? ""} onChange={handleOnChange} />
            {
                loadingDocument &&
                <LinearLoader marginTop={0} marginBottom={0} />
            }
            <InputForm icon={<FaUser />} disabled={loadingDocument} name={"razon_social"} required label={strings.PAGE_SIGNUP_NOMBRE_RAZON_SOCIAL} value={form.razon_social ?? ""} readOnly={true} />
            <InputForm icon={<FaUser />} name={"nombre_contacto"} required label={strings.PAGE_SIGNUP_NOMBRE_CONTACTO} value={form.nombre_contacto ?? ""} onFocus={handleFocus} onChange={handleOnChange} />
            <InputForm icon={<FaEnvelope />} name={"correo"} required type="email" label={strings.PAGE_SIGNUP_CORREO} value={form.correo ?? ""} onChange={handleOnChange} />
            <InputForm icon={<FaPhone />} name={"telefono"} pattern="[0-9]{9}" required label={strings.PAGE_SIGNUP_NUMERO_TELEFONO} value={form.telefono ?? ""} onChange={handleOnChange} />




            
            <InputForm icon={<FaUser />} name={"username"} required label={strings.PAGE_SIGNUP_NOMBRE_USUARIO} value={form.correo ?? ""} readOnly={true} />
            <InputForm icon={<FaLock />} type='password' required error={errorClaves} name={"password"} label={strings.PAGE_SIGNUP_CONTRASENA} value={form.password ?? ""} onChange={handleOnChange} />
            <InputForm icon={<FaLock />} type='password' required error={errorClaves} name={"password_confirm"} label={strings.PAGE_SIGNUP_CONFIRMAR_CONTRASENA} value={form.password_confirm ?? ""} onChange={handleOnChange} />
            {
                cargandoForm
                    ? <LinearLoader marginTop={0} marginBottom={0} />
                    : <ButtonForm disabled={cargandoForm || errorClaves} bgColor='secondary' type="submit">{strings.PAGE_SIGNUP_BTN_REGISTRAR}</ButtonForm>
            }
        </form> */}
