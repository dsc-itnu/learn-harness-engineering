# Inline examples: Lecture 14. From Single Loops to Graph Engineering

Templates and example snippets from the original lecture text, kept verbatim so the shortened lecture loses nothing.

## Build Your First Graph from Scratch

```text
state = {
  "requirements": text,                # written by the research node
  "code":         text,                # written by the implement node
  "review":       "pass" | "fail",    # written by the verify node
  "attempts":     number,              # +1 per failure (merged by "sum" on concurrent writes)
}
```

## Build Your First Graph from Scratch

```text
# inside the implement node: a private little loop (last lecture's maker-checker loop)
node_implement(requirements):
    loop (at most 3 times):
        code = model(prompt=implementation instructions, context=requirements + last error)
        if tests_pass(code): return {"code": code}
    return {"error": "implementation failed 3 times"}
```
