import app from './app.js';
import { env } from './config/env.js';

const server = app.listen(env.port, () => {
  console.log(`EcoLoop server listening on http://localhost:${env.port} (${env.nodeEnv})`);
});

function shutdown(signal: string) {
  console.log(`${signal} received. Shutting down EcoLoop server...`);
  server.close(() => {
    process.exit(0);
  });
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
