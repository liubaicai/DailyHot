# AGENTS.md - Coding Agent Guidelines for DailyHot

This document provides essential information for AI coding agents working in this repository.

## Project Overview

DailyHot is a hot news aggregation API service.
- **TypeScript + Hono + Node.js**
- Supports JSON and RSS output
- Deployable via Docker, Vercel, or standalone Node.js

---

## Build/Lint/Test Commands

```bash
pnpm dev          # Development server with hot reload (tsx watch)
pnpm dev:cache    # Dev server with caching enabled
pnpm build        # Build TypeScript to dist/
pnpm start        # Start production server (node dist/index.js)
pnpm lint         # Run ESLint
pnpm format       # Format with Prettier
```

**Note:** No test framework is currently configured.

---

## Project Structure

```
DailyHot/
├── src/
│   ├── routes/        # API route handlers (one file per source)
│   ├── utils/         # Utilities (getData, cache, logger, feedMeta, etc.)
│   ├── views/         # JSX view components
│   ├── app.tsx        # Hono app configuration
│   ├── config.ts      # Environment configuration
│   ├── index.ts       # Entry point
│   ├── registry.ts    # Route registration
│   └── types.d.ts     # TypeScript type definitions
├── api/
│   └── index.mjs      # Vercel Serverless Function entry
├── public/            # Static assets
├── vercel.json        # Vercel deployment config
├── Dockerfile         # Docker build
├── eslint.config.js
├── tsconfig.json
└── .prettierrc.js
```

---

## Code Style Guidelines

### General Principles

- Use Chinese comments for documentation (project uses Chinese)
- Keep code clean and readable
- Follow existing patterns in the codebase

### API (TypeScript)

#### Imports
```typescript
// Use .js extension for local imports (ES modules)
import { config } from "./config.js";
import type { RouterData } from "../types.js";

// Node.js built-ins first, then external packages, then local modules
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { config } from "./config.js";
```

#### Formatting (Prettier)
- Double quotes for strings
- Trailing commas: always
- Semicolons: required
- Indent: 2 spaces
- Print width: 100 characters

#### TypeScript
- Strict mode enabled (`strict: true`)
- Use explicit types for function parameters and return values
- Define interfaces in `types.d.ts` for shared types
- Use type imports for types only: `import type { ... }`

#### Naming Conventions
- Files: kebab-case (e.g., `get-data.ts`, `zhihu.ts`)
- Variables/Functions: camelCase
- Interfaces/Types: PascalCase
- Constants: camelCase or SCREAMING_SNAKE_CASE for global constants

#### Error Handling
```typescript
// Use try-catch with logger
try {
  const result = await get<ResponseType>({ url, noCache });
  return result;
} catch (error) {
  logger.error("❌ [ERROR] request failed");
  throw error;
}

// Return error responses consistently
return c.json({ code: 500, message: "Error description" }, 500);
```

#### Route Handler Pattern
```typescript
// routes/example.ts
import type { RouterData } from "../types.js";
import { get } from "../utils/getData.js";

export const handleRoute = async (_: undefined, noCache: boolean) => {
  const listData = await getList(noCache);
  const routeData: RouterData = {
    name: "example",
    title: "Example Source",
    type: "热榜",
    link: "https://example.com",
    total: listData.data?.length || 0,
    ...listData,
  };
  return routeData;
};

const getList = async (noCache: boolean) => {
  // Implementation
};
```

### Web (Vue 3)

Removed. This repository is API-only.

---

## Configuration Files

| File | Purpose |
|------|---------|
| `tsconfig.json` | TypeScript config (strict, ESNext, ES modules) |
| `eslint.config.js` | ESLint with TypeScript support |
| `.prettierrc.js` | Prettier formatting rules |
| `vercel.json` | Vercel deployment config |

---

## Important Notes

1. **Uses ES Modules** - Always include `.js` extension in local imports
2. **API caching** - Uses node-cache with configurable TTL
3. **CORS** - Configured in `src/app.tsx`
4. **Environment variables** - See `.env.example`
5. **Vercel deployment** - Entry point is `api/index.mjs`, build output in `dist/`