import { type ToastOptions } from 'react-toastify';

import { TToastNotifyOptions } from '../interfaces/toast-notify-options.interfaces';

const toastNotifyOptions: ToastOptions<TToastNotifyOptions> = {
  position: 'top-right',
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'dark',
};

export { toastNotifyOptions };
