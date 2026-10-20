# Inline examples: Lecture 9. Preventing Agents from Declaring Victory Too Early

Templates and example snippets from the original lecture text, kept verbatim so the shortened lecture loses nothing.

## 1. Externalize Termination Judgment

```text
## Definition of Done
- Feature complete = end-to-end verification passed, not "code is written"
- Required verification levels:
  1. Unit tests pass
  2. Integration tests pass
  3. End-to-end flow verification passes
- Do not proceed to level 2 if level 1 fails
- Do not proceed to level 3 if level 2 fails
```
