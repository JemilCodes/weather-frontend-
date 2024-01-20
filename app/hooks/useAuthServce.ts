import Cookies from 'js-cookie';
import {
    AuthServiceType,
    TAuthForm,
    TRegisterForm,
  } from '../types';
import useAuth from './useAuth';


export default function useAuthService(): AuthServiceType {
    const auth = useAuth();

    async function login(value: TAuthForm): Promise<void> {
        const response = await auth.login(value);
        Cookies.set('access_token', response.access_token);
    }
    async function signup(value: TRegisterForm): Promise<void> {
      const response = await auth.signup(value)
      Cookies.set('access_token', response.access_token )
    }
    return {
        login,
        signup,
      };
}