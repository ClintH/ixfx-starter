/* eslint-disable unicorn/import-style */
//const path = require(`path`);
import { join } from 'node:path';
import { fastify } from 'fastify';
import * as ws from '@fastify/websocket';
import { fastifyStatic } from '@fastify/static';

import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Require the fastify framework and instantiate it
const f = fastify({
  // Set this to true for detailed logging:
  logger: false,
});

// Websockets
const WS_OPEN = 1;

f.register(ws);
f.register(async function (fastify) {
  fastify.get(`/ws`, { websocket: true }, (socket /* WebSocket */, request /* FastifyRequest */) => {
    socket.on(`message`, (message, isBinary) => {
      for (const client of fastify.websocketServer.clients) {
        if (client.readyState !== WS_OPEN) continue;
        if (client !== socket) client.send(message, { binary: isBinary });
      }
    })
  })
})

console.log(join(__dirname, `docs`));

// Setup our static files
f.register(fastifyStatic, {
  root: join(__dirname, `docs/`),
  prefix: `/`, // optional: default '/'
  list: {
    format: `html`,
    render: (directories, files) => {
      return `
        <html><body>
        <ul>
          ${directories.map(dir => `<li><a href="${dir.href}">${dir.name}</a></li>`).join(`\n  `)}
        </ul>
        <ul>
          ${files.map(file => `<li><a href="${file.href}" target="_blank">${file.name}</a></li>`).join(`\n  `)}
        </ul>
        </body></html>
        `
    }
  }
});

f.listen(
  { port: process.env.PORT ?? 5500, host: `0.0.0.0` },
  function (error, address) {
    if (error) {
      console.error(error);
      // eslint-disable-next-line unicorn/no-process-exit
      process.exit(1);
    }
    console.log(`Your app is listening on ${address}`);
  }
);
