import { ButtonForm } from '../../components/ButtonForm/ButtonForm';
import { useForgotPassword } from './useForgotPassword';
import { LinearLoader } from '../../components';
import { Layout } from '@/components/Layout/Layout';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { ChangePasswordForm, codeSchema, emailSchema, passwordSchema, SendRecoveryForm, ValidateCodeForm } from '@/schemas/recover.email.password.schema';


const TITLE_PAGE_NAME = 'SUBASTA AGRÍCOLA CAYALTÍ Y SUBSIDIARIAS';

// --- Títulos estáticos para cada paso ---
const STEP_TITLES = [
    'Ingrese su correo electrónico',
    'Ingrese el código de verificación',
    'Establezca su nueva contraseña',
];


export const ForgotPassword = () => {
    const { step, isLoading, onSendRecovery, onValidateCode, onChangePassword, strings } = useForgotPassword();

    const {
        register: registerEmail,
        handleSubmit: handleSubmitEmail,
        formState: { errors: errorsEmail },
    } = useForm<SendRecoveryForm>({
        resolver: zodResolver(emailSchema),
        mode: 'onBlur',
    });

    const {
        register: registerCode,
        handleSubmit: handleSubmitCode,
        formState: { errors: errorsCode },
    } = useForm<ValidateCodeForm>({
        resolver: zodResolver(codeSchema),
        mode: 'onBlur',
    });

    const {
        register: registerPassword,
        handleSubmit: handleSubmitPassword,
        formState: { errors: errorsPassword }
    } = useForm<ChangePasswordForm>({
        resolver: zodResolver(passwordSchema),
        mode: 'onBlur',
    });

    const onEmailSubmit = (data: SendRecoveryForm) => {
        onSendRecovery({ correo: data.correo });
    };

    const onCodeSubmit = (data: ValidateCodeForm) => {
        onValidateCode({ correo: emailSent, codigo: data.codigo });
    };

    const onPasswordSubmit = (data: ChangePasswordForm) => {
        onChangePassword({
            correo: emailSent,
            codigo: codeSent,
            clave: data.clave,
        });
    };

    const [emailSent, setEmailSent] = useState('');
    const [codeSent, setCodeSent] = useState('');

    const handleEmailSubmit = (data: SendRecoveryForm) => {
        setEmailSent(data.correo);
        onEmailSubmit(data);
    };

    const handleCodeSubmit = (data: ValidateCodeForm) => {
        setCodeSent(data.codigo);
        onCodeSubmit(data);
    };

    if (step === 0) {
        return (
            <Layout title={TITLE_PAGE_NAME}>
                <h3 className="m-0 text-base font-light text-primary">{STEP_TITLES[0]}</h3>
                <form
                    className="flex flex-col justify-center gap-3"
                    onSubmit={handleSubmitEmail(handleEmailSubmit)}
                >
                    <div>
                        <input
                            type="email"
                            placeholder="Correo electrónico"
                            {...registerEmail('correo')}
                            className="w-full border p-2"
                        />
                        {errorsEmail.correo && (
                            <p className="text-red-500 text-sm">{errorsEmail.correo.message}</p>
                        )}
                    </div>
                    {isLoading && <LinearLoader marginTop={0} marginBottom={0} />}
                    <ButtonForm disabled={isLoading} type="submit">
                        {strings.PAGE_FORGOTPASSWORD_BTN_ENVIAR_CORREO}
                    </ButtonForm>
                </form>
            </Layout>
        );
    }

    if (step === 1) {
        return (
            <Layout title={TITLE_PAGE_NAME}>
                <h3 className="m-0 text-base font-light text-primary">{STEP_TITLES[1]}</h3>
                <form
                    className="flex flex-col justify-center gap-3"
                    onSubmit={handleSubmitCode(handleCodeSubmit)}
                >
                    <div>
                        <input
                            type="text"
                            placeholder="Código de verificación"
                            {...registerCode('codigo')}
                            className="w-full border p-2"
                        />
                        {errorsCode.codigo && (
                            <p className="text-red-500 text-sm">{errorsCode.codigo.message}</p>
                        )}
                    </div>
                    {isLoading && <LinearLoader marginTop={0} marginBottom={0} />}
                    <ButtonForm disabled={isLoading} type="submit">
                        Validar código
                    </ButtonForm>
                </form>
            </Layout>
        );
    }

    if (step === 2) {
        return (
            <Layout title={TITLE_PAGE_NAME}>
                <h3 className="m-0 text-base font-light text-primary">{STEP_TITLES[2]}</h3>
                <form
                    className="flex flex-col justify-center gap-3"
                    onSubmit={handleSubmitPassword(onPasswordSubmit)}
                >
                    <div>
                        <input
                            type="password"
                            placeholder="Nueva contraseña"
                            {...registerPassword('clave')}
                            className="w-full border p-2"
                        />
                        {errorsPassword.clave && (
                            <p className="text-red-500 text-sm">{errorsPassword.clave.message}</p>
                        )}
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Confirmar contraseña"
                            {...registerPassword('confirmarClave')}
                            className="w-full border p-2"
                        />
                        {errorsPassword.confirmarClave && (
                            <p className="text-red-500 text-sm">{errorsPassword.confirmarClave.message}</p>
                        )}
                    </div>
                    {isLoading && <LinearLoader marginTop={0} marginBottom={0} />}
                    <ButtonForm disabled={isLoading} type="submit">
                        Cambiar contraseña
                    </ButtonForm>
                </form>
            </Layout>
        );
    }

    return null;
};