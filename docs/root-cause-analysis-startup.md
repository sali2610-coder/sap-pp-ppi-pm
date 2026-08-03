# Root Cause Analysis — startup delay in the corporate environment

**Application:** SAP by Sali · Project NEO — `https://sapbysali.app`
**Environment:** Omnissa Horizon Client → Windows Enterprise VDI → Chrome 138 → corporate web filter → Ericom Shield
**Reported symptom:** ~8–10 s of blank screen before the application appears, during executive presentations
**Date of measurement:** 2026-08-02

---

## How to read this document

Every statement is tagged with the strength of its backing, and every finding has an ID.
The distinction is deliberate: a measurement and a conclusion drawn from measurements are
not the same thing, and this investigation is only useful if the two stay separated.

| Tag | ID prefix | Meaning |
|---|---|---|
| **[MEASURED]** | `M#` | Directly observed and reproducible. A number someone can re-collect. |
| **[STRONG EVIDENCE]** | `C#` | An engineering conclusion supported by several consistent measurements. Not itself a measurement. |
| **[UNVERIFIED]** | `U#` | Plausible, not measured. Requires data the application cannot collect. |

Cross-references use these IDs, never bare section numbers, so a citation can never be
mistaken for a different tier.

### One scoping fact that governs the whole document

**The page measured inside the corporate environment was `/diag/`, not the application.**
`/diag/` is a single standalone HTML file with one inline `<script>`, no framework, no
React, no hydration, and no `/_next/` assets. That is what makes it a clean probe of the
*delivery path* — but it also means the corporate run did **not** exercise application
JavaScript. Evidence about application execution comes from local and emulated
measurements (M21–M24), not from the corporate run. This distinction is applied
consistently below, and it is the reason U5 stays open.

---

## 1. Summary

**[MEASURED]** Inside the corporate environment, the diagnostics page completed its full
load — connection, download, parse, paint, load event — in **960 ms** (M1). The same URL
from an unfiltered network completed in **266 ms** (M2). Both fetched an identical payload,
8 KB wire / 19 KB decoded (M7).

**[MEASURED]** On the application itself, measured locally and under emulated networks,
startup JavaScript is 755 KB across 15 files and the page is fully loaded in 713 ms at
1 Mbps / 300 ms RTT (M21–M23).

**[STRONG EVIDENCE]** The collected measurements show **no evidence of an 8–10 second delay
occurring inside the application**. On the evidence available, the application loads in
approximately one second once the request reaches the origin and execution begins. (C4 —
this is a conclusion drawn from M1, M2 and M21–M23, not a single measurement, and the
in-environment part of it was measured on `/diag/`.)

**[STRONG EVIDENCE]** The delivery path adds measurable cost: identical bytes take 32×
longer to deliver, and ~290 KB of foreign instrumentation is injected into a 19 KB
document (C1).

**[UNVERIFIED]** If users still experience an 8–10 second wait, the remaining time most
likely occurs **before normal page execution begins** — during proxy category evaluation,
quota handling, session hand-off, or isolation container startup. This has not been
measured and should be investigated by the infrastructure / security team (§6).

---

## 2. Side-by-side measurement — identical URL, identical payload **[MEASURED]**

Both runs loaded `https://sapbysali.app/diag/` cold, over HTTP/2, from the same origin.

| Measurement | Unfiltered network | Corporate (Ericom) | Ratio |
|---|---:|---:|---|
| DNS lookup | 0 ms | 0 ms | — |
| TCP connect | 145 ms | 134 ms | same |
| TLS handshake | 137 ms | 124 ms | same |
| Request → first byte (TTFB) | 67 ms | 60 ms | same |
| **HTML download** | **14 ms** | **444 ms** | **32×** |
| Parse → DOM interactive | not captured | 109 ms | — |
| DOMContentLoaded | not captured | 5 ms | — |
| → load event | not captured | 200 ms | — |
| **TOTAL to load event** | **266 ms** | **960 ms** | **3.6×** |
| First Paint / FCP / LCP | 328 ms | 888 ms | 2.7× |
| Wire / decoded payload | 8 KB / 19 KB | 8 KB / 19 KB | **identical** |
| Protocol | h2 | h2 | same |
| Resource count | 6 | 4 | — |
| **DOM size after execution** | **24 KB** | **314 KB** | **13×** |
| Security-product globals | none | `__shieldHandlers` | injected |

