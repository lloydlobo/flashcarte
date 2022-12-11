import {
  toast,
  Id,
  ToastContent,
  ToastOptions,
  TypeOptions,
} from 'react-toastify';

import { toastNotifyOptions } from '../constants/toast-notify-options.constants';

/**
 * Display a toast notification.
 *
 * @param content The content of the toast.
 * @param type Set the toast type.
 * - `One of: 'info', 'success', 'warning', 'error', 'default'`.
 */
// Hello
function toastNotify<TData = unknown>(
  /** Content to display in toast popup. */
  content: ToastContent<TData>,
  /** @type extends CommonOptions. */
  userOptions?: ToastOptions<{}>,
  /** @default 'default'. */
  type?: TypeOptions,
): Id {
  return toast<TData>(content, {
    type: type,
    ...toastNotifyOptions,
    ...userOptions,
  });
}

export { toastNotify };
