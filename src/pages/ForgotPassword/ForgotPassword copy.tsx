import { ButtonForm } from '../../components/ButtonForm/ButtonForm';
import { InputForm } from '../../components/InputForm/InputForm';
import { FaCode, FaEnvelope } from 'react-icons/fa6';
import { useForgotPassword } from './useForgotPassword';
import { LinearLoader, Space } from '../../components';
import { useAppUtilityCordova } from '../../hooks/useAppUtilityCordova';
import { useUI } from '../../hooks';
import { HtmlHTMLAttributes, useEffect, useState } from 'react';
import { FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout/Layout';

const TITLE_PAGE_NAME = "SUBASTA AGRÍCOLA CAYALTÍ Y SUBSIDIARIAS";

export const ForgotPassword2s = () => {
    const { step,
        isLoading,
        error,
        onSendRecovery,
        strings } = useForgotPassword();
    /*
    const [errorClaves, setErrorClaves] = useState(false);
    /* const {
        form,
        onSetValueForm,
        isCodeSent,
        isShowingChangePassword,
        loading,
        loadingValidar,
        onEnviarCorreo,
        onValidarCodigo,
        onRefreshCodigo,
        onCambiarClave,
        error
    } = useForgotPassword(); 
     
    const { alertar } = useAppUtilityCordova();
    const navigate = useNavigate();
    const { strings } = useUI();

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();     

        console.log("handleSubmit");
        onEnviarCorreo({
            onSuccess: () => {
                alertar({
                    txtMessage: strings.PAGE_FORGOTPASSWORD_MSG_ENVIADO_OK
                });
            },
            onError: (msg) => {
                alertar({
                    txtMessage: msg || strings.COMMON_ERROR_GENERICO
                });
            }
        });
    };
 
    const handleSubmitValidar = (e) => {
        e.preventDefault();
        onValidarCodigo({
            onSuccess: () => { },
            onError: (msg) => {
                alertar({
                    txtMessage: msg || strings.PAGE_FORGOTPASSWORD_CODIGO_INVALIDO
                });
            }
        });
    };

    const handleSubmitCambiarClave = (e) => {
        e.preventDefault();
        onCambiarClave({
            onSuccess: () => {
                navigate(-1);
                alertar({
                    txtMessage: strings.PAGE_FORGOTPASSWORD_MSG_PASSWORD_CHANGED
                });
            },
            onError: (msg) => {
                alertar({
                    txtMessage: msg || strings.COMMON_ERROR_GENERICO
                });
            }
        });
    };

    const handleOnChange = (e) => {
        const { target } = e;
        onSetValueForm(target.name, target.value);
    };

    useEffect(() => {
        if (form.clave === "" && form.clave_confirmar === "") {
            setErrorClaves(false);
            return;
        }
        setErrorClaves(form.clave !== form.clave_confirmar);
    }, [form.clave, form.clave_confirmar]);

    useEffect(() => {
        onRefreshCodigo();
    }, []); */

    return (
        <Layout title={TITLE_PAGE_NAME}>
            {/* 👇 Título con Tailwind */}
            <h3 className="m-0 text-base font-light text-primary ">
                {strings.PAGE_FORGOTPASSWORD_INGRESE_CORREO}
            </h3>

            {/* 👇 Formulario con Tailwind */}
            <form className="flex flex-col justify-center gap-3" onSubmit={onSendRecovery}>
                <InputForm
                    icon={<FaEnvelope />}
                    name="correo"
                    readOnly={isCodeSent}
                    required
                    type="email"
                    label={strings.PAGE_FORGOTPASSWORD_CORREO}
                    value={form.correo ?? ""}
                    onChange={handleOnChange}
                />
                {isLoading && <LinearLoader marginTop={0} marginBottom={0} />}
                <ButtonForm disabled={isLoading} type="submit">
                    {strings.PAGE_FORGOTPASSWORD_BTN_ENVIAR_CORREO}
                </ButtonForm>
            </form>
            {/* 
            <Space height={10} />

            {isCodeSent && !isShowingChangePassword && (
                <form className="flex flex-col justify-center gap-3" onSubmit={handleSubmitValidar}>
                    <InputForm
                        icon={<FaCode />}
                        name="codigo"
                        required
                        type="text"
                        label={strings.PAGE_FORGOTPASSWORD_CODIGO}
                        value={form.codigo ?? ""}
                        onChange={handleOnChange}
                    />
                    {loadingValidar && <LinearLoader marginTop={0} marginBottom={0} />}
                    <ButtonForm disabled={loadingValidar} type="submit">
                        {strings.PAGE_FORGOTPASSWORD_BTN_VALIDAR_CODIGO}
                    </ButtonForm>
                </form>
            )}

            {isShowingChangePassword && (
                <form className="flex flex-col justify-center gap-3" onSubmit={handleSubmitCambiarClave}>
                    <h3 className="m-0 text-base font-light text-primary mt-2">
                        {strings.PAGE_FORGOTPASSWORD_CAMBIO_CLAVE}
                    </h3>
                    {errorClaves && (
                        <div className="blk-error">{strings.COMMON_CLAVES_NO_COINCIDEN}</div>
                    )}
                    <InputForm
                        icon={<FaLock />}
                        error={errorClaves}
                        name="clave"
                        required
                        type="password"
                        label={strings.PAGE_FORGOTPASSWORD_CLAVE}
                        value={form.clave ?? ""}
                        onChange={handleOnChange}
                    />
                    <InputForm
                        icon={<FaLock />}
                        error={errorClaves}
                        name="clave_confirmar"
                        required
                        type="password"
                        label={strings.PAGE_FORGOTPASSWORD_CLAVE_CONFIRMAR}
                        value={form.clave_confirmar ?? ""}
                        onChange={handleOnChange}
                    />
                    {loadingValidar && <LinearLoader marginTop={0} marginBottom={0} />}
                    <ButtonForm disabled={loadingValidar || errorClaves} type="submit">
                        {strings.PAGE_FORGOTPASSWORD_BTN_CAMBIAR_CLAVE}
                    </ButtonForm>
                </form>
            )} */}
        </Layout>
    );
};