Two observations carry the analysis:

- **[MEASURED]** TTFB is the same on both sides; HTML download is 32× slower on one. The
  origin answers just as fast in both environments. The extra time is spent after the
  server has responded, delivering an 8 KB body that is already brotli-compressed
  (`content-encoding: br`, M8) and served from an edge-cache hit (`x-vercel-cache: HIT`,
  M9). At the 1.75 Mbps downlink the corporate browser reported for itself (M25), 8 KB is
  about 37 ms of transfer time; it took 444 ms.
- **[MEASURED]** The document grew from 24 KB to 314 KB (M10). The published file is 19 KB.

### Methodological caveats

Stated so that a reader can weigh the comparison rather than take it on trust.

- **The two runs used different client stacks.** The corporate run was desktop Chrome 138
  on Windows inside the VDI. The unfiltered baseline was headless Chrome on macOS. That
  difference can move paint and parse figures, and it is why those rows are not the ones
  the argument rests on. It does not affect the central comparison — byte-identical
  responses from the same origin over the same protocol, where one path took 32× longer to
  deliver the body.
- **The resource counts differ (6 vs 4) and this is unexplained.** It does not affect the
  document-level comparison, which is byte-identical on both sides, but it is recorded
  rather than smoothed over.
- **Three clean-side rows were not captured** (parse, DOMContentLoaded, load event). They
  are marked "not captured", not estimated.

---

## 3. Tier 1 — Proven by measurement

Each is a directly observed value, reproducible by re-running the diagnostics.
"Corporate" always means measured on `/diag/` inside the VDI.

| ID | Finding | Value |
|---|---|---|
| **M1** | Full page load, `/diag/`, corporate browser | **960 ms** |
| **M2** | Same page and URL, unfiltered network | **266 ms** |
| **M3** | First Contentful Paint, corporate | **888 ms** |
| **M4** | HTML body delivery, corporate vs clean, identical bytes | **444 ms vs 14 ms** |
| **M5** | TTFB, corporate | **60 ms** (clean: 67 ms) |
| **M6** | DNS / TCP / TLS, corporate | **0 / 134 / 124 ms** (clean: 0 / 145 / 137) |
| **M7** | Payload delivered, both environments | **8 KB wire / 19 KB decoded** |
| **M8** | Compression on the corporate document response | **`content-encoding: br`** |
| **M9** | Edge cache status on that response | **`x-vercel-cache: HIT`** |
| **M10** | DOM size after execution, corporate vs clean | **314 KB vs 24 KB** |
| **M11** | Security-product global, corporate only | **`__shieldHandlers`** |
| **M12** | `dynamic import()` latency, ~20 runs, corporate | **5–32 ms** (never blocked) |
| **M13** | CSP violations observed, corporate | **zero**, every run |
| **M14** | Service worker startup, corporate | **0 ms**; SW query 3–8 ms |
| **M15** | `localStorage`, `eval` / `new Function`, corporate | **available / allowed** |
| **M16** | Redirects before the `/diag/` document | **0 ms** |
| **M17** | First-fetch penalty, same 60 KB file ×3, first session | **467 / 82 / 84 ms → +384 ms** |
| **M18** | Same test, later sessions | **69–92 ms across all three → 0–21 ms** |
| **M19** | Corporate filter block page | category **"Newly Registered Websites"**, quota-gated |
| **M20** | Address bar in corporate Chrome | `shield.ericomcloud.net/?Shield-TenantID=…&url=…` |
| **M21** | Application startup JavaScript, before → after our fixes | **21,316 KB → 755 KB** |
| **M22** | Application startup JS *files*, before → after | **52 → 15** |
| **M23** | Application fully loaded @ 1 Mbps / 300 ms RTT (emulated) | **9,190 ms → 713 ms** |
| **M24** | Application total requests, before → after | **140 → 69** |
| **M25** | Downlink the corporate browser reported for itself | **1.75 Mbps** |

