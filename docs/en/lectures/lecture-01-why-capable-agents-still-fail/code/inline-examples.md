# Inline examples: Lecture 01. Strong Models Don't Mean Reliable Execution

Templates and example snippets from the original lecture text, kept verbatim so the shortened lecture loses nothing.

## When Things Fail, Fix the Harness First

```text
Completion criteria:
- New endpoint GET /api/search?q=xxx
- Supports pagination, default 20 items
- Results include highlighted snippets
- All new code passes pytest
- Type checking passes (mypy --strict)
```
