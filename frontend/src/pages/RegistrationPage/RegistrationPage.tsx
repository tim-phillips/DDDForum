import { LayoutView } from "../../shared/components/Layout/LayoutView";
import { RegistrationFormView } from "./components/RegistrationFormView";
import { NotificationService } from "../../shared/notifications/NotificationService";
import { UserService } from "../../shared/users/UserService";

export function RegistrationPage() {
  const notificationService = new NotificationService();
  const userService = new UserService();

  return (
    <LayoutView title="Registration Page">
      <RegistrationFormView
        notificationService={notificationService}
        userService={userService}
      />
    </LayoutView>
  );
}
