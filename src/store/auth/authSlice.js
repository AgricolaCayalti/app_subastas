import { createSlice } from "@reduxjs/toolkit";
import { deleteStorage, saveStorage, loadStorage } from "@/assets/localStorager.js";
import {bootstrapAuthThunk, loginThunk} from "@/store/auth/authThunks.js";
import {encodePlainToken} from "@/utils/sanctum.js";

const SESSION_NAME = import.meta.env.VITE_SESSION_NAME;
const SESSION_NAME_MAIL = `${SESSION_NAME}mail`;

const authStorage = loadStorage({key: SESSION_NAME});
const authValues  =  Boolean(authStorage) ? authStorage : null;
const mailStorage = loadStorage({key: SESSION_NAME_MAIL});
const defaultInitialState = {
    user : authStorage?.user,
    token: authStorage?.token,
    status : 'idle',
    mailCodeSent: Boolean(mailStorage) ? mailStorage?.mail : null,
    timeCodeSent: Boolean(mailStorage) ? mailStorage?.time : null,
};

export const authSlice = createSlice({
   name : 'auth',
   initialState : defaultInitialState,
   reducers : {
        updateCodeSent: ( state, {payload : mail}) => {
            state.mailCodeSent = mail;
            state.timeCodeSent = new Date().getTime();

            saveStorage({key: SESSION_NAME_MAIL, data: {
                mail: state.mailCodeSent,
                time: state.timeCodeSent
            }});
        },
        cancelCodeSent : ( state ) => {
            state.mailCodeSent = null;
            state.timeCodeSent = null;

            deleteStorage({key: SESSION_NAME_MAIL});
        },
       forceLogout(state, action) {
           state.status = 'idle';
           state.user = null;
           state.token = null;
           state.logoutReason = action.payload ?? 'unauthorized';
           deleteStorage({key: SESSION_NAME});
       },
       clearLogoutReason(state) {
           state.logoutReason = null;
       },
       logout(state) { // logout voluntario (sin mensaje especial)
           state.status = 'idle';
           state.user = null;
           state.token = null;
           state.logoutReason = null;

           deleteStorage({key: SESSION_NAME});
       },
   },
    extraReducers: builder => {
        // login
        builder
            .addCase(loginThunk.pending, state => {
                state.status = 'loading'
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.user = action.payload.user;
                state.token = {...action.payload.token, accessToken: encodePlainToken(action.payload.token.accessToken)};
                saveStorage({key: SESSION_NAME, data: {user: state.user, token: state.token}});
            })
            .addCase(loginThunk.rejected, (state) => {
                state.status = 'failed'
            })

            .addCase(bootstrapAuthThunk.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(bootstrapAuthThunk.fulfilled, (state, a) => {
                state.status = 'succeeded';
                state.user = a.payload.user;
                state.token = a.payload.token;
                state.logoutReason = null;
            })
            .addCase(bootstrapAuthThunk.rejected, (state) => {
                state.status = 'failed';
                // tokens ya se limpiaron en forceLogout
            })
    }
});

export const {
    forceLogout,
    clearLogoutReason,
    logout,
    updateCodeSent,
    cancelCodeSent
} = authSlice.actions;