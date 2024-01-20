import { object, string, number } from 'yup';
import * as Yup from 'yup';


export const authValidationSchema = object().shape({
  email: string()
    .min(3, 'Email or Username cannot be less than three characters')
    .email('Invalid email address')
    .required('Email or Username is required'),
  password: string()
    .min(6, 'Password cannot be less than 6 characters')
    .max(30, 'Password cannot be more than 30 characters')
    .required('Password is required'),
});


export const signupValidationSchema = object().shape({
  password: string()
  .min(6, 'Password cannot be less than 6 characters')
  .max(30, 'password cannot be more than 30 characters')
  .matches(/^.*(?=.{3,})/, 'must contain both numbers and alphabets')
  .matches(/^(?=.*[a-zA-Z])/, 'must contain upper case and lower case')
  .matches(/^(?=.*[0-9])/, 'must contain number between 0 and 9')
  .matches(/^(?=.*[\d\x])/, ' must have a digit and contain any special character')
  .matches(/^(?=.*[!$#%])/, 'must have at least a character in !$#%')
  .required('Password is required'),
  password_confirmation: string()
  .oneOf([Yup.ref('password')], "password must match")
  .required('Password confirmation  is required'),
  email: string()
  .matches(/\S+/, 'Email cannot be empty')
    .email('Invalid email address')
    .required('Email is required')
})