import { JSXOutput, component$, useSignal } from "@builder.io/qwik";
import { server$, useLocation } from "@builder.io/qwik-city";

import { promises as fs } from "node:fs";

const serverJsx = server$(async (props: any, scope: any) => {
  const filename = new URL(import.meta.url).pathname;
  let file = await fs.readFile(filename, "utf-8");
  return (
    <div data-component={scope.loc.url.pathname}>
      <h1>Server$ component again</h1>
      <button
        onClick$={async (_e, target) => {
          scope.serverVal.value += " world";
        }}
      >
        update
      </button>
      <pre>{Math.random()}</pre>
      <pre>{scope.serverVal.value}</pre>
      <pre>{file}</pre>
    </div>
  );
});

// @ts-ignore
export default component$((props: any): Promise<JSXOutput> => {
  const loc = useLocation();
  const serverVal = useSignal("hello again");

  return serverJsx(props, { loc, serverVal });
});
