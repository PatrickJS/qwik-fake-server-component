# Qwik Fake Server Component

```typescript
// meme repo btw
export default serverComponent$(async () => {
  const filename = new URL(import.meta.url).pathname;
  let file = await fs.readFile(filename, "utf-8");

  return (
    <div id="home">
      <h1>Welcome to Qwik</h1>
      <button
        onClick$={async () => {
          // client router get latest from server router
          // location.reload();

          const html = await fetch(location.href).then((res) => res.text());
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, "text/html");
          document.querySelector("#home")!.innerHTML =
            doc.querySelector("#home")!.innerHTML;
        }}
      >
        update
      </button>
      <pre>{Math.random()}</pre>
      <pre>{file}</pre>
    </div>
  );
});
```
