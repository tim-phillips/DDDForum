import path from "path";

import { defineFeature, loadFeature } from "jest-cucumber";
import { Response } from "supertest";

import { RestApiDriver } from "../../../src/shared/http/RestApiDriver";
import { http } from "../../../src/index";
import { UserBuilder } from "./builders/UserBuilder";
import { CreateUserInput } from "../../../src/modules/users/DTOs/userDTOs";

const feature = loadFeature(path.join(__dirname, "./registration.feature"));

defineFeature(feature, (test) => {
  test("Successful registration", ({ given, when, then, and }) => {
    let driver = new RestApiDriver(http);
    let response: Response;
    let createUserInput: CreateUserInput;

    beforeAll(() => {
      // TODO start server
      // TODO clear db
    });

    afterAll(() => {
      // TODO stop server
    });

    given("I am a new user", () => {
      createUserInput = new UserBuilder().build();
    });

    when("I register with valid account details", async () => {
      response = await driver.post("/users/new", createUserInput);
    });

    then("I should be granted access to my account", () => {
      console.log(response);
      expect(response.body.success).toBeTruthy();
      expect(response.body.error).toBeFalsy();
      expect(response.body.data).toBeDefined();
      expect(response.body.data.id).toBeDefined();
      expect(response.body.data.email).toEqual(createUserInput.email);
      expect(response.body.data.firstName).toEqual(createUserInput.firstName);
      expect(response.body.data.lastName).toEqual(createUserInput.lastName);
      expect(response.body.data.username).toEqual(createUserInput.username);
    });

    and("I should receive an email with login instructions", () => {
      // can't test at this level, verify this at a deeper level
    });
  });
});
