# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Learn Harness Engineering is a project-based course on building reliable coding environments for AI agents. The repo contains a VitePress documentation site plus hands-on project code.

## Commands

```sh
# Documentation site
npm install
npm run docs:dev        # Dev server with hot reload (VitePress)
npm run docs:build      # Production build
npm run docs:preview    # Preview built site

# Run lecture code examples
npx tsx docs/en/lectures/<lecture-dir>/code/<file>.ts

# Project Electron apps (from each project directory)
cd projects/project-NN/starter  # or solution/
npm install
npm run dev              # Build + launch Electron (via scripts/dev.js)
npm run check            # Type-check both tsconfig.json and tsconfig.node.json
npm run test             # Vitest run (single run)
npm run test:watch       # Vitest watch mode
```

## Repository Structure

- `docs/` — VitePress documentation site (lectures, projects, resources)
- `docs/.vitepress/config.mts` — Nav/sidebar config (English only)
- `docs/en/lectures/` — 14 lectures, each with `index.md` + `code/` examples
- `docs/en/projects/` — 8 project descriptions
- `docs/en/resources/` — localized templates, references, OpenAI advanced pack
- `docs/en/harness-designs/codex/` — the only frontier harness breakdown kept
- `projects/shared/` — Shared Electron + TypeScript + React foundation
- `projects/project-NN/` — Per-project `starter/` and `solution/` directories (project-01 through project-06; project-07 and project-08 are docs-only so far)

## Architecture

The course revolves around an Electron knowledge-base desktop app that evolves across the projects:
- **Main process** (`src/main/`): Window management, IPC handlers, service initialization
- **Preload** (`src/preload/`): contextBridge exposing typed API to renderer
- **Renderer** (`src/renderer/`): React UI with document list, Q&A panel, status bar
- **Services** (`src/services/`): DocumentService, IndexingService, QaService, PersistenceService
- **Shared types** (`src/shared/types.ts`): Cross-boundary interfaces and IPC channel constants

Each project's starter/solution is a complete copy of the Electron app at that evolutionary stage. P(N+1) starter is derived from P(N) solution. The shared foundation is in `projects/shared/`.

## Key Patterns

- IPC channels defined as constants in `src/shared/types.ts` (IPC_CHANNELS) — single source of truth
- All data stored locally as JSON/text files (no database)
- Mock Q&A returns structured answers with citations (no real LLM API)
- Harness files in project roots: AGENTS.md, CLAUDE.md, feature_list.json, init.sh, claude-progress.md
- Progressive disclosure: short AGENTS.md entrypoint linking to focused docs
- Each project has two tsconfigs: `tsconfig.json` (renderer) and `tsconfig.node.json` (main/preload)

## Content Policy

This is a condensed fork of walkinglabs/learn-harness-engineering: English only, 14 lectures kept but shortened, real-world examples preserved, Codex the only harness design breakdown. Pushing to `main` deploys to GitHub Pages (`.github/workflows/deploy-pages.yml`).
