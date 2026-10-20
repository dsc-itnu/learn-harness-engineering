# Project 07. Build Your First Automated Loop

> Related Lecture: [L13. Why You Need to Stop Prompting Your Agent](./../../lectures/lecture-13-loop-engineering/index.md)

## What You'll Do

This project is the transition from "Harness" to "Loop." You already know how to give an agent a proper environment, instructions, and feedback. Now you turn that setup into a loop that runs on its own.

You'll run three progressive experiments: turn a task from manual to `/goal`, turn a monitoring task into a `/loop` timer, and build a full maker-checker loop to experience what it feels like when **you step outside the loop.**

## Project Files

Repo path: [`projects/project-07/`](https://github.com/dsc-itnu/learn-harness-engineering/tree/main/projects/project-07)

| Directory | What's Inside | What You Do |
|-----------|--------------|-------------|
| [`starter/`](https://github.com/dsc-itnu/learn-harness-engineering/tree/main/projects/project-07/starter) | A small knowledge base project with a complete harness (P06 final state): AGENTS.md, feature_list.json, init.sh, session-handoff.md, clean-state-checklist.md. | Turn this harness into one that can loop automatically. |
| [`solution/`](https://github.com/dsc-itnu/learn-harness-engineering/tree/main/projects/project-07/solution) | Full implementations of three loops (goal, timer, maker-checker), plus loop state files and verification scripts. | Reference for loop design patterns and state management. |

## Tools You'll Use

- Claude Code or Codex
- Git
- Your complete harness from P06
- A terminal multiplexer (tmux or screen) for observing long-running loops
- Optional: GitHub Actions or cron for event-driven / scheduled experiments

## Steps

### Prep

1. Start from the commit where you finished P06.
2. Create three branches: `p07-goal-loop`, `p07-timer-loop`, `p07-maker-checker`.
3. Confirm your harness works: run init.sh and verify the state file, feature list, and handoff docs are in place.
4. Pick a **target task** for the loop to work on repeatedly: medium-sized with clear completion criteria, e.g. "add unit tests to all modules, reaching 80% coverage" or "add input validation to all API endpoints."

### Experiment 1: Goal Loop, From Manual Run to Auto Run

Switch to the `p07-goal-loop` branch.

1. **Write `goal.md`** for your task, containing:
   - Clear goal ("what counts as done")
   - Verification method (run tests? lint? check coverage?)
   - Stop condition (max turns? time limit? budget limit?)
   - Constraints ("what not to touch": production config, database schema, etc.)
2. **First manual run**: Give the task to the agent yourself. Record turns, your interventions, and result quality. This is your baseline.
3. **Run with `/goal`**: Use the same `goal.md` as input. The agent loops until the goal is reached or the stop condition triggers.
4. **Compare**: turn count, your interventions, result quality (same verification standard), and time you spent.
5. **Iterate on goal.md**: If results are poor, revise and rerun until you're satisfied or have confirmed the limit of a goal loop on this task.

### Experiment 2: Timer Loop, Turn Monitoring Into a Heartbeat

Switch to the `p07-timer-loop` branch.

1. **Pick a monitoring task**: a repetitive check you do manually, for example:
   - Run the test suite every hour and fix failures
   - Check for dependency security updates every morning
   - Check for coding style violations after each commit
   - Periodically scan TODO comments for stale ones
2. **Write the monitoring prompt/script**: what to check, what to do when problems are found, and when to call a human.
3. **Run with `/loop` (or Codex Thread automation)**:
   - Set an interval of 10-30 minutes (too short is annoying, too long hides the effect)
   - Let it run for at least 2 hours
4. **Record**: problems found, fixed on its own, false positives, made worse, and time you spent following up.
5. **Reflect**: Is this task worth automating? Compare time saved vs. time spent following up. If not, did you pick the wrong task or design the loop poorly?

### Experiment 3: Maker-Checker Loop, Take Yourself Out of the Loop

Switch to the `p07-maker-checker` branch.

This is the most important experiment. You'll build a **complete loop that doesn't need you:**

1. **Design the structure**:
   - **Maker agent**: implements, writes code, modifies files
   - **Checker agent**: verifies, runs tests, reviews code, passes / fails
   - **State file** (`loop-state.md`): current round, what was done, verification results, what's next
   - **Stop condition**: N consecutive passes, or a maximum number of rounds
2. **Write three prompts**:
   - Maker instructions (what to do, how, what not to touch)
   - Checker instructions (what to verify, how, what counts as pass, how to give feedback)
   - Loop control logic (who goes first, how handoff works, how the next round starts)
3. **Run at least 5 rounds**:
   - Round 1: Maker implements, Checker verifies, fail, feedback to Maker
   - Round 2: Maker revises based on feedback, Checker verifies, ...
   - Continue until consecutive passes, or you call it
4. **Record each round**: round number, what the Maker did, problems the Checker found, pass / fail, and whether you intervened (and why).
5. **Final retro**:
   - How many times did you intervene, and why?
   - What would have happened without intervention?
   - Did the Checker miss problems?
   - Did the Maker repeat the same mistake?
   - Where is the loop's quality ceiling: Maker capability or Checker capability?

## How to Measure Results

| Metric | Exp 1 (Goal) | Exp 2 (Timer) | Exp 3 (Maker-Checker) |
|--------|-------------|--------------|----------------------|
| Task completion rate | Was the goal reached? | How many monitoring cycles ran? | How many rounds until pass? |
| Human interventions | How many times did you step in? | How much time did you spend following up? | How many times did you intervene? |
| Result quality | How does it compare to manual? | False positive rate? Missed issues? | How many issues did Checker find that you wouldn't have? |
| Time saved | How much time did you save? | Is it worth automating? | Time spent designing the loop vs. time saved |
| Reliability | Was the stop condition trustworthy? | Did it run away? | Can the loop get stuck in the same place? |

## What to Submit

- `goal.md` (Experiment 1's goal description, at least two iterations)
- Experiment 1 comparison notes: manual vs goal loop
- Experiment 2 monitoring prompt + 2-hour run log
- Experiment 3's three prompts (Maker / Checker / Loop control)
- Experiment 3's `loop-state.md` (at least 5 rounds recorded)
- Final retro: takeaways from all three experiments, how your understanding of loop engineering changed, and which things are good candidates for loop-ification and which aren't

## Related Lectures

- [Lecture 13 — Why You Need to Stop Prompting Your Agent](../../lectures/lecture-13-loop-engineering/index.md)
- [Lecture 12 — Why Every Session Must Leave a Clean State](../../lectures/lecture-12-why-every-session-must-leave-a-clean-state/index.md) (every round of a loop needs clean state)
- [Lecture 11 — Why Observability Belongs Inside the Harness](../../lectures/lecture-11-why-observability-belongs-inside-the-harness/index.md) (you need to see what's happening inside the loop)
- [Lecture 05 — Why State Files Are the Backbone of Continuity](../../lectures/lecture-05-why-long-running-tasks-lose-continuity/index.md) (loop state files extend state files)
