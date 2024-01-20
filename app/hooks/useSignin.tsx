import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { TAuthForm } from '../types';
import { authValidationSchema } from '../utils/validation';
import useAuthService from './useAuthServce';
import useNotify from './useNotify';


function useAuthForm() {
    const { login } = useAuthService();
    const router = useRouter();
    const { error, success } = useNotify();
    const { register, handleSubmit, formState, formState: { errors } } = useForm<TAuthForm>({
        resolver: yupResolver(authValidationSchema),
        mode: 'onChange'
    });

    async function submitForm(data: TAuthForm): Promise<void> {
        try {
          await login(data);
          success('Login was successful', 1000);
          router.push('/');
        } catch (e: any) {
          error(e.message || 'An error occurred with the form');
        }
      }
      return {

        handleSubmit,
          submitForm,
          formState,
          errors,
          register,
      };
}



export default useAuthForm;