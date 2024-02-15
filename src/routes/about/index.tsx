import { JSXOutput, componentQrl } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";

import { promises as fs } from "node:fs";
import { File } from "../_components/File";

// fake asf server component don't actually use this
export function serverComponentQrl(qrl: () => Promise<JSXOutput>) {
  // @ts-ignore
  return componentQrl(qrl);
}
export const serverComponent$ = serverComponentQrl;

export default serverComponent$(async () => {
  const loc = useLocation();
  const filename = new URL(import.meta.url).pathname;
  let file = await fs.readFile(filename, "utf-8");

  return (
    <div data-component={loc.url.pathname}>
      <h1>About Qwik</h1>
      <button
        onClick$={async (_e, target) => {
          // client router grab updated content from server router
          // location.reload();

          const html = await fetch(location.href).then((res) => res.text());
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, "text/html");
          const query = `[data-component]`;
          target.closest(query)!.innerHTML =
            doc.querySelector(query)!.innerHTML;
        }}
      >
        update
      </button>
      <div>
        <h2>Random Number</h2>
        <pre>{Math.random()}</pre>
      </div>
      <div>
        <h2>File</h2>
        <File path="/tmp/qwik.txt" />
      </div>
      <div>
        <h2>File from route</h2>
        <pre>{file}</pre>
      </div>
    </div>
  );
});
