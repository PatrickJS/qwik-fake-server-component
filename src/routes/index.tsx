import { component$, useSignal, useTask$ } from '@builder.io/qwik';
import { isServer } from '@builder.io/qwik/build';
import { DocumentHead, server$ } from '@builder.io/qwik-city';

import * as fs from "node:fs";

export default component$(() => {
  let file = "";

  if (isServer) {
    const filename = new URL(import.meta.url).pathname;
    file = fs.readFileSync(filename, "utf-8");
  }

  return (
    <>
      <pre>{file}</pre>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
