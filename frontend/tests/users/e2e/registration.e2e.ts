import path from "path";
import { defineFeature, loadFeature } from "jest-cucumber";

import { CreateUserInput } from "../../../src/modules/users/DTOs/userDTOs";
import { UserBuilder } from "./builders/UserBuilder";

const feature = loadFeature(path.join(__dirname, "./registration.feature"));

defineFeature(feature, (test) => {
  test("Successful registration", ({ given, when, then, and }) => {
    let createUserInput: CreateUserInput;

    beforeAll(async () => {});

    afterAll(async () => {});

    given("I am a new user", () => {
      createUserInput = new UserBuilder().build();
      console.log(createUserInput);
    });

    when("I register with valid account details", async () => {});

    then("I should be granted access to my account", () => {});

    and("I should receive an email with login instructions", () => {
      // can't test at this level, verify this at a deeper level
    });
  });
});
