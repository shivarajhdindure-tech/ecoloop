import cors from 'cors';
import express, { type NextFunction, type Request, type Response } from 'express';
import helmet from 'helmet';
import { env } from './config/env.js';

interface AppError extends Error {
  statusCode?: number;
}

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.clientOrigin,
    credentials: true,
  }),
);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    service: 'ecoloop-server',
    environment: env.nodeEnv,
    timestamp: new Date().toISOString(),
  });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.originalUrl} does not exist`,
  });
});

app.use((err: AppError, _req: Request, res: Response, _next: NextFunction) => {
  const statusCode =
    typeof err.statusCode === 'number' && err.statusCode >= 400 && err.statusCode < 600
      ? err.statusCode
      : 500;

  const isProduction = env.nodeEnv === 'production';
  const message =
    statusCode === 500 && isProduction
      ? 'Internal Server Error'
      : err.message || 'Internal Server Error';

  if (!isProduction) {
    console.error(err);
  }

  res.status(statusCode).json({
    error: statusCode >= 500 ? 'Internal Server Error' : 'Request Error',
    message,
  });
});

export default app;
