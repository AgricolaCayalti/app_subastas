import { useForgotPassword } from './useForgotPassword';
import { MdOutlineTimer } from "react-icons/md";
import { Wizard } from './Wizard';

export const ForgotPassword = () => {
    const {
        step,
        isLoading,
        strings,
        registerEmail,
        handleSubmitEmail,
        errorsEmail,
        registerCode,
        handleSubmitCode,
        errorsCode,
        registerPassword,
        handleSubmitPassword,
        errorsPassword,
        onPasswordSubmit,
        handleEmailSubmit,
        handleCodeSubmit,
        handleResendCode,
        timeLeft,
    } = useForgotPassword();

    if (step === 0) {
        return (
            <Wizard
                step={step}
                title={strings.PAGE_FORGOTPASSWORD_INGRESE_CORREO}
                description={strings.PAGE_FORGOTPASSWORD_INGRESE_CORREO_DESCRIPCION}
                isLoading={isLoading}
                handleSubmit={handleSubmitEmail(handleEmailSubmit)}
                titleButton={strings.PAGE_FORGOTPASSWORD_BTN_ENVIAR_CORREO}
            >
                <div>
                    <input
                        autoComplete="off"
                        type="email"
                        placeholder="Correo electrónico"
                        {...registerEmail('correo')}
                        className={`w-full border p-2 ${errorsEmail.correo ? 'border-red-500' : ''
                            }`}
                    />
                    {errorsEmail.correo && (
                        <p className="mt-1 flex items-center gap-1 text-sm text-red-600">
                            <span>⚠️</span> {errorsEmail.correo.message}
                        </p>
                    )}
                </div>
            </Wizard>
        );
    }

    if (step === 1) {
        const isExpired = timeLeft.includes('expirado');

        return (
            <Wizard
                step={step}
                title={strings.PAGE_FORGOTPASSWORD_VALIDAR_CODIGO}
                description={strings.PAGE_FORGOTPASSWORD_VALIDAR_CODIGO_DESCRIPCION}
                isLoading={isLoading}
                handleSubmit={handleSubmitCode(handleCodeSubmit)}
                titleButton={strings.PAGE_FORGOTPASSWORD_BTN_VALIDAR_CODIGO}
            >
                <div className="mt-4 flex items-center justify-center gap-2">
                    <MdOutlineTimer size={25} color='blue' />
                    <span
                        className={`text-lg font-semibold ${isExpired ? 'text-red-600' : 'text-blue-600'
                            }`}
                    >
                        {timeLeft || 'Cargando...'}
                    </span>
                </div>


                <div>
                    <input
                        autoComplete="off"
                        type="text"
                        placeholder="Código de verificación"
                        {...registerCode('codigo')}
                        className={`w-full border p-2 ${errorsCode.codigo ? 'border-red-500' : ''
                            }`}
                        disabled={isLoading || isExpired}
                    />
                    {errorsCode.codigo && (
                        <p className="mt-1 flex items-center gap-1 text-sm text-red-600">
                            <span>⚠️</span> {errorsCode.codigo.message}
                        </p>
                    )}
                </div>

                {isExpired && (
                    <div className="mt-4 text-center">
                        <button
                            type="button"
                            onClick={handleResendCode}
                            className="text-sm font-medium text-blue-600 underline transition hover:text-blue-800"
                        >
                            {strings.PAGE_FORGFOTPASSWORD_RESEND_CODE}
                        </button>
                    </div>
                )}
            </Wizard>
        );
    }

    if (step === 2) {
        return (
            <Wizard
                step={step}
                title={strings.PAGE_FORFOTPASSWORD_CAMBIAR_CLAVE}
                description={strings.PAGE_FORFOTPASSWORD_CAMBIAR_CLAVE_DESCRIPCION}
                isLoading={isLoading}
                handleSubmit={handleSubmitPassword(onPasswordSubmit)}
                titleButton={strings.PAGE_FORGOTPASSWORD_BTN_CAMBIAR_CLAVE}
            >
                <div>
                    <input
                        autoComplete="off"
                        type="password"
                        placeholder="Nueva contraseña"
                        {...registerPassword('clave')}
                        className={`w-full border p-2 ${errorsPassword.clave ? 'border-red-500' : ''
                            }`}
                    />
                    {errorsPassword.clave && (
                        <p className="mt-1 flex items-center gap-1 text-sm text-red-600">
                            <span>⚠️</span> {errorsPassword.clave.message}
                        </p>
                    )}
                </div>

                <div>
                    <input
                        autoComplete="off"
                        type="password"
                        placeholder="Confirmar contraseña"
                        {...registerPassword('confirmarClave')}
                        className={`w-full border p-2 ${errorsPassword.confirmarClave ? 'border-red-500' : ''
                            }`}
                    />
                    {errorsPassword.confirmarClave && (
                        <p className="mt-1 flex items-center gap-1 text-sm text-red-600">
                            <span>⚠️</span> {errorsPassword.confirmarClave.message}
                        </p>
                    )}
                </div>
            </Wizard>
        );
    }
};