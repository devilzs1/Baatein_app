import {createSlice} from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { showSnackbar } from "./app";

const initialState = {
    isLoggedIn: false,
    token: "",
    user: null,
    user_id: null,
    isLoading: false,
    email: "",
    error: false,
}

const slice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        updateIsLoading(state, action){
            state.error = action.payload.error;
            state.isLoading = action.payload.isLoading;
        },
        logIn(state, action){
            state.isLoggedIn = action.payload.isLoggedIn;
            state.token = action.payload.token;
        },
        signOut(state, action){
            state.isLoggedIn = false;
            state.token ="";
        },
        udpateRegisterEmail(state, action){
            state.email = action.payload.email;
        }
    }
});

export default slice.reducer;

export function LoginUser(formValues){
    //formValues => {email, password}
    return async (dispatch, getState) => {
         dispatch(
           slice.actions.updateIsLoading({ isLoading: true, error: false })
         );

        await axios.post("auth/login", {
            ...formValues,
        },{
            headers:{
                "Content-Type": "application/json",
            }
        }).then((response)=>{
            // console.log("I am here",response)
            dispatch(slice.actions.logIn({
                isLoggedIn: true,
                token: response.data.token,
            }));

            window.localStorage.setItem("user_id", response.data.user_id);

            dispatch(showSnackbar({severity: "success", message:response.data.message}));
            dispatch(slice.actions.updateIsLoading({   isLoading: false, error: false })
            );
        }).catch(function (error){
            // console.log("I am here", error)
            dispatch(showSnackbar({severity: "error", message:error.response.data.message}));
            dispatch(
              slice.actions.updateIsLoading({ isLoading: false, error: true })
            );
        });
    }
}

export function LogOutUser(){
    return async (dispatch, getState) => {
        window.localStorage.removeItem("user_id");
        dispatch(slice.actions.signOut());
    }
}

export function ForgotPassword(formValues){
    return async (dispatch, getState) => {
        await axios.post("auth/forgot-password",{
            ...formValues,
        },{
            headers: {
                "Content-Type": "application/json",
            }
        }).then((response)=>{
            // console.log(response)
            dispatch(
              showSnackbar({
                severity: "success",
                message: response.data.message,
              })
            );
        }).catch((error)=>{
            // console.log(error)
            dispatch(
              showSnackbar({
                severity: "error",
                message: error.response.data.message,
              })
            );

        })

    }
}

export function NewPassword(formValues){
    return async (dispatch, getState) => {
        await axios.post("auth/reset-password",{
            ...formValues,
        },{
            headers: {
                "Content-Type": "application/json",
            }
        }).then((response)=>{
            // console.log(response)
            dispatch(
              showSnackbar({
                severity: "success",
                message: response.data.message,
              })
            );
            dispatch(
                slice.actions.logIn({
                    isLoggedIn: true,
                    token: response.data.token,
                })
            )

        }).catch((error)=>{
            // console.log(error)
            dispatch(
              showSnackbar({
                severity: "error",
                message: error.response.data.message,
              })
            );
        })
    }
}

export function RegisterUser(formValues){
    return async (dispatch, getState) => {
        dispatch(slice.actions.updateIsLoading({isLoading: true, error: false}))
        await axios.post("/auth/register",{
            ...formValues
        },{
            headers: {
                "Content-Type": "application/json",
            }
        }).then((response)=>{
            // console.log(response)
            dispatch(slice.actions.udpateRegisterEmail({email: formValues.email}))
            dispatch(slice.actions.updateIsLoading({isLoading: false, error: false}))
        }).catch((error)=>{
            // console.log(error);
           dispatch(
             showSnackbar({
               severity: "error",
               message: error.response.data.message,
             })
           );
            dispatch(slice.actions.updateIsLoading({isLoading: false, error: true}))
            
        }).finally(()=>{
            if(!getState().auth.error){
                // window.location.href = "/auth/verify-otp";
                window.location.href = `/auth/verify-otp?email=${encodeURIComponent(
                  formValues.email
                )}`;
            }
        })
    }
}

export function VerifyEmail(formValues){
    return async (dispatch, getState)=>{
         dispatch(
           slice.actions.updateIsLoading({ isLoading: true, error: false })
         );
        await axios.post("/auth/verify-otp", {
            ...formValues
        },{
            headers:{
                "Content-Type": "application/json",
            }
        }).then((response)=>{
            // console.log(response)
            dispatch(slice.actions.logIn({isLoggedIn: true, token: response.data.token}));

            window.localStorage.setItem("user_id", response.data.user_id);
            dispatch(slice.actions.updateIsLoading({isLoading: false, error: false}));

        }).catch((error)=>{
            // console.log(error)
            // console.log("error coming in verify")
            dispatch(
              showSnackbar({
                severity: "error",
                message: error.response.data.message,
              })
            );
            dispatch(slice.actions.updateIsLoading({ error: true, isLoading: false }));
        })
    }
}