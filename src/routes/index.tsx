import { JSXOutput, componentQrl } from "@builder.io/qwik";

import { promises as fs } from "node:fs";

// fake asf server component don't actually use this
export function serverComponentQrl(qrl: () => Promise<JSXOutput>) {
  // @ts-ignore
  return componentQrl(qrl);
}
export const serverComponent$ = serverComponentQrl;

export default serverComponent$(async () => {
  const filename = new URL(import.meta.url).pathname;
  let file = await fs.readFile(filename, "utf-8");

  return (
    <div id="home">
      <h1>Welcome to Qwik</h1>
      <button
        onClick$={() => {
          location.reload();
        }}
      >
        update
      </button>
      <pre>{Math.random()}</pre>
      <pre>{file}</pre>
    </div>
  );
});
