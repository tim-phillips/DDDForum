import puppeteer, { Browser, Page, PuppeteerLaunchOptions } from "puppeteer";

export class PuppeteerPageDriver {
  private constructor(
    private browser: Browser,
    private page: Page
  ) {}

  public static async create(options: PuppeteerLaunchOptions = {}) {
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    return new PuppeteerPageDriver(browser, page);
  }

  async close() {
    await this.browser.close();
  }

  getPage() {
    return this.page;
  }
}
