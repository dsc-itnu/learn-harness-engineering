# Project 08. Draw Your Workflow as a Graph

> Related Lecture: [L14. From Single Loops to Graph Engineering](./../../lectures/lecture-14-graph-engineering/index.md)

## What You'll Do

This project is the transition from "Loop" to "Graph." Your P07 maker-checker loop (implement, verify, feed back, implement again) kept every decision inside one agent's context window. Here you **make the hidden structure explicit**: nodes, edges, shared state, and routing rules, written out word by word.

You'll run three progressive experiments: draw your P07 loop as an explicit graph, add a parallel fan-out/fan-in node, then add a conditional rollback edge and a human-approval node. You'll feel firsthand that **a graph isn't a new invention. It's what your loop becomes once it's complex enough.**

## Tools You'll Use

- Claude Code or Codex
- Git
- The maker-checker loop from P07 (or any agent workflow you can run repeatedly)
- A text editor or diagramming tool (drawing is for getting the structure down, not for looks; `mermaid` or a hand-written `graph.md` both work)

## Steps

### Prep

1. Start from the repo where you finished P07, or any agent workflow you're running.
2. Create three branches: `p08-explicit-graph`, `p08-parallel`, `p08-human-in-the-loop`.
3. Prepare a `state.md` as your shared state file: requirements, progress, and verification results. This is the graph's common workspace.

### Experiment 1: Draw the Loop as an Explicit Graph

Switch to the `p08-explicit-graph` branch.

1. **List every node**: write each step of the P07 loop as a node, with its responsibility, inputs, outputs, and whether it's an agent or deterministic code.
2. **Draw every edge**, flagging two special kinds:
   - Conditional edges: verify passed/failed, which path does each take?
   - Rollback edges: where does a failure return to?
3. **Write the shared state**: list the fields (requirements, code, test results, review conclusions) and who reads/writes each.
4. **Write the routing rules** in plain if-then language, e.g.:
   ```
   if verify passed → merge node
   if verify failed → implement node
   if implement node lacks information → research node
   ```
5. **Write it all up as `graph.md`**: a mermaid diagram plus a node table and the routing rules.
6. **Answer this question**: find at least one **implicit edge**, a decision path that used to live inside the agent's context that you didn't know existed.

### Experiment 2: Add a Parallel Fan-out / Fan-in Node

Switch to the `p08-parallel` branch.

1. **Pick a point that can parallelize**: a spot where the task splits into two independent parts, for example:
   - Two independent modules written in parallel by two agents
   - Two independent reviews: one runs tests and lint, the other does code review
   - Two research directions, one agent each
2. **Write the fan-out rule**: record in shared state that the task is split into N parallel subtasks, each with its own context and node.
3. **Write the fan-in rule**: once all subtasks finish, who merges the results, and by what standard (both reviews must pass, or one is enough)?
4. **Isolate with worktrees**: run each subtask in its own git worktree to avoid file collisions (review the Worktree primitive from Lecture 13).
5. **Run once and record** wall-clock time, token cost, and result quality before and after parallelization. Is it actually faster, or did coordination overhead eat the savings?

### Experiment 3: Add a Rollback Edge and a Human-Approval Node

Switch to the `p08-human-in-the-loop` branch.

This is the most important experiment. You'll add two kinds of nodes:

1. **Conditional rollback edge**: give the verify node a "partially passed" path. Instead of bouncing everything back to the implement node, return specific feedback to **the node that produced the problem**. For example, if tests pass but code review finds the requirements were misunderstood, roll back to the research node. Your shared state must record "which layer the problem came from."
2. **Human-approval node (human-in-the-loop)**: insert a human node before the merge node. Execution **stops** there until you write "approved" or "rejected" in `state.md`. It can have a timeout rule: after N hours with no response, auto-reject or auto-escalate.
3. **Write the interrupt format**: what happened, what changed, why a human is needed, and the consequences of approving or rejecting.
4. **Run at least 2 full passes**, each stopping at the approval node for one approve or reject. Record whether your decisions agreed with the verify node and whether approval caught anything verify missed.

## How to Measure Results

| Metric | Exp 1 (Explicit graph) | Exp 2 (Parallel) | Exp 3 (Human-in-the-loop) |
|--------|----------------------|-----------------|---------------------------|
| Structural visibility | How many implicit edges did you find? | Can shared state support parallel subtasks? | Can the rollback edge pinpoint the problem layer? |
| Failure localization | Can you point at which edge is wrong? | When a subtask fails, can you locate which one? | When approval rejects, can you name the layer? |
| Coordination cost | How long did writing the graph take? | Time saved by parallelism vs. coordination overhead | Approval wait time vs. value of problems caught |
| Observability | Can you now see what happens at each step? | Is every subtask's state visible? | Are approval requests written clearly? |
| Reliability | Does the graph description match actual runs? | Is the fan-in merge standard sound? | Do the timeout/escalation rules actually fire? |

## What to Submit

- `graph.md` (Experiment 1's complete graph: mermaid diagram + node table + edge table + shared state fields + routing rules)
- The list of implicit edges found in Experiment 1 (at least one)
- Experiment 2's fan-out/fan-in rules and one parallel run record (time/cost/quality comparison)
- Experiment 3's rollback-edge rules, approval-node format, and 2 rounds of human-in-the-loop records
- Final retro: how did your way of working change from loop to graph? Which tasks deserve a graph, and which don't?

## Related Lectures

- [Lecture 14 — From Single Loops to Graph Engineering](../../lectures/lecture-14-graph-engineering/index.md)
- [Lecture 13 — From Manual Prompting to Autonomous Loops](../../lectures/lecture-13-loop-engineering/index.md) (your loop is a node in a graph; this project unfolds its internal structure)
- [Lecture 09 — Why Agents Declare Victory Too Early](../../lectures/lecture-09-why-agents-declare-victory-too-early/index.md) (why the verify node must be independent of the implement node: a structural problem, not a prompt problem)
- [Lecture 11 — Why Observability Belongs Inside the Harness](../../lectures/lecture-11-why-observability-belongs-inside-the-harness/index.md) (the more complex the graph, the more you need to see each node)
