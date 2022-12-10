import { toast } from 'react-toastify';

/**
 * Display a toast notification.
 *
 * @param content The content of the toast.
 */
export async function toastNotify(content: string) {
  return await toast(content, {
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
