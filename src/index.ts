import { CompositionRoot } from "./shared/composition/CompositionRoot";

const root = new CompositionRoot();
const webServer = root.getWebServer();
webServer.start();
