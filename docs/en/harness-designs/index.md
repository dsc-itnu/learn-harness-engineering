# Frontier Harness Design Breakdown

This section takes the harness theory from the course lectures and compares it with a real-world product. We focus on one question: **how is its harness designed?** That means the engineering infrastructure around the model: the five subsystems of instructions, tools, environment, state, and feedback, plus mechanisms such as context continuity, initialization, verification, observability, handoffs, and loops.

We deliberately skip how strong the model's reasoning is or how it scores on benchmarks. Those are model and product questions. Here we examine only the harness, everything outside the model weights.

## Why This Breakdown Matters

The first lecture explains that strong model capabilities do not guarantee reliable execution: the same model can perform an order of magnitude differently in different harnesses. The lectures explain "what should be done"; a real product shows "what a leading team actually does."

**Codex** takes the harness philosophy to its logical extreme: the repository is the system of record, AGENTS.md is only a directory page, and worktrees isolate environments.

## Article

- [Breaking Down Codex's Harness Design](./codex/): The repository as the system of record, AGENTS.md as a directory page, environment isolation, and feedback loops.

## How to Read This Section

Start with the first few lectures, especially [Lecture 2: What a Harness Actually Is](../lectures/lecture-02-what-a-harness-actually-is/), to establish the five-subsystem framework, then read the article to see how a real product implements these mechanisms.

The article ends with "Mapping to the Course Framework" and "Designs Worth Adopting" sections. These translate product design choices back into course concepts so you can apply them to your own projects.
