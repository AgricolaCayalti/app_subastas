// Login.tsx
import { ButtonMain, Input, Switch } from "@/components";
import Logo from "@/assets/yarabamba-logo.png";
import LogosLogin from "@/assets/logos-login.png";
import { FaLock, FaUser } from "react-icons/fa";
import { useLogin } from "@/pages/Login/useLogin";
import { Loading } from "@/components/Loading/Loading";
import { Controller } from "react-hook-form";

export const Login = () => {
    const {
        handleGoForgotPassword,
        handleGoSignUp,
        loadingLogin,
        control,
        strings,
        language,
        onSetLanguage,
        languages,
        handleSubmit,
        handleLogin
    } = useLogin();

    return (
        // Contenedor principal
        <div className="relative flex flex-col items-center h-screen h-[100dvh] w-full background-imglogin text-white px-4 pt-4 pb-2 overflow-y-auto safe-area-padding justify-between">
            {loadingLogin && <Loading />}
            
            {/* Switch - siempre arriba */}
            <div className="w-full flex justify-center shrink-0 my-12">
                <Switch
                    value={language === languages[0]}
                    onChange={() => onSetLanguage()}
                    options={languages}
                />
            </div>

            {/* Formulario */}
            <form
                className="flex flex-col items-center justify-center w-full max-w-md flex-1 gap-3 "
                // pt-16 para dejar espacio al switch, pb-24 para el footer
                onSubmit={handleSubmit(handleLogin)}
            >
                {/* Cabecera */}
                <div className="text-center flex flex-col gap-2 shrink-0">
                    <img
                        src={Logo}
                        alt="Logo"
                        className="w-[70px] sm:w-[100px] mx-auto"
                    />
                    <div className="uppercase font-bold text-lg sm:text-2xl md:text-2xl">
                        <h2 className="text-terciary-600">SUBASTA</h2>
                        <h2 className="text-primary-800">AGRÍCOLA CAYALTÍ Y SUBSIDIARIAS</h2>
                    </div>
                </div>

                <div className="w-full rounded-2xl bg-white/64 px-4 py-5 shadow-md flex flex-col gap-3 short:py-4 short:gap-2 justify-center">
                    <h4 className="text-primary-800 font-medium text-center text-lg sm:text-xl">
                        {strings.PAGE_LOGIN_INICIAR_SESION}
                    </h4>

                    <Controller
                        name="username"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Input
                                {...field}
                                required
                                icon={<FaUser />}
                                label={strings.PAGE_LOGIN_USUARIO}
                                placeholder="Ej: user@cayalti.com"
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
                                label={strings.PAGE_LOGIN_CONTRASENA}
                                placeholder=""
                                errorMessage={fieldState.error?.message}
                            />
                        )}
                    />

                    <ButtonMain
                        bgColor="secondary"
                        disabled={loadingLogin}
                        type="submit"
                        className="text-base"
                    >
                        {strings.PAGE_LOGIN_BTN_INGRESAR}
                    </ButtonMain>

                    <span
                        className="text-center text-terciary-600 font-semibold text-sm sm:text-base cursor-pointer hover:underline py-2"
                        onClick={handleGoForgotPassword}
                    >
                        {strings.PAGE_LOGIN_OLVIDASTE_TU_CONTRASENA}
                    </span>

                    <div className="flex items-center justify-center gap-2 text-center text-sm sm:text-base flex-wrap">
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
            </form>

            {/* Footer con logos - fuera del form */}

            <div className="flex justify-center pointer-events-none shrink-0 my-12">
                <img
                    src={LogosLogin}
                    alt="Logos"
                    className="max-h-[60px] sm:max-h-[75px] w-auto max-w-[280px] sm:max-w-[340px] object-contain"
                />
            </div>
        </div>
    );
};