> Related lectures: [Lecture 03. Make the repository your single source of truth](./../../lectures/lecture-03-why-the-repository-must-become-the-system-of-record/index.md) · [Lecture 04. Split instructions across files](./../../lectures/lecture-04-why-one-giant-instruction-file-fails/index.md)
> Template files: [templates/](https://github.com/dsc-itnu/learn-harness-engineering/blob/main/docs/en/resources/templates/)

# Project 02. Make the Project Readable and Pick Up Where You Left Off

## What You Do

Make the repo readable so a new agent can quickly understand the structure, know the current progress, and pick up work. Implement document import, document detail view, and local persistence across two sessions.

Run it twice from the checked-in directories: first with the thinner starter workspace and no `session-handoff.md`, then against the solution with expanded `ARCHITECTURE.md`, `PRODUCT.md`, and `session-handoff.md`.

## Tools

- Claude Code or Codex
- Git
- Node.js + Electron

## Harness Mechanism

Agent-readable workspace + persistent state files

## Use the Checked-In Project

Repository path: [`projects/project-02/`](https://github.com/dsc-itnu/learn-harness-engineering/tree/main/projects/project-02)

| Directory | What it contains | What to compare |
|------|------|------|
| [`starter/`](https://github.com/dsc-itnu/learn-harness-engineering/tree/main/projects/project-02/starter) | Project 01 code plus incomplete document import, detail view, and persistence. The docs exist but are intentionally thinner, and there is no `session-handoff.md`. | How much rediscovery a second agent session does. |
| [`solution/`](https://github.com/dsc-itnu/learn-harness-engineering/tree/main/projects/project-02/solution) | The same slice completed, with expanded docs under [`projects/project-02/solution/`](https://github.com/dsc-itnu/learn-harness-engineering/tree/main/projects/project-02/solution) (plus [`feature_list.json`](https://github.com/dsc-itnu/learn-harness-engineering/blob/main/projects/project-02/solution/feature_list.json) and [`session-handoff.md`](https://github.com/dsc-itnu/learn-harness-engineering/blob/main/projects/project-02/solution/session-handoff.md)). | Whether a fresh session can resume from repo state without oral context. |

The product features are document import, full document detail/content loading,
and persistence across restart. The harness feature is the handoff-readable
workspace.
