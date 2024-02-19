import {
  JSXOutput,
  component$,
  componentQrl,
  useSignal,
  useTask$,
} from "@builder.io/qwik";
import {
  RequestHandler,
  routeLoader$,
  useLocation,
} from "@builder.io/qwik-city";

import { promises as fs } from "node:fs";

export const ClientComponent = component$((props: any) => {
  const newVal = useSignal("hello");
  return (
    <>
      <div>I'm on the client</div>
      <button
        onClick$={() => {
          console.log("clicked");
          newVal.value += "world";
        }}
      >
        client component
      </button>
      <pre>{props.file}</pre>
    </>
  );
});

// fake asf server component don't actually use this
export function serverComponentQrl(qrl: () => Promise<JSXOutput>) {
  // @ts-ignore
  return componentQrl(qrl);
}
export const serverComponent$ = serverComponentQrl;

// export const onGet: RequestHandler = async ({ cacheControl }) => {
//   // Control caching for this request for best performance and to reduce hosting costs:
//   // https://qwik.builder.io/docs/caching/
//   cacheControl({
//     // Always serve a cached response by default, up to a week stale
//     staleWhileRevalidate: 60 * 60 * 24 * 7,
//     // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
//     maxAge: 5,
//   });
// };

// const useServer$ = routeLoader$(() => {

// });
export default serverComponent$(async () => {
  // const file = useSignal("");
  // const file = useSignal("");
  // const file = useSignal("");
  // const file = useSignal("");

  // useCacheSignals$(async (track) => {
  //   const loc = useLocation();
  //   const filename = new URL(import.meta.url).pathname;
  //   let file = await fs.readFile(filename, "utf-8");
  //   const randomVal = Math.random();
  // });

  // useTask$(async () => {
  //   file.value = server$(() => {
  //     return fs.readFile();
  //   });
  // });
  const loc = useLocation();
  const filename = new URL(import.meta.url).pathname;
  let file = await fs.readFile(filename, "utf-8");
  // let file = useServer$(async () => {
  //   return await fs.readFile(filename, "utf-8");
  // });
  const randomVal = Math.random();

  return (
    <div data-component={loc.url.pathname}>
      <h1>Welcome to Qwik</h1>
      <button
        onClick$={async (_e, target) => {
          // client router grab updated content from server router
          // location.reload();
          // router.refresh();

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
      <button
        onClick$={async (_e, target) => {
          // client router grab updated content from server router
          // location.reload();
          // router.refresh();

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
      <pre>{randomVal}</pre>
      <pre>{file}</pre>
      {/* <Suspense></Suspense> */}
      {/* <SuspenseList></SuspenseList> */}

      {/* qwik version */}
      {/* <Resource></Resource> */}
      <ClientComponent file={randomVal} />
    </div>
  );
});
