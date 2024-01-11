import { PuppeteerPageDriver } from "../drivers/PuppeteerPageDriver";
import { CreateUserInput } from "../../../src/modules/users/DTOs/userDTOs";

export class RegistrationPage {
  constructor(private pageDriver: PuppeteerPageDriver) {}

  async register(input: CreateUserInput) {
    console.log(input);
  }

  async isSuccessToastVisible() {
    return true;
  }
}
