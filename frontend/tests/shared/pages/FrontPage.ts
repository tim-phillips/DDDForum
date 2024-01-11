import { PuppeteerPageDriver } from "../drivers/PuppeteerPageDriver";

export class FrontPage {
  constructor(private driver: PuppeteerPageDriver) {}

  async open() {
    const page = await this.driver.getPage();
    await page.goto("http://localhost:5173/");
  }

  async clickJoin() {}

  async isOnPage() {
    return true;
  }
}
