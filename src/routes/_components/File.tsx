import { JSXOutput, componentQrl } from "@builder.io/qwik";

import { promises as fs } from "node:fs";
import { join } from "node:path";

// fake asf server component don't actually use this
export function serverComponentQrl(qrl: (props?: any) => Promise<JSXOutput>) {
  // @ts-ignore
  return componentQrl(qrl);
}
export const serverComponent$ = serverComponentQrl;

export const File = serverComponent$(async (props) => {
  const filename = new URL(import.meta.url).pathname.toString();
  const ROOT_PATH = join(filename, "..", "..", "..", "..");
  let file = await fs.readFile(join(ROOT_PATH, props.path), "utf-8");

  return <pre>{file}</pre>;
});
