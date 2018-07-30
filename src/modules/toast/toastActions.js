/* @flow */
import { RemoteError } from "../services/errors";
import { toast } from "react-toastify";

interface Options {
  onOpen: ?func;
  onClose: ?func;
  autoClose: ?number;
  closeButton: ?any;
  type: ?string;
  hideProgressBar: ?boolean;
  position: ?string;
  pauseOnHover: ?boolean;
  transition: ?any;
}

export function createToastActions() {
  const defaultOptions = {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 5000 // 5 seconds
  };

  return {
    showToast: (message: any, options: Options = defaultOptions) => {
      return toast(message, options);
    },

    showSuccessToast: (message: any, options: Options = defaultOptions) => {
      return toast.success(message, options);
    },

    showErrorToast: (error: any, options: Options = defaultOptions) => {
      let message: string;
      if (error instanceof RemoteError) {
        message = "Internal server error; please try again later.";
      } else {
        message = error.message;
      }

      return toast.error(message, options);
    },

    isToastActive: (toastId: any) => {
      return toast.isActive(toastId);
    },

    dismissToast: (id?: any) => {
      toast.dismiss(id);
    },

    updateToast: (id?: any, options: Options = defaultOptions) => {
      toast.update(id, options);
    }
  };
}

export const toastActions = createToastActions();
