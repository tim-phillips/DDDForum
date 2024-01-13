import { ElementHandle } from "puppeteer";
import { PuppeteerPageDriver } from "../../drivers/PuppeteerPageDriver";

const DEFAULT_TIMEOUT = 3000;

type ElementType = "div" | "button" | "input";

interface Config {
  elements: {
    [key: string]: {
      selector: string;
      type: ElementType;
    };
  };
  driver: PuppeteerPageDriver;
  timeout?: number;
}

interface LoadedPageComponents {
  [key: string]: {
    selector: string;
    type: ElementType;
    element: ElementHandle<Element>;
  };
}

export class PageComponents {
  private loadedPageComponents: LoadedPageComponents;

  constructor(private config: Config) {
    this.loadedPageComponents = {};
  }

  async load() {
    const newLoadedPageComponents: LoadedPageComponents = {};
    const { driver, elements, timeout = DEFAULT_TIMEOUT } = this.config;
    const page = await driver.getPage();
    let element: ElementHandle<Element> | null;

    for (const key in elements) {
      const component = elements[key];
      try {
        element = await page.waitForSelector(component.selector, { timeout });
      } catch (err) {
        throw new Error(
          `Could not load element '${key}', maybe it's not on the page yet.`
        );
      }
      if (!element) {
        throw new Error(
          `Could not load element '${key}', maybe it's not on the page yet.`
        );
      }
      newLoadedPageComponents[key] = { ...component, element };
    }

    this.loadedPageComponents = newLoadedPageComponents;
  }

  get(name: string): ElementHandle<Element> | undefined {
    const isLoaded = Object.keys(this.loadedPageComponents).length;
    if (!isLoaded) {
      throw new Error(
        "Page components not yet loaded, make sure to call `.load()`"
      );
    }
    const element = this.loadedPageComponents[name].element;
    if (element === undefined) {
      throw new Error(`Component '${name}' not loaded`);
    }
    return element;
  }
}
