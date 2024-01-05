import { Server } from "http";

import { CompositionRoot } from "../composition/CompositionRoot";
import { RestApiDriver } from "./RestApiDriver";

describe("WebServer", () => {
  const root = new CompositionRoot();
  const webServer = root.getWebServer();

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
      const driver = new RestApiDriver(webServer.getServer() as Server);
      const response = await driver.get("/health");

      expect(response.statusCode).toBe(200);
      expect(response.ok).toBeTruthy();
    });
  });
});