### What Tier 1 rules out

Each hypothesis is paired with the measurement that eliminates it **and the scope of that
measurement**, because a corporate-environment probe and a local build measurement do not
prove the same thing.

| Hypothesis | Eliminated by | Scope of that evidence |
|---|---|---|
| Application JavaScript too heavy | M21, M22, M23, M24 | Local build + emulated network. **Not** measured in the corporate environment — `/diag/` carries no application JS. |
| Rendering / hydration slow | M23 | Emulated network on the real application. `/diag/` has no React and no hydration, so M1 cannot speak to this. |
| Dynamic imports blocked | M12 | Corporate — the probe tests the browser/environment, and applies regardless of which page runs it. |
| CSP blocking or delaying execution | M13, M15 | Corporate, environment-level. |
| Service Worker stalling startup | M14 | Corporate, environment-level. |
| `localStorage` blocked | M15 | Corporate, environment-level. |
| Compression stripped in transit | M8 | Corporate, measured on the document response from this origin. |
| Redirect chain before the app | M16 | Corporate, for the `/diag/` navigation. |
| Slow origin or CDN | M5, M9 | Corporate — origin answered in 60 ms from cache. |
| Network distance to origin | M6 | Corporate — equal to or better than the clean baseline. |
| Bandwidth as the primary cause | M4, M7, M25 | Corporate — 8 KB at 1.75 Mbps is ~37 ms of transfer; it took 444 ms. |

The first two rows are the reason U5 remains open: the application's own behaviour inside
the corporate environment has not been measured, only its behaviour elsewhere.

---

## 4. Tier 2 — Strong evidence (engineering conclusions)

These are conclusions. They are well supported by Tier 1, but they are not themselves
measurements.

### C1 — An inspection / rewriting layer sits in the delivery path and is measurably expensive
Supported by M4 (32× body delivery for identical bytes), M10 (13× DOM inflation), and
M17/M18 — a penalty on the *first* delivery of a body that disappears on repeats. That is
the signature of inline inspection with caching. Distance to the server cannot produce it,
because distance would penalise all three fetches equally.

### C2 — That layer is Ericom Shield
Supported by M11 (`__shieldHandlers`, present only in the corporate environment), M20 (the
address bar rewritten to the Ericom tenant with the real URL as a query parameter), and the
red isolation frame drawn around the viewport in the corporate screenshots.

### C3 — Access is additionally gated by content filtering
Supported by M19: the domain is categorised "Newly Registered Websites" and blocked by
default; reaching it consumes a personal quota (60 minutes total, 10-minute sessions).

### C4 — The reported wait is unlikely to originate in application execution
Supported by M1 and M2 (the delivery path can serve a page end-to-end in under a second in
this environment) together with M21–M24 (the application's own startup cost, measured
locally and under emulation, is well under a second at 1 Mbps).

**This narrows where to look; it does not by itself measure where the time goes.** It also
carries the scope limit stated above: the in-environment half of this conclusion was
measured on `/diag/`, not on the application.

### C5 — A hostname check is not a valid isolation test here
**[MEASURED]** Inside the page, `location.hostname` reports `sapbysali.app` and
`inside a frame` is `false`, even though the address bar shows the Ericom tenant. The
isolation layer rewrites the page's own view of its location.
**[STRONG EVIDENCE]** A hostname-based isolation check therefore returns a false negative
in this environment. Detection succeeded only through the injected global. Anyone repeating
this analysis should not trust `location` as an isolation test.

---

## 5. Tier 3 — Assumptions and open items requiring IT verification

**None of the open items below has been measured.** Where a row cites an M-number, that
citation is the measured *reason the question arises* — not an answer to it.

