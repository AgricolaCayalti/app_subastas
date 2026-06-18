import { useDispatch, useSelector } from "react-redux";
import {logoutThunk } from "../store/auth/authThunks";
import {clearLogoutReason} from "@/store/auth/authSlice.js";

export const useAuth = () => {
    const dispatch = useDispatch();
    const { user, token, status, logoutReason } = useSelector(state=>state.auth);

    const onSignOut =  async ()=>{
        await dispatch(logoutThunk()).unwrap();
    };

    const onBootstrapCheck =  () => {
        if (logoutReason === 'expired') {
            dispatch(clearLogoutReason());
        } else if ( logoutReason === 'unauthorized' ) {
            dispatch(clearLogoutReason());
        }
    }

    return {
        //* Properties
        user,
        token,
        isLoggedIn  : Boolean(token) && Boolean(user),
        loadingLogin : status === 'loading',
        logoutReason,
        //* Methods
        onSignOut,
        onBootstrapCheck
    }
}