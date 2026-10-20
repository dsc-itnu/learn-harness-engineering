# Inline examples: Lecture 02. What a Harness Actually Is

Templates and example snippets from the original lecture text, kept verbatim so the shortened lecture loses nothing.

## The Five-Subsystem Harness Model

```text
Verification commands:
- Tests: pytest tests/ -x
- Type check: mypy src/ --strict
- Lint: ruff check src/
- Full verification: make check (includes all above)
```