| ID | Open item | Why it is unverified | Who can measure it |
|---|---|---|---|
| **U1** | **The size of the pre-navigation gap** — time between the user pressing Enter and the browser beginning the navigation | Navigation Timing measures everything relative to `navigationStart`, so by construction it cannot observe anything before that moment. No external wall-clock anchor was supplied in this run. | Anyone, via §6.1 — takes ~30 seconds |
| **U2** | **Whether isolation container startup is the dominant component of that gap** | Requires the Ericom tenant's own timing, or a HAR showing the wait on the `shield.ericomcloud.net` request | Security team / Ericom console |
| **U3** | **Time spent in category lookup and quota evaluation** | Internal to the web filter | Security team |
| **U4** | **Whether Omnissa Horizon session or Chrome startup is included in the user's perceived wait** | Happens before any web request | IT |
| **U5** | **How the application itself behaves inside the corporate environment** | Only `/diag/` was loaded there. The application was never measured in-environment, and it differs from `/diag/` in both composition (React, hydration) and response count — 69 requests including 15 startup JS files (M22, M24) against the diagnostics page's 4. The per-response penalty in M17 makes response count a plausible multiplier. | Anyone, via §6.1 |
| **U6** | **Whether the app could be excluded from isolation, and what that would save** | Policy question plus a measurement after the change | Security team |

---

## 6. How to close the remaining gaps

### 6.1 The pre-navigation gap and the application's in-environment profile — closes U1 and U5

> **The console command works on `https://sapbysali.app/` only — NOT on `/diag/`.**
> `__neoTimeline` is injected by the application's own layout. The diagnostics page is a
> standalone static HTML file with no application code, so the function does **not** exist
> there and the call returns `ReferenceError: __neoTimeline is not defined`. Verified
> against production. Running it on the wrong URL wastes a full 10-minute quota session —
> the same way the `/diag.html` vs `/diag/` error already did once.
>
> `/diag/` has the equivalent built into the page: **section 0**, with its own wall-clock
> field and no console needed. Same anchoring, different interface. Use whichever page you
> are on — but do not type the console command into `/diag/`.

1. Note the wall-clock second you press Enter.
2. Load `https://sapbysali.app/` — the application, because this run must also answer U5.
3. When the page appears, open the console (F12) and run:
   ```js
   __neoTimeline("HH:MM:SS")
   ```
4. Read the row `BEFORE navigation (proxy/isolation)`.

One run on the application page answers both open items. The `BEFORE navigation` row gives
the gap (U1). `TOTAL to load event`, compared against the diagnostics page's 960 ms (M1),
gives the first in-environment measurement of the application itself (U5).

**[UNVERIFIED — expected shape only, not a prediction]** Given a 960 ms measured in-session
load for `/diag/` and a ~10 s reported wait, the `BEFORE navigation` row would be expected
to show several seconds. If it does not, the assumption in §1 is wrong and the
investigation should reopen.

### 6.2 The HAR — closes U2
F12 → Network → tick **Preserve log** and **Disable cache** → load the site →
right-click → **Save all as HAR with content**.

The figure to read: **Waiting (TTFB) on the request to `shield.ericomcloud.net`**. That
value is the isolation layer's own response time. `chrome://net-export` gives a fuller
record.

### 6.3 From the vendor consoles — closes U2, U3, U4
- Ericom Shield: container start / session establishment time for this tenant; whether
  containers are pre-warmed or started on demand.
- Web filter: time in category lookup and quota evaluation.
- Omnissa Horizon: session and client startup time, if the user's wait includes opening the
  VDI session.

---

## 7. Recommendations for the infrastructure team

Ordered by expected impact. Every **expected effect is [UNVERIFIED]** until measured after
the change; the basis column shows the measurements and conclusions behind it.

| # | Action | Expected effect | Basis | Owner |
|---|---|---|---|---|
| 1 | **Exclude `sapbysali.app` from Ericom Shield isolation** (direct-fetch policy) | Removes container startup, the 430 ms body-delivery overhead, the 384 ms first-fetch penalty and the 290 KB injection | M4, M10, M17, C1, C2 | Security |
| 2 | **Re-categorise the domain out of "Newly Registered Websites" and allowlist it** | Removes the block page and the quota prompt | M19, C3 | Security |
| 3 | If isolation must remain, **pre-warm containers** for this tenant or keep sessions alive between page loads | Targets the pre-navigation gap directly | U1, U2 | Security + vendor |
| 4 | If isolation must remain, allow **already-compressed, edge-cached static assets to bypass body inspection** | Targets the 32× body-delivery penalty | M4, M8, M9 | Security |
| 5 | Provide the HAR and the Ericom container-start metric | Converts the largest open assumption into a measured number | U1, U2 | IT |

