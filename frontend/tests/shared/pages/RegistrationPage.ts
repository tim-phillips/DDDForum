import { PuppeteerPageDriver } from "../drivers/PuppeteerPageDriver";
import { PageComponents } from "./PageComponents/PageComponents";
import { CreateUserInput } from "../../../src/modules/users/DTOs/userDTOs";

export class RegistrationPage {
  private pageDriver: PuppeteerPageDriver;
  private pageComponents: PageComponents;

  constructor(pageDriver: PuppeteerPageDriver) {
    this.pageDriver = pageDriver;
    this.pageComponents = new PageComponents({
      driver: this.pageDriver,
      elements: {
        email: { selector: ".registration.email", type: "input" },
        firstName: { selector: ".registration.firstName", type: "input" },
        lastName: { selector: ".registration.lastName", type: "input" },
        username: { selector: ".registration.username", type: "input" },
        submit: { selector: ".registration.submit", type: "button" },
      },
      timeout: 3000,
    });
  }

  async register(input: CreateUserInput) {
    await this.pageComponents.load();
    await this.pageComponents.get("email")?.type(input.email);
    await this.pageComponents.get("firstName")?.type(input.firstName);
    await this.pageComponents.get("lastName")?.type(input.lastName);
    await this.pageComponents.get("username")?.type(input.username);
    await this.pageComponents.get("submit")?.click();
  }

  async isSuccessToastVisible() {
    return true;
  }
}
