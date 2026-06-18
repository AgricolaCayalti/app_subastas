/* import {ButtonMain, CircularLoader, InputLogin, Space} from "../../components";
import Logo from "./../../assets/yarabamba-logo.png";
import LogosLogin from "./../../assets/logos-login.png";
import './Login.css'
import { FaLock, FaUser } from "react-icons/fa";
import { Switch } from "../../components/Switch/Switch";
import {useLogin} from "@/pages/Login/useLogin.js";
import {useUI} from "@/hooks/index.js";

const languages = ["ES", "EN"];

export const Login = ()=> {
    const { strings, language, onSetLanguage }  = useUI();
    const {
        handleLogin,
        handleGoForgotPassword,
        handleGoSignUp,
        loadingLogin
    }  = useLogin();

    return  <form className="login-box-container background-gray background-imglogin" onSubmit={ handleLogin }>
                <div className="login-lbl-title">
                    <h2 className="login-lbl-title-subastas">SUBASTA</h2>
                    <h2 className="login-lbl-title-yarabamba">AGRÍCOLA CAYALTÍ</h2>
                    <h2 className="login-lbl-title-yarabamba">Y SUBSIDIARIAS</h2>
                </div>
                <div className="login-box">
                    <div className="login-box-logo">
                        <img src={Logo} alt="Logo" />
                    </div>
                    <h4 className="login-box-title">{strings.PAGE_LOGIN_INICIAR_SESION}</h4>
                    <InputLogin
                        icon={<FaUser/>}
                        label = {strings.PAGE_LOGIN_USUARIO}
                        name = "username"
                        placeholder = "nombre_usuario@correo.com"
                        required
                    />
                    <InputLogin
                        icon={<FaLock/>}
                        type="password"
                        label = {strings.PAGE_LOGIN_CONTRASENA}
                        name = "password"
                        required
                    />
                    <Space height={16}/>
                    <ButtonMain bgColor={"secondary"} disabled = { loadingLogin } type="submit">
                        { loadingLogin
                                ? <CircularLoader />
                                : strings.PAGE_LOGIN_BTN_INGRESAR
                        }
                    </ButtonMain>
                </div>
                <div className="text-center">
                    <Switch value={language === languages[0]} onChange={()=>onSetLanguage()} options={languages}/>
                </div>
                <Space height={5}/>
                <span className="lbl-forgotpassword" onClick={handleGoForgotPassword}>{strings.PAGE_LOGIN_OLVIDASTE_TU_CONTRASENA}</span>
                <div className="login-blk-alreadyaccount">{strings.PAGE_LOGIN_NO_TIENE_CUENTA} <span className="lbl-register" onClick={handleGoSignUp}>{strings.PAGE_LOGIN_REGISTRATE}</span></div>
                <div className="login-blk-logos">
                    <img src={LogosLogin} alt="Logos" />
                </div>
            </form>
}; */

import { ButtonMain, CircularLoader, InputLogin, Space } from "../../components";
import Logo from "./../../assets/yarabamba-logo.png";
import LogosLogin from "./../../assets/logos-login.png";
import { FaLock, FaUser } from "react-icons/fa";
import { Switch } from "../../components/Switch/Switch";
import { useLogin } from "@/pages/Login/useLogin.js";
import { useUI } from "@/hooks/index.js";

const languages = ["ES", "EN"];

export const Login = () => {
    const { strings, language, onSetLanguage } = useUI();
    const {
        handleLogin,
        handleGoForgotPassword,
        handleGoSignUp,
        loadingLogin
    } = useLogin();

    return (
        <form
            className="flex flex-col justify-center h-full text-white login-background"
            onSubmit={handleLogin}
        >
            <div className="text-center uppercase font-bold text-2xl sm:text-3xl">
                <h2 className="m-0 leading-[1.15] text-terciary-600">SUBASTA</h2>
                <h2 className="m-0 leading-[1.15] text-primary-800">AGRÍCOLA CAYALTÍ</h2>
                <h2 className="m-0 leading-[1.15] text-primary-800">Y SUBSIDIARIAS</h2>
            </div>

            <div className="pb-[30px] rounded-[1em] bg-white/64 w-[calc(100%-2rem)] max-w-[400px] my-3 mx-auto text-center shadow-md short:pb-3 short:my-2">
                <div className="text-center p-0">
                    <img src={Logo} alt="Logo" className="w-[100px] short:max-h-[65px]" />
                </div>
                <h4 className="text-primary-800 font-medium mt-1">
                    {strings.PAGE_LOGIN_INICIAR_SESION}
                </h4>
                <InputLogin
                    icon={<FaUser />}
                    label={strings.PAGE_LOGIN_USUARIO}
                    name="username"
                    placeholder="nombre_usuario@correo.com"
                    required
                />
                <InputLogin
                    icon={<FaLock />}
                    type="password"
                    label={strings.PAGE_LOGIN_CONTRASENA}
                    name="password"
                    required
                />
                <Space height={16} />
                <ButtonMain bgColor="secondary" disabled={loadingLogin} type="submit">
                    {loadingLogin
                        ? <CircularLoader />
                        : strings.PAGE_LOGIN_BTN_INGRESAR
                    }
                </ButtonMain>
            </div>

            <div className="text-center">
                <Switch
                    value={language === languages[0]}
                    onChange={() => onSetLanguage()}
                    options={languages}
                />
            </div>

            <Space height={5} />

            <span
                className="text-center text-terciary-600 font-semibold pb-1.5 text-base cursor-pointer"
                onClick={handleGoForgotPassword}
            >
                {strings.PAGE_LOGIN_OLVIDASTE_TU_CONTRASENA}
            </span>

            <div className="text-center text-primary-800 font-semibold text-base">
                {strings.PAGE_LOGIN_NO_TIENE_CUENTA}
                <span
                    className="text-terciary-600 font-semibold pb-1.5 text-base cursor-pointer"
                    onClick={handleGoSignUp}
                >
                    {strings.PAGE_LOGIN_REGISTRATE}
                </span>
            </div>

            <div className="absolute bottom-0 left-0 text-center w-full short:relative">
                <img
                    src={LogosLogin}
                    alt="Logos"
                    className="max-h-[75px] max-w-[320px] w-3/4 short:max-h-[65px]"
                />
            </div>
        </form>
    );
};
