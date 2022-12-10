import { toast } from 'react-toastify';

/**
 * Display a toast notification.
 *
 * @param content The content of the toast.
 */
export function toastNotify(content: string) {
  return toast(content, {
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark',
  });
}
