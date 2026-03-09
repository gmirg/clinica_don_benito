const { createServer } = require('http');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOST || '0.0.0.0';
const port = Number(process.env.PORT || 3000);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = createServer((req, res) => handle(req, res));

    server.on('error', (error) => {
      console.error('Error binding Next server port', error);
      process.exit(1);
    });

    server.listen(port, hostname, () => {
      console.log(`Next server running on http://${hostname}:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error starting Next server', error);
    process.exit(1);
  });
