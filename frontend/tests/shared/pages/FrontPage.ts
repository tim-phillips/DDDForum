import { PuppeteerPageDriver } from "../drivers/PuppeteerPageDriver";
import { PageComponents } from "./PageComponents/PageComponents";

export class FrontPage {
  private pageDriver: PuppeteerPageDriver;
  private pageComponents: PageComponents;

  constructor(pageDriver: PuppeteerPageDriver) {
    this.pageDriver = pageDriver;
    this.pageComponents = new PageComponents({
      driver: this.pageDriver,
      elements: {
        menu: { selector: "#menu", type: "div" },
      },
      timeout: 3000,
    });
  }

  async open() {
    const page = await this.pageDriver.getPage();
    await page.goto("http://localhost:5173/");
  }

  async clickJoin() {
    await this.pageComponents.load();
    const menu = this.pageComponents.get("menu");
    await menu.click();
  }

  async getMenuText() {
    await this.pageComponents.load();
    const menu = this.pageComponents.get("menu");
    return menu.evaluate((e) => e.textContent);
  }

  async isOnPage() {
    return true;
  }
}