Items 1 and 2 are policy changes for an internal knowledge tool published by the company's
own developer. They do not weaken the posture applied to genuinely unknown sites.

---

## 8. Application-side work completed during the investigation **[MEASURED]**

These were real defects, found and corrected. They stand on their own merit, and they
reduce what the isolation layer has to fetch, inspect and instrument on every session.
All figures are local builds and emulated networks, not the corporate environment.

| Metric | Before | After | ID |
|---|---:|---:|---|
| Startup JavaScript | 21,316 KB | **755 KB** (−96%) | M21 |
| JS files at startup | 52 | **15** (−71%) | M22 |
| Total requests | 140 | **69** (−51%) | M24 |
| Fully loaded @ 1 Mbps / 300 ms RTT (emulated) | 9,190 ms | **713 ms** (13×) | M23 |

Causes: `<Link>` prefetch pulled entire unvisited routes into the homepage (a 9.1 MB and a
7.1 MB chunk, both served uncompressed because they exceeded the CDN's compression size
limit), and always-mounted overlays fetched their chunks immediately after hydration on
every page.

A separate defect — the shell switching to the tablet layout at any viewport under 1280 CSS
px, which made an 85″ display render as a tablet during a presentation — was fixed by
deciding layout from device class rather than viewport width.

---

## 9. Confidence statement

**What the evidence supports.** The collected measurements show no evidence of an 8–10
second delay inside the application. In the corporate environment a full page load was
measured at 960 ms with first contentful paint at 888 ms (M1, M3); on the application
itself, measured locally and under emulation, startup is 755 KB across 15 files and 713 ms
fully loaded at 1 Mbps (M21–M23).

**What that does and does not establish.** It establishes that application execution, on
every measurement taken, is on the order of one second. It does **not** measure where the
remaining seconds of the user's wait are spent — that requires §6.1 and §6.2. And the
in-environment measurement was taken on `/diag/`, which contains no application code, so
the application's behaviour *inside* the corporate environment remains unmeasured (U5).

**On further application optimisation.** The application side is *probably* not where the
remaining time is, but I am not willing to declare it closed, for a specific reason in the
data: the inspection penalty in M17 is **per response** (384 ms on a first delivery, ~0 on
repeats). The diagnostics page fetches **4** resources. The application issues **69**
requests, of which 15 are startup JavaScript files (M22, M24). If each first delivery
carries a comparable penalty and they do not fully overlap, the application page could
measure materially worse than the 960 ms recorded for `/diag/`.

That is U5, and it is cheap to settle: one run of `__neoTimeline("HH:MM:SS")` on
`https://sapbysali.app/` (§6.1). If the application page lands near 960 ms, the application
side is closed. If it lands much higher, then reducing the *number* of startup responses —
not their size — is the remaining application-side lever and is worth pursuing.

I would rather leave that open than close the investigation on a page that carries neither
the application's code nor its request count.

---

## 10. Evidence index

| Artifact | Source | Establishes |
|---|---|---|
| Corporate diagnostics report | `/diag/` inside Ericom, 2026-08-02 19:39 UTC | M1, M3–M11, M16, M25 |
| Clean-network baseline | `/diag/`, unfiltered, same URL, headless Chrome on macOS | M2, and the comparison basis for M4, M10 |
| Deep probes, ~20 runs | corporate, run from `/diag/` | M12–M15, M17, M18 |
| Block-page screenshot | corporate filter `10.199.215.42:15871` | M19 |
| Address-bar screenshot | corporate Chrome | M20 |
| Emulated network matrix | local, pre- and post-fix | M23 |
| Production build measurements | local | M21, M22, M24 |

**Outstanding:** U1–U6. Until U1 and U2 exist, the attribution of the remaining seconds to
the delivery path is an engineering conclusion (C4), not a measurement. Until U5 exists,
the application's behaviour inside the corporate environment is inferred from measurements
taken elsewhere.
