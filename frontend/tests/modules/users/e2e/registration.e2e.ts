import path from "path";
import { defineFeature, loadFeature } from "jest-cucumber";

import { PuppeteerPageDriver } from "../../../shared/drivers/PuppeteerPageDriver";
import { FrontPage } from "../../../shared/pages/FrontPage";
import { RegistrationPage } from "../../../shared/pages/RegistrationPage";
import { UserBuilder } from "./builders/UserBuilder";
import { CreateUserInput } from "../../../../src/modules/users/DTOs/userDTOs";

const feature = loadFeature(path.join(__dirname, "./registration.feature"));

defineFeature(feature, (test) => {
  test("Successful registration", ({ given, when, then, and }) => {
    let pageDriver: PuppeteerPageDriver;
    let frontPage: FrontPage;
    let registrationPage: RegistrationPage;
    let createUserInput: CreateUserInput;

    beforeAll(async () => {
      pageDriver = await PuppeteerPageDriver.create({ headless: "new" });
      frontPage = new FrontPage(pageDriver);
      registrationPage = new RegistrationPage(pageDriver);
    });

    afterAll(async () => {
      await pageDriver.close();
    });

    given("I am a new user", async () => {
      createUserInput = new UserBuilder().build();

      await frontPage.open();
      await frontPage.clickJoin();
    });

    when("I register with valid account details", async () => {
      await registrationPage.register(createUserInput);
    });

    then("I should be granted access to my account", async () => {
      expect(await registrationPage.isSuccessToastVisible()).toBeTruthy();
      expect(await frontPage.isOnPage()).toBeTruthy();
      expect(await frontPage.getMenuText()).toContain(createUserInput.username);
    });

    and("I should receive an email with login instructions", () => {
      // can't test at this level, verify this at a deeper level
    });
  });
});
