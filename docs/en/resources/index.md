# English Resource Library

Copy-ready templates and compact references for a real repository.

## When To Use It

Start here when you want Codex, Claude Code, or another coding agent to work across sessions without re-deriving setup, status, and scope. It helps when:

- work spans multiple sessions
- features are numerous and easy to leave half-finished
- agents tend to declare victory too early
- startup steps are rediscovered every time

## Start Here

For a minimal setup, begin with:

- root instructions: [`templates/AGENTS.md`](./templates/AGENTS.md) or [`templates/CLAUDE.md`](./templates/CLAUDE.md)
- feature state: [`templates/feature_list.json`](./templates/feature_list.json)
- progress log: [`templates/claude-progress.md`](./templates/claude-progress.md)

The filename is a historical course convention. It is a generic, repository-local session progress log: any agent can use it, but only reads or updates it when instructed.
- bootstrap script reference: `docs/en/resources/templates/init.sh`

Then add:

- session handoff: [`templates/session-handoff.md`](./templates/session-handoff.md)
- clean-exit checklist: [`templates/clean-state-checklist.md`](./templates/clean-state-checklist.md)
- evaluator rubric: [`templates/evaluator-rubric.md`](./templates/evaluator-rubric.md)

For the fuller OpenAI-style repository structure from the "Harness engineering" post, use the advanced pack:

- [`openai-advanced/index.md`](./openai-advanced/index.md)

## Library Structure

- [`templates/`](./templates/index.md): templates to copy into a real repo
- [`reference/`](./reference/index.md): method notes, startup flow, and failure-mode maps
- [`openai-advanced/`](./openai-advanced/index.md): advanced repo skeleton, system-of-record docs, and governance templates

## Recommended Minimal Pack

- `AGENTS.md` or `CLAUDE.md`
- `feature_list.json`
- `claude-progress.md` (generic session progress log; historical filename)
- `init.sh`

Those four files make most agent workflows noticeably more stable. For a longer-running system with multiple domains, active plans, quality scoring, and reliability policies, move up to the [`openai-advanced/`](./openai-advanced/index.md) pack.
