# Skills

Bundled agent skills that ship with this course: self-contained prompt templates that AI coding agents (Claude Code, Codex, Cursor, Windsurf, etc.) can load for specialized tasks.

## harness-creator

A production-grade harness engineering skill. It helps you create, assess, and improve the five core harness subsystems: instructions, state, verification, scope, and session lifecycle.

### What It Does

- **Create harnesses from scratch** — AGENTS.md, feature lists, verification workflows
- **Improve existing harnesses** — Five-subsystem assessment with prioritized improvements
- **Design session continuity** — Memory persistence, progress tracking, handoff procedures
- **Apply production patterns** — Memory, context engineering, tool safety, multi-agent coordination

### Quick Start

The skill files live in the repository at [`skills/harness-creator/`](https://github.com/dsc-itnu/learn-harness-engineering/tree/main/skills/harness-creator).

```bash
npx skills add walkinglabs/learn-harness-engineering --skill harness-creator
```

To use it with Claude Code, copy the `harness-creator/` directory into your project's skill path, or point your agent at the SKILL.md file.

### Reference Patterns

The skill includes 7 focused reference documents:

| Pattern | When to Use |
|---------|-------------|
| Memory Persistence | Agent forgets between sessions |
| Skill Runtime | Package reusable workflows as skills |
| Context Engineering | Context budget management, JIT loading |
| Tool Registry | Tool safety, concurrency control |
| Multi-Agent Coordination | Parallelism, specialization workflows |
| Lifecycle & Bootstrap | Hooks, background tasks, initialization |
| Gotchas | 15 non-obvious failure modes with fixes |

### Templates

The skill bundles ready-to-use templates:

- `agents.md` — AGENTS.md scaffold with working rules
- `feature-list.json` — JSON Schema + example feature list
- `init.sh` — Standard initialization script
- `progress.md` — Session progress log template
- `session-handoff.md` — Session handoff template

### Scripts

The skill also includes plain Node.js scripts for scaffolding, validation, HTML assessment reports, and structural benchmark reports.

### How This Skill Was Built

`harness-creator` was built with Anthropic's **skill-creator** meta-skill, which provides a draft → test → evaluate → iterate workflow with eval runners, graders, and a benchmark viewer.

- **skill-creator source**: [anthropics/skills — skill-creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator)
- **Claude Code skills docs**: [anthropics/claude-code — plugin-dev/skills](https://github.com/anthropics/claude-code/tree/main/plugins/plugin-dev/skills)
