import { useLocation } from "@builder.io/qwik-city";
import { serverComponent$ } from "~/@fake-server-components/server-components";

import { promises as fs } from "node:fs";

export default serverComponent$(async (props: any) => {
  const loc = useLocation();
  const filename = new URL(import.meta.url).pathname;
  let file = await fs.readFile(filename, "utf-8");

  return (
    <div data-component={loc.url.pathname}>
      <h1>Welcome to Qwik</h1>
      <button
        onClick$={async (_e, target) => {
          // client router grab updated content from server router
          // location.reload();

          // fake serverComponent$ fetch like server$ fetch
          const Component = "Index";
          // const props = {};

          const html = await fetch(`?qComponent=${Component}`).then((res) =>
            res.text()
          );
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, "text/html");
          const query = `[data-component]`;
          // debugger;
          target.closest(query)!.innerHTML =
            doc.querySelector(query)!.innerHTML;
        }}
      >
        update
      </button>
      <pre>{Math.random()}</pre>
      <pre>{file}</pre>
    </div>
  );
});
