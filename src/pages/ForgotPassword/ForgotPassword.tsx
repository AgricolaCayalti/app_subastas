import { useForgotPassword } from './useForgotPassword';
import { Wizard } from './Wizard';
import { Controller } from 'react-hook-form';
import { Input } from '@/components';
import { FaLock } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";

export const ForgotPassword = () => {
    const {
        step,
        isLoading,
        strings,
        handleSubmitEmail,
        handleSubmitCode,
        handleSubmitPassword,
        onPasswordSubmit,
        handleEmailSubmit,
        handleCodeSubmit,
        timeLeft,
        controlEmail,
        controlCode,
        controlPassword,
    } = useForgotPassword();

    const isExpired = timeLeft.includes('expirado');

    if (step === 0) {
        return (
            <Wizard
                form={"form-envio-correo"}
                step={step}
                title={strings.PAGE_FORGOTPASSWORD_INGRESE_CORREO}
                description={strings.PAGE_FORGOTPASSWORD_INGRESE_CORREO_DESCRIPCION}
                isLoading={isLoading}
                handleSubmit={handleSubmitEmail(handleEmailSubmit)}
                titleButton={strings.PAGE_FORGOTPASSWORD_BTN_ENVIAR_CORREO}
            >
                <Controller
                    name="correo"
                    control={controlEmail}
                    render={({ field, fieldState }) => (
                        <Input
                            {...field}
                            required
                            type="text"
                            icon={<IoMail />}
                            label={strings.PAGE_FORGOTPASSWORD_PLACEHOLDER_CORREO}
                            placeholder={strings.PAGE_FORGOTPASSWORD_PLACEHOLDER_CORREO}
                            errorMessage={fieldState.error?.message}
                        />
                    )}
                />
            </Wizard>
        );
    }

    if (step === 1) {
        return (
            <Wizard
                form={"form-codigo-correo"}
                step={step}
                title={strings.PAGE_FORGOTPASSWORD_VALIDAR_CODIGO}
                description={strings.PAGE_FORGOTPASSWORD_VALIDAR_CODIGO_DESCRIPCION}
                isLoading={isLoading}
                handleSubmit={handleSubmitCode(handleCodeSubmit)}
                titleButton={strings.PAGE_FORGOTPASSWORD_BTN_VALIDAR_CODIGO}
            >
                <Controller
                    name="codigo"
                    control={controlCode}
                    render={({ field, fieldState }) => (
                        <Input
                            {...field}
                            required
                            disabled={isExpired}
                            type="text"
                            icon={<FaLock />}
                            label="Código de verificación"
                            placeholder="Código de verificación"
                            errorMessage={fieldState.error?.message}
                        />
                    )}
                />
            </Wizard>
        );
    }

    if (step === 2) {
        return (
            <Wizard
                form={"form-cambiar-contraseña"}
                step={step}
                title={strings.PAGE_FORFOTPASSWORD_CAMBIAR_CLAVE}
                description={strings.PAGE_FORFOTPASSWORD_CAMBIAR_CLAVE_DESCRIPCION}
                isLoading={isLoading}
                handleSubmit={handleSubmitPassword(onPasswordSubmit)}
                titleButton={strings.PAGE_FORGOTPASSWORD_BTN_CAMBIAR_CLAVE}
            >
                <Controller
                    name="clave"
                    control={controlPassword}
                    render={({ field, fieldState }) => (
                        <Input
                            {...field}
                            required
                            disabled={isExpired}
                            type="password"
                            icon={<FaLock />}
                            label={strings.PAGE_SIGNUP_CONTRASENA}
                            placeholder="*****************"
                            errorMessage={fieldState.error?.message}
                        />
                    )}
                />

                <Controller
                    name="confirmarClave"
                    control={controlPassword}
                    render={({ field, fieldState }) => (
                        <Input
                            {...field}
                            required
                            disabled={isExpired}
                            type="password"
                            icon={<FaLock />}
                            label={strings.PAGE_SIGNUP_CONFIRMAR_CONTRASENA}
                            placeholder="*****************"
                            errorMessage={fieldState.error?.message}
                        />
                    )}
                />
            </Wizard>
        );
    }
};