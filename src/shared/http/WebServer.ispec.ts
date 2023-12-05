import { WebServer } from "./WebServer";

describe(WebServer.name, () => {
  let webServer = new WebServer();

  beforeEach(async () => {
    await webServer.stop();
  });

  afterEach(async () => {
    await webServer.stop();
  });

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
