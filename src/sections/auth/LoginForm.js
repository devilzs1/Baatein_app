import React, { useState } from 'react'
import * as Yup from "yup"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers"
import FormProvider from "../../components/hook-form/FormProvider"
import YupPassword from "yup-password"
import { Alert, Stack } from '@mui/material'
YupPassword(Yup)

const LoginForm = () => {

    const [showPassword, setShowPassword] = useState(false);
    const LoginSchema = Yup.object().shape({
        email: Yup.string().required("Email is required!").email("It must be a valid email address!"),
        password:Yup.string().required("Password is required!").min(
        8,
        'password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special'
        )
        .minLowercase(1, 'password must contain at least 1 lower case letter')
        .minUppercase(1, 'password must contain at least 1 upper case letter')
        .minNumbers(1, 'password must contain at least 1 number')
        .minSymbols(1, 'password must contain at least 1 special character'),
    });
    
    const defaultValues ={
        email: "abc12@gmail.com",
        password: "Abcd@1234",
    }
    const methods = useForm({
        resolver: yupResolver(LoginForm),
        defaultValues,
    });

    const {reset, setError, handleSubmit, formState:{errors, isSubmitting, isSubmitSuccessful},} = methods;

    const onSubmit = async (data) =>{
        try{
            //submit data to database
        }catch(error){
            reset();
            setError("afterSubmit",{...error, message:error.message,})
        }
    }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

    <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
    </Stack>
    </FormProvider>
  )
}

export default LoginForm