import Logo from "@/assets/yarabamba-logo.png";
import {useNavigate} from "react-router-dom";
import {useAuth, useNotistack, useUI} from "@/hooks/index.js";
import {useEffect, useRef} from "react";
import {useDispatch} from "react-redux";
import {loginThunk} from "@/store/auth/authThunks.js";
import rutas from "@/data/rutas.js";

export const useLogin = () => {
    const navigate = useNavigate();
    const { user, loadingLogin } = useAuth();
    const pendingRef = useRef(null);
    const dispatch = useDispatch();
    const {  showNotyError } = useNotistack();

    const handleGoSignUp = ()=>{
        navigate(rutas.TERMS_CONDITIONS);
    };

    const handleGoForgotPassword = () => {
        navigate(rutas.FORGOT_PASSWORD);
    };

    const handleLogin = async (e)=>{
        e.preventDefault();
        const { target : $form } = e;
        const promisePending =  dispatch(loginThunk({
            username: $form.username.value,
            password: $form.password.value
        }));
        pendingRef.current = promisePending;

        try{
            await promisePending.unwrap();
        } catch (error) {
            showNotyError({error, autoHideDuration: 50000});
        } finally {
            pendingRef.current = null;
        }
    };

    useEffect(()=>{
        if (!Boolean(user)){
            return;
        }
        navigate("/main");
    }, [user]);

    useEffect(() => () => { pendingRef.current?.abort?.(); }, []);

    return {
        handleGoSignUp,
        handleGoForgotPassword,
        handleLogin,
        loadingLogin,
    }
}