import { JSXOutput, component$, useSignal } from "@builder.io/qwik";
import { server$, useLocation } from "@builder.io/qwik-city";

import { promises as fs } from "node:fs";
import { File } from "../_components/File";

const updateVal = server$(() => {
  return Math.random();
});

const serverJsx = server$(async (props: any, scope: any) => {
  const filename = new URL(import.meta.url).pathname;
  let file = await fs.readFile(filename, "utf-8");
  return (
    <div data-component={scope.loc.url.pathname}>
      <h1>Server$ component</h1>
      <button
        onClick$={async (_e, target) => {
          scope.serverVal.value += await updateVal();
        }}
      >
        update server signal
      </button>
      <div>
        <h2>Random Number</h2>
        <pre>{Math.random()}</pre>
      </div>
      <div>
        <h2>Server Signal</h2>
        <pre>{scope.serverVal.value}</pre>
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

// @ts-ignore
export default component$((props: any): Promise<JSXOutput> => {
  const loc = useLocation();
  const serverVal = useSignal("hello");

  return serverJsx(props, { loc, serverVal });
});
