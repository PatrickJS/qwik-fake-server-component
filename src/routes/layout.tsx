import { component$, Slot, $, useStyles$ } from "@builder.io/qwik";
import {
  // Link,
  useLocation,
} from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";

import styles from "./styles.css?inline";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export default component$(() => {
  useStyles$(styles);
  const loc = useLocation();
  const onClick = $(async (e: Event, a: HTMLAnchorElement) => {
    const html = await fetch(a.href).then((res) => res.text());
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    document.body!.innerHTML = doc.body!.innerHTML;
    history.pushState(null, "", a.href);
  });

  return (
    <div>
      <ul style="list-style-type: none; margin: 0; padding: 0; overflow: hidden; background-color: #333;">
        <li style="float: left;">
          <a
            href="/"
            style="display: block; color: white; text-align: center; padding: 14px 16px; text-decoration: none;"
            preventdefault:click
            onClick$={onClick}
          >
            {loc.url.pathname === "/" ? "[Home]" : "Home"}
          </a>
        </li>
        <li style="float: left;">
          <a
            href="/about/"
            style="display: block; color: white; text-align: center; padding: 14px 16px; text-decoration: none;"
            preventdefault:click
            onClick$={onClick}
          >
            {/about/.test(loc.url.pathname) ? "[About]" : "About"}
          </a>
        </li>

        <li style="float: left;">
          <a
            href="/file-explorer/"
            style="display: block; color: white; text-align: center; padding: 14px 16px; text-decoration: none;"
          >
            {/file-explorer\/$/.test(loc.url.pathname)
              ? "[file-explorer]"
              : "file-explorer"}
          </a>
        </li>
        <li style="float: left;">
          <a
            href="/server-component/"
            style="display: block; color: white; text-align: center; padding: 14px 16px; text-decoration: none;"
          >
            {/server-component\/$/.test(loc.url.pathname)
              ? "[server-component]"
              : "server-component"}
          </a>
        </li>
        <li style="float: left;">
          <a
            href="/server-component-again/"
            style="display: block; color: white; text-align: center; padding: 14px 16px; text-decoration: none;"
          >
            {/server-component-again/.test(loc.url.pathname)
              ? "[server-component-again]"
              : "server-component-again"}
          </a>
        </li>
        <li style="float: left;">
          <a
            href=""
            style="display: block; color: white; text-align: center; padding: 14px 16px; text-decoration: none;"
          >
            my.email@example.com
          </a>
        </li>
      </ul>
      <main style={{ padding: "1rem" }}>
        <Slot />
      </main>
    </div>
  );
});
