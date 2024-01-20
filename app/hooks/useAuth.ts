import postData from '../helper/postData';
import { TAuthForm, 
    TAuthData, TRegisterForm,
    } from '../types/index';

export default function useAuth() {
    
    async function login (data: TAuthForm): Promise<TAuthData> {
        const path = 'login';
        const response = await postData<TAuthForm, TAuthData>(path, data);
        return response;
    }   
   async function signup (data: TRegisterForm): Promise<TAuthData> {
    const path = 'signup';
    const response = await postData<TRegisterForm, TAuthData>(path, data)
    return response;
   }
   
    return {
        login,
        signup,
      };
}