import express from 'express';
import path from 'node:path';
import { createServer, appRoot } from './app.mjs';

try { process.loadEnvFile(path.join(appRoot, '.env.local')); }
catch (error) { if (error.code !== 'ENOENT') throw error; }
const development = process.argv.includes('--dev');
const arg = (name, fallback) => {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : fallback;
};
const port = Number(arg('--port', process.env.PORT || 4173));
const host = arg('--host', process.env.HOST || '127.0.0.1');
process.env.SF0_ORIGIN ||= `http://127.0.0.1:${port}`;
const app = createServer({ development });
let vite;
if (development) {
  const { createServer: createViteServer } = await import('vite');
  vite = await createViteServer({ root: appRoot, server: { middlewareMode: true, hmr: false } });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.join(appRoot, 'dist'), { index: 'index.html', maxAge: 0, etag: false }));
  app.get('/{*path}', (_req, res) => res.sendFile(path.join(appRoot, 'dist/index.html')));
}
const server = app.listen(port, host, () => console.log(`SF0 protected ${development ? 'local' : 'production'} server: ${process.env.SF0_ORIGIN}`));
server.on('error', error => { console.error(error.message); process.exitCode = 1; vite?.close(); });
