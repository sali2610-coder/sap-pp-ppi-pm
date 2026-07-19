# Validation report — pr1

Before: 16 shots · After: 16 shots. Reduced-motion, seeded localStorage, deterministic capture.

Intended-change scope (--expected): (none — additive PR, all surfaces must be identical)

| surface | vp | status b→a | overflow b→a | errors b→a | render | verdict |
|---|---|---|---|---|---|---|
| home | d | 200→200 | 0→0 | 0→0 | same | ✅ identical |
| home | m | 304→304 | 0→0 | 0→0 | same | ✅ identical |
| dashboard | d | 200→200 | 0→0 | 0→0 | same | ✅ identical |
| dashboard | m | 304→304 | 0→0 | 0→0 | same | ✅ identical |
| library | d | 200→200 | 0→0 | 0→0 | same | ✅ identical |
| library | m | 200→200 | 0→0 | 0→0 | same | ✅ identical |
| pm-academy | d | 200→200 | 0→0 | 0→0 | same | ✅ identical |
| pm-academy | m | 200→200 | 0→0 | 0→0 | same | ✅ identical |
| pppi-academy | d | 200→200 | 0→0 | 0→0 | same | ✅ identical |
| pppi-academy | m | 200→200 | 0→0 | 0→0 | same | ✅ identical |
| qm-academy | d | 200→200 | 0→0 | 0→0 | same | ✅ identical |
| qm-academy | m | 200→200 | 0→0 | 0→0 | same | ✅ identical |
| lesson | d | 200→200 | 0→0 | 0→0 | same | ✅ identical |
| lesson | m | 200→200 | 0→0 | 0→0 | same | ✅ identical |
| search | d | 304→304 | 0→0 | 0→0 | same | ✅ identical |
| search | m | 200→200 | 0→0 | 0→0 | same | ✅ identical |

**Unexpected changes (out of scope): 0** · **Metric regressions: 0**

✅ PASS — no unrelated feature changed; all metrics green.
