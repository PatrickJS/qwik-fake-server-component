import { component$, useSignal, useTask$ } from '@builder.io/qwik';
import { DocumentHead, server$ } from '@builder.io/qwik-city';

import * as fs from 'node:fs';
import * as path from 'node:path';

export default component$(() => {
  const val = useSignal('');
  useTask$(async () => {
    const file = await server$(() =>
      fs.readFileSync(path.join(__dirname, __filename), 'utf-8')
    );
    const data = await file();
    console.log(data);
    val.value = data;
  });
  return (
    <>
      <div style={{ padding: '1rem' }}>{val.value}</div>
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
