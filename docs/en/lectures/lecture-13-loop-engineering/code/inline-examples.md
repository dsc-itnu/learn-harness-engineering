# Inline examples: Lecture 13. From Manual Prompting to Autonomous Loops

Templates and example snippets from the original lecture text, kept verbatim so the shortened lecture loses nothing.

## 1. Automations — The Heartbeat

```bash
# Claude Code: run tests every 30 min, fix failures (within current session)
/loop 30m Run the test suite and fix any failing tests

# Claude Code: check deploy status every 15 minutes
/loop 15m Check if the production deploy succeeded and report status
```

## Output: What You See When You Wake Up

```text
timestamp    commit_hash    val_bpb    vram_mb    description
--------- ------------- ---------- ---------- ----------------------------
08:01:12  a1b2c3d       1.234     22100    baseline
08:06:15  d4e5f6g       1.228     22400    increased learning rate by 10%
08:11:20  (reverted)     1.241     21800    switched to GELU activation
08:16:08  h7i8j9k       1.219     23000    added weight decay 0.01
...
```

## Step 2: Write a Goal and Stopping Condition

```markdown
Goal: Check the 10 most recent issues in the repo.
For each issue:
  - If it already has clear labels and an assignee, skip
  - If untagged, add appropriate labels based on content
  - If fixable in under 10 minutes, create a branch and attempt a fix
Stop when: All qualifying issues have been processed, or an issue requires human decision.
```
