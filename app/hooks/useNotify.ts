import { toast } from 'react-toastify';

export default function useNotify() {
  function error(message: string) {
    toast.error(message);
  }

  function warning(message: string) {
    toast.warn(message);
  }

  function success(message: string, timeout?: number) {
    toast.success(message, {autoClose: timeout});
  }
  return { error, warning, success };
}