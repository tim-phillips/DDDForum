import { faker } from "@faker-js/faker";

import { CreateUserInput } from "../../../../src/modules/users/DTOs/userDTOs";

export class UserBuilder {
  private userInput: CreateUserInput;

  constructor() {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const username = faker.internet.userName({
      firstName,
      lastName,
    });
    const email = faker.internet.email({
      firstName,
      lastName,
      provider: "example.com",
    });
    this.userInput = {
      firstName,
      lastName,
      username,
      email,
    };
  }

  withFirstName(value: string) {
    this.userInput.firstName = value;
    return this;
  }

  withLastName(value: string) {
    this.userInput.lastName = value;
    return this;
  }

  withUsername(value: string) {
    this.userInput.username = value;
    return this;
  }

  withEmail(value: string) {
    this.userInput.email = value;
    return this;
  }

  build(): CreateUserInput {
    return this.userInput;
  }
}
