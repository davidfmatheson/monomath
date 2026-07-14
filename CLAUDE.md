# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Workspace

This is an Nx monorepo (Nx 23) with no `libs/` content yet — all code lives under `apps/`. There are three logical projects, each with a paired `-e2e` project:

- **`micah-site`** — the real, actively developed application. An Angular 21 app (standalone components, Angular Material + CoreUI) that is Micah's personal site, with `home`, `videos`, and `pictures` routes (`apps/micah-site/src/app/app.routes.ts`). This is the only app deployed by CI (synced to the `micahmatheson.com` S3 bucket on push to `main`).
- **`plaid-sample`** — an Angular app scaffold, currently unmodified Nx boilerplate (`nx-welcome.component.ts`). Despite the name, no Plaid SDK is wired in yet.
- **`plaid-sample-api`** — a NestJS API scaffold, currently unmodified Nx/Nest boilerplate (`AppController`/`AppService` returning `{ message: 'Hello API' }`).

Treat `plaid-sample*` as a starting point, not a reference implementation — don't assume existing patterns there are intentional/final.

## Commands

Always run tasks through `nx` rather than the underlying tool directly (e.g. `ng`, `jest`, `cypress` binaries).

```bash
# Serve an app locally
nx serve micah-site            # Angular dev server on http://localhost:4200
nx serve plaid-sample-api      # Nest API on http://localhost:3000/api

# Build
nx build <project>             # e.g. nx build micah-site

# Lint
nx lint <project>
nx run-many -t lint            # all projects

# Unit tests (Jest)
nx test <project>
nx test <project> -t "<test name pattern>"   # single test by name
nx test <project> --testFile=<path>          # single spec file

# E2E tests (Cypress for Angular apps, Jest for plaid-sample-api-e2e)
nx e2e <project>-e2e           # e.g. nx e2e micah-site-e2e

# Run only what's affected by local changes vs main (mirrors CI)
nx affected -t lint test build --parallel=3
```

CI (`.github/workflows/ci.yml`) runs exactly `nx affected -t lint test build --parallel=3` against `origin/main`, then on pushes to `main` tags a version and deploys `dist/apps/micah-site/browser` to S3. There is no build-artifact deploy step for `plaid-sample`/`plaid-sample-api`.

## Architecture notes

- Module boundaries are enforced via `@nx/enforce-module-boundaries` in `.eslintrc.json`, but `depConstraints` currently allow any tagged project to depend on any other — tags aren't yet used to partition the graph.
- Each app owns its own `jest.config.ts` / `tsconfig*.json`; there's no shared app-level config beyond the root `jest.preset.js` and `tsconfig.base.json`.
- `micah-site` static assets (photos) live in `apps/micah-site/src/assets/`.
- Use the Nx MCP server tools when available (`nx_workspace`, `nx_project_details`, `nx_docs`) to inspect the live project graph or look up Nx configuration/best-practice questions instead of assuming — see `AGENTS.md` for the same guidance.
