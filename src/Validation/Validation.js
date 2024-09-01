import * as Yup from 'yup';

export const signUpValidation = Yup.object({
    fullname : Yup.string().min(3).required("enter your name"),
    email : Yup.string().email().required("enter your valid email"),
    password : Yup.string().matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, "Please enter altleast 1 speacial character").required("Please enter your password")


})

export const signInValidation = Yup.object({

    email : Yup.string().email().required("enter your valid email"),
    password : Yup.string().required("Please enter your password")


})