# EcoLoop – Smart E-Waste Management & Circular Economy Platform

## Architecture & Stack

- **Frontend (`client/`)**: React, TypeScript, Vite, Tailwind CSS v4 (`@tailwindcss/vite`), React Router, Zustand
- **Backend (`server/`)**: Node.js, Express 5, TypeScript (ESM), Helmet, CORS, dotenv, `tsx`

## Project Structure

```text
ecoloop/
├── client/          # Vite + React + TypeScript frontend
│   └── src/
├── server/          # Express 5 + TypeScript ESM backend
│   └── src/
├── .gitignore
└── README.md
```

## Prerequisites

- Node.js 22+ (verified on Node.js 24)
- npm 10+

## Environment Setup

Copy the example environment files before adding local configuration values (never commit `.env` files):

```bash
cp client/.env.example client/.env
cp server/.env.example server/.env
```

## Installation

Install dependencies separately in both workspaces:

```bash
cd client && npm install
cd ../server && npm install
```

## Running Locally

Start the Express backend (defaults to port `5000`):

```bash
cd server
npm run dev
```

Verify backend health:

```bash
curl http://localhost:5000/health
```

Start the Vite frontend (runs on port `5173`, proxies `/api` to `http://localhost:5000`):

```bash
cd client
npm run dev
```

## Typecheck & Build

Run in `client/` and `server/`:

```bash
npm run typecheck
npm run build
```
