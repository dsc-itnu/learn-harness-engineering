> Code examples: [code/](https://github.com/dsc-itnu/learn-harness-engineering/blob/main/docs/en/lectures/lecture-01-why-capable-agents-still-fail/code/)
> Practice project: [Project 01. Prompt-Only vs. Rules-First: How Much Difference Does a Harness Make](./../../projects/project-01-baseline-vs-minimal-harness/index.md)

# Lecture 01. Strong Models Don't Mean Reliable Execution

As of late 2025, top coding agents pass roughly 50-60% of SWE-bench Verified, whose tasks are carefully selected with clear issues and ready tests. With everyday requirements (vague specs, no tests, implicit business rules) it drops further. The agent runs 20 minutes, says "all done," and the code breaks tests, introduces new bugs, or isn't what you asked. The usual reaction is "buy a better model." The problem may not be the model.

## Same Horse, Different Fates

Anthropic ran a controlled experiment: same prompt ("build a 2D retro game editor"), same model (Opus 4.5). Bare run: 20 minutes, $9, core features broken. Full harness (planner, generator, evaluator three-agent architecture): 6 hours, $200, fully playable. OpenAI's 2025 harness engineering article likewise says Codex in a well-harnessed repository goes from "unreliable" to "reliable," a qualitative leap. Harness means **all the engineering infrastructure beyond the model weights.**

## Where Agents Actually Get Stuck

- **Vague requirements**: "Add a search feature" (full-text? paginated? highlighted?) forces guessing; wrong guesses cost several times more rework than being specific.
- **Implicit conventions**: the team uses SQLAlchemy 2.0 and OAuth 2.0 on all endpoints, but the rules live in heads and old Slack messages; the agent has never seen them.
- **Incomplete environment**: missing dependencies and wrong tool versions burn context on `pip install` and Node conflicts.
- **No verification**: without tests, lint or known commands the agent declares done when it feels done. Anthropic also observed "context anxiety": with context running low, agents rush, skip verification and pick simple solutions.
- **Cross-session state loss**: each session re-explores from scratch; failure rates spike on tasks over 30 minutes.

## Key Terminology

- **Capability Gap**: benchmark vs. real-task performance; 50-60% on SWE-bench Verified means nearly half of real issues go unresolved.
- **Harness**: everything outside the model: instructions, tools, environment, state, verification feedback (the "tack").
- **Harness-Induced Failure**: capable model, structurally defective environment.
- **Verification Gap**: agent confidence vs. actual correctness; "done" when it isn't is the most common failure.
- **Diagnostic Loop**: execute, observe failure, attribute to a harness layer, fix, re-execute.
- **Definition of Done**: command-verifiable conditions (tests pass, lint clean, types check); otherwise the agent invents its own.

## When Things Fail, Fix the Harness First

**Don't swap the model first; check the harness.** If the same model succeeds on similar well-structured tasks, assume a harness problem. Attribute each failure to one of five diagnosis layers: task specification, context provision, execution environment, verification feedback, state management.

Write an explicit Definition of Done per task, e.g. "GET /api/search?q=xxx, paginated (default 20), highlighted snippets, pytest and `mypy --strict` pass." Put an `AGENTS.md` in the repo root with tech stack, conventions and verification commands: the first and highest-ROI step, possibly better than a pricier model. Then keep a simple log per task (success or failure, which layer) so the bottleneck layer becomes visible and each failure is fixed once.

## The Million-Line Experiment

In 2025 three OpenAI engineers agreed to write no code themselves, only Codex. From an empty repo, five months later it held about one million lines (logic, infrastructure, tooling, docs) via 1,500 PRs (3.5 per person per day). Early progress was slow because Codex lacked tools and structure, not ability. They broke goals into small blocks (design, code, review, test) the agent could assemble and compose; failures were never "not trying hard enough" but "what is the agent missing, and can we supply it understandably and executably?" Same model, different environment, fundamentally different output. [OpenAI: Harness engineering](https://openai.com/index/harness-engineering/)

## A More Down-to-Earth Example

A team used Claude Sonnet to add endpoints to a FastAPI + PostgreSQL + Redis app (~15,000 lines). From one sentence ("add user preferences endpoints under `/api/v2/users`") the agent spent 40% of context exploring, ignored error-handling patterns, used old SQLAlchemy syntax, shipped runtime errors, and the next session redid discovery. After adding `AGENTS.md`, verification commands (`pytest tests/api/v2/ && python -m mypy src/`) and architecture decision records, the same model succeeded in 3 of 3 runs with ~60% better context efficiency.

## Key Takeaways

- Model capability and execution reliability differ; even a thoroughbred needs good tack.
- When things fail, check the harness first; swapping models is the most expensive option.
- Every failure signals a structural defect to find and fix.
- Check the five layers: task definition, context, environment, verification, cross-session state.
- One `AGENTS.md` might beat upgrading to a more expensive model.

## Further Reading

- [OpenAI: Harness Engineering — Leveraging Codex in an Agent-First World](https://openai.com/index/harness-engineering/)
- [Anthropic: Effective Harnesses for Long-Running Agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)
- [HumanLayer: Skill Issue — Harness Engineering for Coding Agents](https://www.humanlayer.dev/blog/skill-issue-harness-engineering-for-coding-agents)
- [SWE-bench Leaderboard](https://www.swebench.com/)
- [Thoughtworks Technology Radar: Harness Engineering](https://www.thoughtworks.com/radar)

## Exercises

1. **Comparison experiment**: run an agent on a non-trivial task with no harness, then with `AGENTS.md` and verification commands; attribute each failure to a layer.
2. **Verification gap measurement**: over 5 tasks, compare "done" claims against independent tests; the false-claim rate is your gap. Which commands would shrink it?
3. **Diagnostic loop practice**: take a repeatedly failing task and run 3-5 rounds of record, attribute to a layer, fix, rerun.
