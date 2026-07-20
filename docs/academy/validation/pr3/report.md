# Validation report — pr3

Before: 16 shots · After: 16 shots. Reduced-motion, seeded localStorage, deterministic capture.

Intended-change scope (--expected): home, lesson

Change detection = DOM text signature (authoritative). Pixel hash shown as advisory only (flaky under animation).

| surface | vp | status b→a | overflow b→a | errors b→a | content | pixel | verdict |
|---|---|---|---|---|---|---|---|
| home | d | 200→200 | 0→0 | 0→0 | CHANGED | same | ◐ changed (intended) |
| home | m | 200→200 | 0→0 | 0→0 | CHANGED | same | ◐ changed (intended) |
| dashboard | d | 200→200 | 0→0 | 0→0 | same | same | ✅ identical |
| dashboard | m | 200→200 | 0→0 | 0→0 | same | same | ✅ identical |
| library | d | 200→200 | 0→0 | 0→0 | same | same | ✅ identical |
| library | m | 200→200 | 0→0 | 0→0 | same | same | ✅ identical |
| pm-academy | d | 200→200 | 0→0 | 0→0 | same | same | ✅ identical |
| pm-academy | m | 200→200 | 0→0 | 0→0 | same | same | ✅ identical |
| pppi-academy | d | 200→200 | 0→0 | 0→0 | same | same | ✅ identical |
| pppi-academy | m | 200→200 | 0→0 | 0→0 | same | same | ✅ identical |
| qm-academy | d | 200→200 | 0→0 | 0→0 | same | same | ✅ identical |
| qm-academy | m | 200→200 | 0→0 | 0→0 | same | same | ✅ identical |
| lesson | d | 200→200 | 0→0 | 0→0 | CHANGED | diff | ◐ changed (intended) |
| lesson | m | 200→200 | 0→0 | 0→0 | CHANGED | diff | ◐ changed (intended) |
| search | d | 200→200 | 0→0 | 0→0 | same | same | ✅ identical |
| search | m | 200→200 | 0→0 | 0→0 | same | same | ✅ identical |

**Unexpected changes (out of scope): 0** · **Metric regressions: 0**

✅ PASS — no unrelated feature changed; all metrics green.
