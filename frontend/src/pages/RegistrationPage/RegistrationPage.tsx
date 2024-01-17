import { LayoutView } from "../../shared/components/Layout/LayoutView";
import { NotificationService } from "../../shared/notifications/NotificationService";
import { RegistrationFormView } from "./components/RegistrationFormView";

export function RegistrationPage() {
  const notificationService = new NotificationService();

  return (
    <LayoutView title="Registration Page">
      <RegistrationFormView notificationService={notificationService} />
    </LayoutView>
  );
}
