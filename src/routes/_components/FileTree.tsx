import { JSXOutput, componentQrl } from "@builder.io/qwik";

import { promises as fs } from "node:fs";
import { join, resolve, relative } from "node:path";

import { File } from "./File";

// fake asf server component don't actually use this
export function serverComponentQrl(qrl: (props?: any) => Promise<JSXOutput>) {
  // @ts-ignore
  return componentQrl(qrl);
}
export const serverComponent$ = serverComponentQrl;

export const FileTree = serverComponent$(async (props) => {
  const filename = new URL(import.meta.url).pathname.toString();
  const ROOT_PATH = join(filename, "..", "..", "..", "..");

  // Recursive function that returns JSX
  async function getFiles(dir: string): Promise<JSXOutput> {
    const dirents = await fs.readdir(dir, { withFileTypes: true });

    const files = await Promise.all(
      dirents.map(async (dirent, i) => {
        const relativePathFromRoot = relative(
          ROOT_PATH,
          resolve(dir, dirent.name)
        );

        if (dirent.isDirectory()) {
          return (
            <div key={dirent.name + i}>
              <div>Directory: {dirent.name}</div>
              <div>{await getFiles(relativePathFromRoot)}</div>
            </div>
          );
        } else {
          return (
            <div key={relativePathFromRoot + i}>
              <div>{dirent.name}</div>
              <File path={relativePathFromRoot} />
            </div>
          );
        }
      })
    );

    return files;
  }

  return (
    <>
      <div>
        <div>Root:</div>
        {await getFiles(join(ROOT_PATH, props.path))}
      </div>
    </>
  );
});
