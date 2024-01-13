import { ChangeEvent, useState } from "react";

interface RegistrationFormState {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
}

export function RegistrationFormView() {
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
    console.info("Submit:", formState);
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