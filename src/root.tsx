import { component$ } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";
import { serverComponent$ } from "~/@fake-server-components/server-components";

// import "./global.css";
import { promises as fs } from "node:fs";
import { join } from "node:path";
import Context from "./context";

export default serverComponent$(async () => {
  const filename = new URL(import.meta.url).pathname.toString();
  const ROOT_PATH = join(filename, "..");
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */

  return (
    <Context>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
        <ServiceWorkerRegister />
        <style
          dangerouslySetInnerHTML={
            /*css*/ `
${await fs.readFile(join(ROOT_PATH, "./global.css"), "utf-8")}
${await fs.readFile(join(ROOT_PATH, "./routes/styles.css"), "utf-8")}
`
          }
        />
      </head>
      <body lang="en">
        <RouterOutlet />
      </body>
    </Context>
  );
});
