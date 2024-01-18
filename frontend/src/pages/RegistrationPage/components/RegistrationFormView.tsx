import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { NotificationService } from "../../../shared/notifications/NotificationService";
import { UserService } from "../../../shared/users/UserService";

interface RegistrationFormState {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
}

interface RegistrationFormViewProps {
  notificationService: NotificationService;
  userService: UserService;
}

export function RegistrationFormView({
  notificationService,
  userService,
}: RegistrationFormViewProps) {
  const navigate = useNavigate();

  const [formState, setFormState] = useState<RegistrationFormState>({
    email: "",
    firstName: "",
    lastName: "",
    username: "",
  });

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const field = event.target.name;
    const value = event.target.value;
    setFormState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  }

  function handleSubmit() {
    const errorOrNothing = validateForm(formState);
    if (errorOrNothing instanceof Error) {
      const error = errorOrNothing;
      notificationService.showError(error.message);
      return;
    }

    userService.createUser(
      formState,
      () => {
        notificationService.showSuccess("Account created");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      },
      (error: Error) => {
        notificationService.showError("Account not created");
      }
    );

    console.info("Submit:", formState);
    notificationService.showSuccess("Successful action!");
  }

  return (
    <>
      <input
        name="email"
        type="email"
        className="registration email"
        value={formState.email}
        placeholder="Email"
        onChange={handleInputChange}
      />
      <input
        name="firstName"
        type="text"
        className="registration firstName"
        value={formState.firstName}
        placeholder="First name"
        onChange={handleInputChange}
      />
      <input
        name="lastName"
        type="text"
        className="registration lastName"
        value={formState.lastName}
        placeholder="Last name"
        onChange={handleInputChange}
      />
      <input
        name="username"
        type="text"
        className="registration username"
        value={formState.username}
        placeholder="Username"
        onChange={handleInputChange}
      />
      <button
        type="submit"
        className="registration submit"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </>
  );
}

function validateForm(formData: RegistrationFormState): Error | void {
  if (!formData.email.includes("@")) return new Error("Invalid email");
  if (formData.firstName.length < 1 || formData.firstName.length > 20)
    return new Error("Invalid first name");
  if (formData.lastName.length < 1 || formData.lastName.length > 20)
    return new Error("Invalid last name");
  if (formData.username.length < 1 || formData.username.length > 20)
    return new Error("Invalid username");
  return;
}
