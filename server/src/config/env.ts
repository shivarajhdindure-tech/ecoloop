import dotenv from 'dotenv';

dotenv.config();

function parsePort(rawPort: string | undefined, fallback: number): number {
  if (!rawPort) {
    return fallback;
  }

  const parsed = Number(rawPort);
  if (!Number.isInteger(parsed) || parsed < 1 || parsed > 65535) {
    throw new Error(`Invalid PORT value: "${rawPort}". Expected an integer between 1 and 65535.`);
  }

  return parsed;
}

function parseOrigins(rawOrigin: string | undefined, fallback: string): string | string[] {
  const value = (rawOrigin ?? fallback).trim();
  const origins = value
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  if (origins.length === 0) {
    return fallback;
  }

  return origins.length === 1 ? origins[0] : origins;
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: parsePort(process.env.PORT, 5000),
  clientOrigin: parseOrigins(process.env.CLIENT_ORIGIN, 'http://localhost:5173'),
} as const;
