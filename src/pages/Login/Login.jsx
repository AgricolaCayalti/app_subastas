import {ButtonMain, CircularLoader, InputLogin, Space} from "../../components";
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
};