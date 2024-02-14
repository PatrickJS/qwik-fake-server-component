import { JSXOutput, componentQrl } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";

import { promises as fs } from "node:fs";

// fake asf server component don't actually use this
export function serverComponentQrl(qrl: () => Promise<JSXOutput>) {
  // @ts-ignore
  return componentQrl(qrl);
}
export const serverComponent$ = serverComponentQrl;

export default serverComponent$(async function testFn() {
  const filename = new URL(import.meta.url).pathname;
  let file = await fs.readFile(filename, "utf-8");

  return (
    <div id="home">
      <h1>Welcome to Qwik</h1>
      <button
        onClick$={async () => {
          // client router get latest from server router
          // location.reload();

          const html = await fetch(location.href).then((res) => res.text());
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, "text/html");
          document.querySelector("#home")!.innerHTML =
            doc.querySelector("#home")!.innerHTML;
        }}
      >
        update
      </button>
      <pre>{Math.random()}</pre>
      <pre>{file}</pre>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
