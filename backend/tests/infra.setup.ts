import { GlobalSetup } from "./GlobalSetup";

export default function () {
  const globalSetup = new GlobalSetup();
  globalSetup.runGlobalSetup();
}
