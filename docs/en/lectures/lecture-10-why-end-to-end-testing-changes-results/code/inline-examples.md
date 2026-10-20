# Inline examples: Lecture 10. Only a Full Pipeline Run Counts as Real Verification

Templates and example snippets from the original lecture text, kept verbatim so the shortened lecture loses nothing.

## 1. The Harness Must Include an End-to-End Layer

```text
## Validation Hierarchy
- Level 1: Unit tests (Must pass)
- Level 2: Integration tests (Must pass)
- Level 3: End-to-end tests (Must pass when cross-component changes are involved)
- Skipping any required level = Not Complete
```

## 2. Turn Architectural Rules into Executable Checks

```bash
# Check whether the renderer process directly calls Node.js APIs
grep -r "require('fs')" src/renderer/ && exit 1 || echo "OK: no direct fs access in renderer"
```
