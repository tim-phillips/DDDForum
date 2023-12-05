import path from "path";

import { defineFeature, loadFeature } from "jest-cucumber";
import { Response } from "supertest";
import { Server } from "http";

import { RestApiDriver } from "../../../src/shared/http/RestApiDriver";
import { WebServer } from "../../../src/shared/http/WebServer";
import { CreateUserInput } from "../../../src/modules/users/DTOs/userDTOs";
import { UserBuilder } from "./builders/UserBuilder";

const feature = loadFeature(path.join(__dirname, "./registration.feature"));

defineFeature(feature, (test) => {
  test("Successful registration", ({ given, when, then, and }) => {
    let webServer: WebServer = new WebServer();
    let driver: RestApiDriver;
    let response: Response;
    let createUserInput: CreateUserInput;

    beforeAll(async () => {
      await webServer.start();
      driver = new RestApiDriver(webServer.getHttp() as Server);
      // clear db
    });

    afterAll(async () => {
      await webServer.stop();
    });

    given("I am a new user", () => {
      createUserInput = new UserBuilder().build();
    });

    when("I register with valid account details", async () => {
      response = await driver.post("/users/new", createUserInput);
    });

    then("I should be granted access to my account", () => {
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
