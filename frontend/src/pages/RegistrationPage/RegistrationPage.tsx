import { LayoutView } from "../../shared/components/Layout/LayoutView";
import { RegistrationFormView } from "./components/RegistrationFormView";

export function RegistrationPage() {
  return (
    <LayoutView title="Registration Page">
      <RegistrationFormView />
    </LayoutView>
  );
}
