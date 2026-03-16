# AGENTS.md - Coding Agent Guidelines for DailyHot

This document provides essential information for AI coding agents working in this repository.

## Project Overview

DailyHot is a monorepo containing two projects:
- **`api/`** - Backend API (TypeScript + Hono + Node.js)
- **`web/`** - Frontend (Vue 3 + Vite + Pinia + Naive UI)

---

## Build/Lint/Test Commands

### API (`api/` directory)

```bash
pnpm dev          # Development server with hot reload (tsx watch)
pnpm dev:cache    # Dev server with caching enabled
pnpm build        # Build TypeScript to dist/
pnpm start        # Start production server (node dist/index.js)
pnpm lint         # Run ESLint
pnpm format       # Format with Prettier
```

### Web (`web/` directory)

```bash
pnpm dev          # Development server (port 6699)
pnpm build        # Production build (Vite + Terser)
pnpm preview      # Preview production build
```

**Note:** No test framework is currently configured. Running single tests is not applicable.

---

## Project Structure

```
DailyHot/
├── api/
│   ├── src/
│   │   ├── routes/        # API route handlers (one file per source)
│   │   ├── utils/         # Utilities (getData, cache, logger, etc.)
│   │   ├── views/         # JSX view components
│   │   ├── app.tsx        # Hono app configuration
│   │   ├── config.ts      # Environment configuration
│   │   ├── index.ts       # Entry point
│   │   ├── registry.ts    # Route registration
│   │   └── types.d.ts     # TypeScript type definitions
│   ├── eslint.config.js
│   ├── tsconfig.json
│   └── .prettierrc.js
├── web/
│   ├── src/
│   │   ├── api/           # API request modules
│   │   ├── components/    # Vue components
│   │   ├── router/        # Vue Router configuration
│   │   ├── store/         # Pinia store
│   │   ├── utils/         # Utility functions
│   │   ├── views/         # Page components
│   │   ├── App.vue
│   │   └── main.js
│   └── vite.config.js
└── Dockerfile             # Multi-stage Docker build
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

#### Imports
```javascript
// Vue imports first
import { ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";

// External packages
import { Refresh, More } from "@icon-park/vue-next";

// Local imports with @ alias
import { getHotLists } from "@/api";
import { mainStore } from "@/store";
```

#### Vue Component Structure
```vue
<template>
  <!-- Template content -->
</template>

<script setup>
// Imports
import { ref, watch, onMounted } from "vue";

// Props
const props = defineProps({
  propName: {
    type: Object,
    default: {},
  },
});

// Reactive state
const loading = ref(false);
const data = ref(null);

// Methods
const fetchData = async () => {
  // Implementation
};

// Lifecycle
onMounted(() => {
  fetchData();
});
</script>

<style lang="scss" scoped>
/* Component styles */
</style>
```

#### Naming Conventions
- Components: PascalCase (e.g., `HotList.vue`, `Header.vue`)
- Variables/Functions: camelCase
- CSS classes: kebab-case

#### Pinia Store Pattern
```javascript
import { defineStore } from "pinia";

export const mainStore = defineStore("storeName", {
  state: () => ({
    // State properties
  }),
  getters: {
    // Computed properties
  },
  actions: {
    // Methods
  },
  persist: [
    // Persistence config
  ],
});
```

#### Error Handling
```javascript
// In components, use Naive UI's message service
try {
  const result = await getHotLists(type);
  if (result.code === 200) {
    // Success
  } else {
    $message.error(result.title + result.message);
  }
} catch (error) {
  $message.error("操作失败，请重试");
}

// In axios interceptors (request.js)
axios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    $message.error(data.message || "请求失败，请稍后重试");
    return Promise.reject(error);
  }
);
```

---

## Configuration Files

| File | Purpose |
|------|---------|
| `api/tsconfig.json` | TypeScript config (strict, ESNext, ES modules) |
| `api/eslint.config.js` | ESLint with TypeScript support |
| `api/.prettierrc.js` | Prettier formatting rules |
| `web/vite.config.js` | Vite build config with PWA, auto-imports |

---

## Important Notes

1. **API uses ES Modules** - Always include `.js` extension in local imports
2. **Vue uses script setup** - Always use `<script setup>` syntax
3. **Naive UI auto-import** - Components are auto-imported via unplugin
4. **API caching** - Uses node-cache with configurable TTL
5. **CORS** - Configured in `api/src/app.tsx`
6. **Environment variables** - See `api/.env.example` and `web/.env`