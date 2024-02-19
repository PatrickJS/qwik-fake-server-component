```jsx

export default async function handler() {
  const file = await readFile('index.html', 'utf8')

  return `
  <html>
    <head>
      <title>Serverless Framework</title>
    </head>
    <body>
      <h1>Serverless Framework</h1>
      <p>Deployed via Serverless Framework</p>
      <pre>${file}</pre>
    </body>
  </html>
  `
}

```