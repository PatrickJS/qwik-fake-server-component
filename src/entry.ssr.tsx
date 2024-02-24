/**
 * WHAT IS THIS FILE?
 *
 * SSR entry point, in all cases the application is rendered outside the browser, this
 * entry point will be the common one.
 *
 * - Server (express, cloudflare...)
 * - npm run start
 * - npm run preview
 * - npm run build
 *
 */
import {
  renderToStream,
  // renderToString,
  type RenderToStreamOptions,
} from "@builder.io/qwik/server";
import { manifest } from "@qwik-client-manifest";
import Root from "./root";
import * as ServerComponents from "./entry.server-component";
import Context from "./context";

export default function (opts: RenderToStreamOptions) {
  const url = new URL(opts.serverData?.url || "/");
  const strCmp = url.searchParams.get("qComponent");
  const strProps = url.searchParams.get("qProps");
  // console.log("strCmp", strCmp, Object.keys(ServerComponents));
  let isRoot = true;
  let Cmp =
    Object.keys(ServerComponents).find((k) => k === strCmp) &&
    (ServerComponents as any)[strCmp as string];
  if (Cmp) {
    isRoot = false;
    let props = {};
    try {
      strProps && (props = JSON.parse(strProps));
    } catch (err) {
      //
    }
    // need context
    Cmp = (
      <Context>
        <Cmp {...props} />
      </Context>
    );
  }
  const sharedConfig = {};
  if (isRoot) {
    return renderToStream(<Root />, {
      manifest,
      ...opts,
      ...sharedConfig,
      containerAttributes: {
        lang: "en-us",
        ...opts.containerAttributes,
      },
    });
  }

  const html = renderToStream(Cmp, {
    manifest,
    ...opts,
    // Use container attributes to set attributes on the html tag.
    containerTagName: "q-server-component",
    qwikLoader: {
      include: "never",
    },
    containerAttributes: {
      ...opts.containerAttributes,
      id: "qwik-container",
    },
  });
  return html;
}
