// ui/AuthNotifier.tsx
/* import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useNotistack, useUI} from "@/hooks/index.js";
import {clearLogoutReason} from "@/store/auth/authSlice.js"; */

export default function AuthNotifier() {
    /* const { logoutReason } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { showNoty } = useNotistack();
    const {strings} = useUI();

    useEffect(() => {
        if (!logoutReason) return;

        if (logoutReason === 'expired') {
            showNoty({
                text: strings.COMMON_AUTH_SESSION_EXPIRED,
                severity: "warning",
                autoHideDuration: 12000,
            });
        } else if (logoutReason === 'unauthorized') {
            showNoty({
                text: strings.COMMON_AUTH_SESSION_NEED_SIGNIN,
                severity: "error",
                autoHideDuration: 12000,
            });
        }

        dispatch(clearLogoutReason());
    }, [logoutReason, showNoty, dispatch]); */

    return null;
}
