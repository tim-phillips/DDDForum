import { Server } from "http";

import { RestApiDriver } from "./RestApiDriver";
import { WebServer } from "./WebServer";

describe(WebServer.name, () => {
  let webServer = new WebServer();

  describe("starting and stopping", () => {
    beforeEach(() => webServer.stop());
    afterEach(() => webServer.stop());

    it("can start", async () => {
      await webServer.start();
      expect(webServer.isRunning()).toBeTruthy();
    });

    test("once started, it can be stopped", async () => {
      await webServer.start();
      await webServer.stop();
      expect(webServer.isRunning()).toBeFalsy();
    });
  });

  describe("health", () => {
    beforeEach(() => webServer.start());
    afterEach(() => webServer.stop());

    test("is healthy", async () => {
      let driver = new RestApiDriver(webServer.getServer() as Server);
      let response = await driver.get("/health");

      expect(response.statusCode).toBe(200);
      expect(response.ok).toBeTruthy();
    });
  });
});
