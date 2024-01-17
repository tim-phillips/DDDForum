import { ToastContainer, toast } from "react-toastify";

export class NotificationService {
  showSuccess(message: string) {
    toast.success(message, {
      className: "toast success",
    });
  }

  showError(message: string) {
    toast.error(message, {
      className: "toast error",
    });
  }

  static ToastContainer() {
    return <ToastContainer />;
  }
}
