import { component$, useSignal, useTask$ } from '@builder.io/qwik';
import { isServer } from '@builder.io/qwik/build';
import { DocumentHead, server$ } from '@builder.io/qwik-city';

import * as fs from 'node:fs';
import * as path from 'node:path';

// export const getFile = server$(async () => {
//   console.log('path', _path)
//   return file;
// });

export default component$(() => {
  const val = useSignal('');
  if (isServer) {
    const _path = path.join(__dirname, __filename);
    const file = fs.readFileSync(_path, 'utf-8')
    console.log(file)
  }
  // useTask$(async () => {
  //   val.value = await getFile();
  // });
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
