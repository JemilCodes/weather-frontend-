import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { TRegisterForm } from '../types';
import { signupValidationSchema } from '../utils/validation';
import useAuthService from './useAuthServce';
import useNotify from './useNotify';

function useRegisterForm() {
    const { signup } = useAuthService();
    const router = useRouter();
    const { error, success } = useNotify();
    const { register, handleSubmit, formState, formState: { errors }, control } = useForm<TRegisterForm>({
        resolver: yupResolver(signupValidationSchema),
        mode: 'onChange',
    });

    async function submitForm(data: TRegisterForm): Promise<void> {
        try {
          await signup(data);
          success('Registration was successful', 1000);
          router.push('/');
        } catch (e: any) {
          error(e.message || 'An error occurred with the form');
        }
      }

      return {
        Controller,
        handleSubmit,
        submitForm,
        formState,
        errors,
        register,
        control,
      };
}



export default useRegisterForm;