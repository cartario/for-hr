import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const loginSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  })
  .required();

const registerSchema = yup
  .object({
    email: yup.string().email().required(),
    username: yup.string().required(),
    password: yup.string().min(6).required(),
    confirm: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
      .required(),
  })
  .required();

const forgetSchema = yup
  .object({
    email: yup.string().email().required(),
  })
  .required();

export const loginResolver = {
  resolver: yupResolver(loginSchema),
};

export const RegisterResolver = {
  resolver: yupResolver(registerSchema),
};

export const ForgetResolver = {
  resolver: yupResolver(forgetSchema),
};
