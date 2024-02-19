import { useLocation } from "@builder.io/qwik-city";

import { promises as fs } from "node:fs";
import { File } from "../_components/File";
import { FileTree } from "../_components/FileTree";
import { serverComponent$ } from "~/@fake-server-components/server-components";

export default serverComponent$(async () => {
  const loc = useLocation();
  // const filename = new URL(import.meta.url).pathname;
  // let file = await fs.readFile(filename, "utf-8");

  return (
    <div data-component={loc.url.pathname}>
      <h1>File Explorer</h1>
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
        <style
          dangerouslySetInnerHTML={
            /*css*/ `
.file-tree ul {
  list-style-type: none;
}
.folder:before {
  content: "📁 ";
}
.file:before {
  content: "📄 ";
}
        `
          }
        />
        <div class="file-tree">
          <ul>
            <li>
              <span class="folder">Folder 1</span>
              <ul>
                <li>
                  <span class="file">File 1.1</span>
                </li>
                <li>
                  <span class="file">File 1.2</span>
                </li>
              </ul>
            </li>
            <li>
              <span class="folder">Folder 2</span>
              <ul>
                <li>
                  <span class="file">File 2.1</span>
                </li>
                <li>
                  <span class="folder">Subfolder 2.1</span>
                  <ul>
                    <li>
                      <span class="file">File 2.1.1</span>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <span class="file">File 3</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
});
