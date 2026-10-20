> Related lectures: [Lecture 01. Strong models don't mean reliable execution](./../../lectures/lecture-01-why-capable-agents-still-fail/index.md) · [Lecture 02. What harness actually means](./../../lectures/lecture-02-what-a-harness-actually-is/index.md)
> Template files: [templates/](https://github.com/dsc-itnu/learn-harness-engineering/blob/main/docs/en/resources/templates/)

# Project 01. Prompt-Only vs. Rules-First: How Much Difference Does It Make

## What You Do

Build a minimal Electron knowledge-base app shell: a window with a document list on the left, a Q&A panel on the right, and a local data directory. The task is simple; getting the agent to complete it is the hard part.

Run it twice. First: just a prompt, no preparation. Second: the minimal harness (e.g. `AGENTS.md`, `init.sh`, `feature_list.json`) pre-placed in the repo. Then compare.

Any rediscovery/preparation interval mentioned in the course is an example, not a fixed measured result.

## Use the Checked-In Project

Repository path: [`projects/project-01/`](https://github.com/dsc-itnu/learn-harness-engineering/tree/main/projects/project-01)

| Directory | What it contains | How to use it |
|------|------|------|
| [`starter/`](https://github.com/dsc-itnu/learn-harness-engineering/tree/main/projects/project-01/starter) | The weak-harness run. It has only [`task-prompt.md`](https://github.com/dsc-itnu/learn-harness-engineering/blob/main/projects/project-01/starter/task-prompt.md) as the task description and no `AGENTS.md` or `feature_list.json`. Note: `starter/` also contains a reference implementation of the app — remove the app source (`src/`, `package.json`, configs, `scripts/`) before the run so the agent builds it from scratch. The `data/` sample documents are your call: keep them in both runs or remove them from both, so the two runs stay symmetric. | Give the prompt to your coding agent and measure what it completes without extra structure. |
| [`solution/`](https://github.com/dsc-itnu/learn-harness-engineering/tree/main/projects/project-01/solution) | The same product slice with explicit harness artifacts: [`AGENTS.md`](https://github.com/dsc-itnu/learn-harness-engineering/blob/main/projects/project-01/solution/AGENTS.md), [`CLAUDE.md`](https://github.com/dsc-itnu/learn-harness-engineering/blob/main/projects/project-01/solution/CLAUDE.md), [`init.sh`](https://github.com/dsc-itnu/learn-harness-engineering/blob/main/projects/project-01/solution/init.sh), [`feature_list.json`](https://github.com/dsc-itnu/learn-harness-engineering/blob/main/projects/project-01/solution/feature_list.json), [`claude-progress.md`](https://github.com/dsc-itnu/learn-harness-engineering/blob/main/projects/project-01/solution/claude-progress.md), and [`docs/`](https://github.com/dsc-itnu/learn-harness-engineering/tree/main/projects/project-01/solution/docs) ([`ARCHITECTURE.md`](https://github.com/dsc-itnu/learn-harness-engineering/blob/main/projects/project-01/solution/docs/ARCHITECTURE.md), [`PRODUCT.md`](https://github.com/dsc-itnu/learn-harness-engineering/blob/main/projects/project-01/solution/docs/PRODUCT.md)). | Compare how the same task is made concrete through rules and verification evidence. Before the strong run, reset the checked-in evidence: set every `feature_list.json` status to `not-started` and clear its `evidence`/`testedAt` values (keep the fields), and clear the session log in `claude-progress.md` (keep the title), or the agent will see all four features already passing and have nothing to build. |

The four concrete features are window launch, document list, question panel, and local data directory creation. Inspect `solution/feature_list.json` for the expected evidence for each feature.

## Tools

- Claude Code or Codex (pick one, use it for both runs)
- Two isolated working directories (one per run; never both present while a run is active)
- Node.js + Electron (project stack)
- A timer (record each run's duration)

## Harness Mechanism

Minimal harness: `AGENTS.md` + `init.sh` + `feature_list.json` + `CLAUDE.md` + `claude-progress.md` + `docs/`

## Run Protocol

### Preparation

1. Prepare two isolated working directories, for example `p01-baseline/` and `p01-improved/`. Run one at a time: set up the files, run, archive the results, delete the directory, then start the other.
2. Do not use git branches to separate the runs. An agent has full filesystem access and will explore sibling directories and branch refs; if the weak run can see the strong harness files (`feature_list.json`, `claude-progress.md`, `docs/`), the experiment is contaminated.
3. Prepare the same task prompt for both runs, the text from `starter/task-prompt.md`: "Build an Electron app that can show documents and answer questions."

### First Run (Weak Harness)

In `p01-baseline/`, place only the task prompt (no harness files).

1. Start the agent with only the prompt above.
2. Provide no `AGENTS.md`, no init script, no acceptance criteria.
3. When the agent stops, run `npm start` (or whatever launch command it produced) to check whether the app launches.
4. Record: terminal output, key diff, the agent's final summary.
5. **Do not manually modify the code.** If it does not launch, record that as-is.
6. Archive the results, delete `p01-baseline/`, then run the second test.

### Second Run (Strong Harness)

In `p01-improved/`, before starting the agent, prepare:

- `AGENTS.md`: project structure, launch commands, Electron layer-boundary rules
- `CLAUDE.md`: quick reference for the agent (build/run commands, key files)
- `init.sh`: verify the project builds cleanly (`npm install && npm run check && npm run build`)
- `feature_list.json`: the four features and their completion status
- `claude-progress.md`: progress and evidence log
- `docs/`: the architecture and product specs `AGENTS.md` tells the agent to read first (`ARCHITECTURE.md`, `PRODUCT.md`)

Then reset the checked-in evidence: set every `feature_list.json` status to `not-started` and clear its `evidence`/`testedAt` values (keep the fields), and clear the session log in `claude-progress.md` (keep the title). Start the agent with the same prompt as the first run. When it stops, run `./init.sh` and record the result.

## How to Measure Results

| Metric | Description |
|------|------|
| Completion | Complete / partial / failed |
| First successful launch | Time from start to the first successful `npm start` (or the launch command it produced) |
| Retries | How many human interventions were needed to launch successfully |
| Missing items | Which features were still unimplemented when the agent declared done |
| Premature stop | Whether the agent declared done while the app still could not run |

## What to Submit

- Weak-harness run record: prompt, logs/transcript, final diff, launch evidence
- Strong-harness run record: same, plus the harness files you prepared
- A comparison note (1-2 pages): what differed, the data, your conclusion

## Experimental Framing

This is a comparison experiment, not a requirement that both runs produce a production-ready Electron app. Run the same task against the weak `starter/` and the explicit-harness `solution/`, then record which features each run completes and the evidence. Partial or broken output is valid evidence; the feature list defines what to measure, not what the prompt-only run must pass.

## Related Lectures

- [Lecture 01. Strong Models Don't Mean Reliable Execution](./../../lectures/lecture-01-why-capable-agents-still-fail/index.md)
- [Lecture 02. What a Harness Actually Is](./../../lectures/lecture-02-what-a-harness-actually-is/index.md)
- [Lecture 06. Make the Agent Initialize Before Every Work Session](./../../lectures/lecture-06-why-initialization-needs-its-own-phase/index.md)
