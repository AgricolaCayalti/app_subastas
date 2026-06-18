import { ButtonMain, CircularLoader, InputLogin, Switch } from "@/components";
import Logo from "@/assets/yarabamba-logo.png";
import LogosLogin from "@/assets/logos-login.png";
import { FaLock, FaUser } from "react-icons/fa";
import { useLogin } from "@/pages/Login/useLogin";
import { useUI } from "@/hooks";

export const Login = () => {
    const { strings, language, onSetLanguage, languages } = useUI();
    const {
        handleLogin,
        handleGoForgotPassword,
        handleGoSignUp,
        loadingLogin,
        handleSubmit,
        register,
        errors,/* 
        isSubmitting,
        isValid, */
    } = useLogin();

    return (
        <form
            className="flex flex-col items-center justify-center h-full w-full login-background text-white px-4  sm:py-10"
            onSubmit={handleSubmit(handleLogin)}
        >
            <div className="absolute top-5 right-5 md:top-10 md:right-10">
                <Switch
                    value={language === languages[0]}
                    onChange={() => onSetLanguage()}
                    options={languages}
                />
            </div>

            <div className="flex flex-col items-center w-full max-w-[440px] mx-auto gap-2">
                <div className="text-center flex flex-col gap-2">
                    <img
                        src={Logo}
                        alt="Logo"
                        className="w-[75px] sm:w-[100px] mx-auto"
                    />
                    <div className="uppercase font-bold text-xl sm:text-2xl md:text-2xl">
                        <h2 className="text-terciary-600">SUBASTA</h2>
                        <h2 className="text-primary-800">AGRÍCOLA CAYALTÍ Y SUBSIDIARIAS</h2>
                    </div>
                </div>

                <div className="w-full rounded-2xl bg-white/64 px-3 py-5 shadow-md flex flex-col gap-3 short:py-4 short:gap-2">
                    <h4 className="text-primary-800 font-medium text-center text-lg sm:text-xl">
                        {strings.PAGE_LOGIN_INICIAR_SESION}
                    </h4>
                    <InputLogin
                        icon={<FaUser />}
                        label={strings.PAGE_LOGIN_USUARIO}
                        placeholder="Ej: user@cayalti.com"
                        required
                        registration={register('username')}   // ← pasamos el resultado
                        errorMessage={errors.username?.message}
                    />
                    
                    <InputLogin
                        icon={<FaLock />}
                        type="password"
                        label={strings.PAGE_LOGIN_CONTRASENA}
                        placeholder="Ej: Clave147"
                        required
                        registration={register('password')}
                        errorMessage={errors.password?.message}
                    />

                    <ButtonMain
                        bgColor="secondary"
                        disabled={loadingLogin}
                        type="submit"
                        className="mt-1"
                    >
                        {loadingLogin ? <CircularLoader /> : strings.PAGE_LOGIN_BTN_INGRESAR}
                    </ButtonMain>

                    <span
                        className="text-center text-terciary-600 font-semibold text-sm sm:text-base cursor-pointer hover:underline"
                        onClick={handleGoForgotPassword}
                    >
                        {strings.PAGE_LOGIN_OLVIDASTE_TU_CONTRASENA}
                    </span>

                    <div className="flex items-center justify-center gap-2 text-center text-sm sm:text-base">
                        <span className="text-primary-800 font-semibold">
                            {strings.PAGE_LOGIN_NO_TIENE_CUENTA}
                        </span>
                        <span
                            className="text-terciary-600 font-semibold cursor-pointer hover:underline"
                            onClick={handleGoSignUp}
                        >
                            {strings.PAGE_LOGIN_REGISTRATE}
                        </span>
                    </div>
                </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 flex justify-center py-3 sm:py-4 pointer-events-none">
                <img
                    src={LogosLogin}
                    alt="Logos"
                    className="max-h-[60px] sm:max-h-[75px] w-auto max-w-[280px] sm:max-w-[340px] object-contain"
                />
            </div>
        </form>
    );
};