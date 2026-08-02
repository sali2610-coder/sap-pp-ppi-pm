# Root Cause Analysis — startup delay in the corporate environment

**Application:** SAP by Sali · Project NEO — `https://sapbysali.app`
**Environment:** Omnissa Horizon Client → Windows Enterprise VDI → Chrome 138 → corporate web filter → Ericom Shield
**Reported symptom:** ~8–10 s of blank screen before the application appears, during executive presentations
**Date of measurement:** 2026-08-02

---

## How to read this document

Every statement below is tagged with the strength of its backing. The distinction is
deliberate: a measurement and a conclusion drawn from measurements are not the same thing,
and this investigation is only useful if the two stay separated.

| Tag | Meaning |
|---|---|
| **[MEASURED]** | Directly observed and reproducible. A number someone can re-collect. |
| **[STRONG EVIDENCE]** | An engineering conclusion supported by several consistent measurements. Not itself a measurement. |
| **[UNVERIFIED]** | Plausible, not yet measured. Requires data the application cannot collect. |

---

## 1. Summary

**[MEASURED]** Inside the corporate environment, the page completes its full load —
connection, download, parse, paint, load event — in **960 ms**. The same URL from an
unfiltered machine completes in **266 ms**. Both fetched an identical payload (8 KB wire,
19 KB decoded).

**[MEASURED]** The collected measurements show **no evidence of an 8–10 second delay
occurring inside the application**. Once the request reaches the origin and execution
begins, the application is on screen in roughly one second.

**[STRONG EVIDENCE]** The delivery path adds measurable cost: identical bytes take 32×
longer to deliver, and ~290 KB of foreign instrumentation is injected into a 19 KB document.

**[UNVERIFIED]** If users still experience an 8–10 second wait, the remaining time most
likely occurs **before normal page execution begins** — during proxy category evaluation,
quota handling, session hand-off, or isolation container startup. This has not been measured
and should be investigated by the infrastructure / security team (§6).

---

## 2. Side-by-side measurement — identical URL, identical payload **[MEASURED]**

Both runs: `https://sapbysali.app/diag/`, Chrome, Windows UA, cold load.

| Measurement | Unfiltered machine | Corporate (Ericom) | Ratio |
|---|---:|---:|---|
| DNS lookup | 0 ms | 0 ms | — |
| TCP connect | 145 ms | 134 ms | same |
| TLS handshake | 137 ms | 124 ms | same |
| Request → first byte (TTFB) | 67 ms | 60 ms | same |
| **HTML download** | **14 ms** | **444 ms** | **32×** |
| Parse → DOM interactive | — | 109 ms | — |
| DOMContentLoaded | — | 5 ms | — |
| → load event | — | 200 ms | — |
| **TOTAL to load event** | **266 ms** | **960 ms** | **3.6×** |
| First Paint / FCP / LCP | 328 ms | 888 ms | 2.7× |
| Wire / decoded payload | 8 KB / 19 KB | 8 KB / 19 KB | **identical** |
| Protocol | h2 | h2 | same |
| Resource count | 6 | 4 | — |
| **DOM size after execution** | **24 KB** | **314 KB** | **13×** |
| Security-product globals | none | `__shieldHandlers` | injected |

Two observations carry the analysis:

- **[MEASURED]** TTFB is the same on both sides; HTML download is 32× slower on one. The
  origin answers just as fast in both environments. The extra time is spent after the server
  has responded, delivering an 8 KB body that is already brotli-compressed
  (`content-encoding: br`) and served from an edge-cache hit (`x-vercel-cache: HIT`). At the
  reported 1.75 Mbps link, 8 KB should transfer in roughly 35 ms; it took 444 ms.
- **[MEASURED]** The document grew from 24 KB to 314 KB. The published file is 19 KB.

---

## 3. Tier 1 — Proven by measurement

Each of these is a directly observed value, reproducible by re-running the diagnostics.

| # | Finding | Value |
|---|---|---|
| 1.1 | Full page load inside the corporate browser | **960 ms** |
| 1.2 | Same page, unfiltered machine | **266 ms** |
| 1.3 | First Contentful Paint, corporate | **888 ms** |
| 1.4 | HTML body delivery, corporate vs clean, identical bytes | **444 ms vs 14 ms** |
| 1.5 | TTFB, corporate | **60 ms** (clean: 67 ms) |
| 1.6 | DNS / TCP / TLS, corporate | **0 / 134 / 124 ms** (clean: 0 / 145 / 137) |
| 1.7 | Payload delivered, both environments | **8 KB wire / 19 KB decoded** |
| 1.8 | Compression present in corporate run | **`content-encoding: br`** |
| 1.9 | Edge cache status | **`x-vercel-cache: HIT`** |
| 1.10 | DOM size after execution, corporate vs clean | **314 KB vs 24 KB** |
| 1.11 | Security-product global present, corporate only | **`__shieldHandlers`** |
| 1.12 | `dynamic import()` latency, ~20 runs | **5–32 ms** (never blocked) |
| 1.13 | CSP violations observed | **zero**, every run |
| 1.14 | Service worker startup | **0 ms**; SW query 3–8 ms |
| 1.15 | `localStorage`, `eval` / `new Function` | **available / allowed** |
| 1.16 | Redirects before this document | **0 ms** |
| 1.17 | First-fetch penalty, same 60 KB file ×3, first session | **467 / 82 / 84 ms → +384 ms** |
| 1.18 | Same test, later sessions | **69–92 ms across all three → 0–21 ms** |
| 1.19 | Corporate filter block page | category **"Newly Registered Websites"**, quota-gated |
| 1.20 | Address bar in corporate Chrome | `shield.ericomcloud.net/?Shield-TenantID=…&url=…` |
| 1.21 | Startup JavaScript, before → after our fixes | **21,316 KB → 755 KB** |
| 1.22 | Startup JS files, before → after | **52 → 15** |
| 1.23 | Fully loaded @ 1 Mbps / 300 ms RTT, before → after (emulated) | **9,190 ms → 713 ms** |

### What Tier 1 rules out

Each hypothesis is paired with the measurement that eliminates it.

| Hypothesis | Eliminated by |
|---|---|
| Application JavaScript too heavy | 1.1 — full load 960 ms; also 1.21–1.23 |
| Rendering / hydration slow | 1.1, 1.3 — DCL 5 ms, load event 200 ms |
| Dynamic imports blocked | 1.12 |
| CSP blocking or delaying execution | 1.13, 1.15 |
| Service Worker stalling startup | 1.14 |
| `localStorage` blocked | 1.15 |
| Compression stripped in transit | 1.8 |
| Redirect chain before the app | 1.16 |
| Slow origin or CDN | 1.5, 1.9 |
| Network distance to origin | 1.6 — equal to or better than the clean baseline |
| Bandwidth as the primary cause | 1.4, 1.7 — 8 KB should not need 444 ms |

---

## 4. Tier 2 — Strong evidence (engineering conclusions)

These are conclusions. They are well supported by Tier 1, but they are not themselves
measurements.

### 4.1 An inspection / rewriting layer sits in the delivery path and is measurably expensive
Supported by 1.4 (32× body delivery for identical bytes), 1.10 (13× DOM inflation), and
1.17/1.18 (a penalty on the *first* delivery of a body that disappears on repeats — the
signature of inline inspection with caching, which distance to the server cannot produce
because distance would penalise all three fetches equally).

### 4.2 That layer is Ericom Shield
Supported by 1.11 (`__shieldHandlers`, present only in the corporate environment), 1.20 (the
address bar rewritten to the Ericom tenant with the real URL as a query parameter), and the
red isolation frame drawn around the viewport in the corporate screenshots.

### 4.3 Access is additionally gated by content filtering
Supported by 1.19: the domain is categorised "Newly Registered Websites" and blocked by
default; reaching it consumes a personal quota (60 minutes total, 10-minute sessions).

### 4.4 The reported wait is unlikely to originate in application execution
Supported by 1.1 against the reported symptom: a 960 ms measured load cannot fill an 8–10 s
reported wait. **This narrows where to look; it does not by itself measure where the time
goes.**

### 4.5 A detection caveat worth recording
**[MEASURED]** Inside the page, `location.hostname` reports `sapbysali.app` and
`inside a frame` is `false`, even though the address bar shows the Ericom tenant. The
isolation layer rewrites the page's own view of its location.
**[STRONG EVIDENCE]** A hostname-based isolation check therefore returns a false negative in
this environment. Detection succeeded only through the injected global. Anyone repeating
this analysis should not trust `location` as an isolation test.

---

## 5. Tier 3 — Assumptions and open items requiring IT verification

Nothing in this section has been measured. It is listed so that no reader mistakes it for a
finding.

| # | Open item | Why it is unverified | Who can measure it |
|---|---|---|---|
| 3.1 | **The size of the pre-navigation gap** — time between the user pressing Enter and the browser beginning the navigation | `performance.timing` defines `navigationStart = 0` and cannot observe anything earlier. No wall-clock anchor was supplied in this run. | Anyone, via §6.1 — takes ~30 seconds |
| 3.2 | **Whether isolation container startup is the dominant component of that gap** | Requires the Ericom tenant's own timing, or a HAR showing the wait on the `shield.ericomcloud.net` request | Security team / Ericom console |
| 3.3 | **Time spent in category lookup and quota evaluation** | Internal to the web filter | Security team |
| 3.4 | **Whether Omnissa Horizon session or Chrome startup is included in the user's perceived wait** | Happens before any web request | IT |
| 3.5 | **Whether the application page (15 startup responses) pays a larger inspection cost than the diagnostics page (4 responses)** | The 384 ms penalty in 1.17 is per response. Only the diagnostics page was measured in-environment. | Anyone, via §6.1 run against `/` instead of `/diag/` |
| 3.6 | **Whether the app could be excluded from isolation, and what that would save** | Policy question plus a measurement after the change | Security team |

---

## 6. How to close the remaining gaps

### 6.1 The pre-navigation gap — closes 3.1 and 3.5
1. Note the wall-clock second you press Enter.
2. When the page appears, open the console (F12) and run:
   ```js
   __neoTimeline("HH:MM:SS")
   ```
3. Read the row `BEFORE navigation (proxy/isolation)`.

Run it twice: once on `https://sapbysali.app/diag/` and once on `https://sapbysali.app/`.
The first anchors the gap; the difference between the two answers 3.5.

**[UNVERIFIED — expected shape only, not a prediction of fact]** Given a 960 ms measured
in-session load and a ~10 s reported wait, the row would be expected to show several
seconds. If it does not, the assumption in §1 is wrong and the investigation should reopen.

### 6.2 The HAR — closes 3.2
F12 → Network → tick **Preserve log** and **Disable cache** → load the site →
right-click → **Save all as HAR with content**.

The figure to read: **Waiting (TTFB) on the request to `shield.ericomcloud.net`**. That
value is the isolation layer's own response time. `chrome://net-export` gives a fuller
record.

### 6.3 From the vendor consoles — closes 3.2, 3.3, 3.4
- Ericom Shield: container start / session establishment time for this tenant; whether
  containers are pre-warmed or started on demand.
- Web filter: time in category lookup and quota evaluation.
- Omnissa Horizon: session and client startup time, if the user's wait includes opening the
  VDI session.

---

## 7. Recommendations for the infrastructure team

Ordered by expected impact. Expected effects are **[UNVERIFIED]** until measured after the
change; the reasoning behind each is Tier 1 or Tier 2 as noted.

| # | Action | Expected effect | Basis | Owner |
|---|---|---|---|---|
| 1 | **Exclude `sapbysali.app` from Ericom Shield isolation** (direct-fetch policy) | Removes container startup, the 430 ms body-delivery overhead, the 384 ms first-fetch penalty and the 290 KB injection | 1.4, 1.10, 1.17, 4.1, 4.2 | Security |
| 2 | **Re-categorise the domain out of "Newly Registered Websites" and allowlist it** | Removes the block page and the quota prompt | 1.19, 4.3 | Security |
| 3 | If isolation must remain, **pre-warm containers** for this tenant or keep sessions alive between page loads | Targets the pre-navigation gap directly | 3.1, 3.2 | Security + vendor |
| 4 | If isolation must remain, allow **already-compressed, edge-cached static assets to bypass body inspection** | Targets the 32× body-delivery penalty | 1.4, 1.8, 1.9 | Security |
| 5 | Provide the HAR and the Ericom container-start metric | Converts the largest open assumption into a measured number | 3.1, 3.2 | IT |

Items 1 and 2 are policy changes for an internal knowledge tool published by the company's
own developer. They do not weaken the posture applied to genuinely unknown sites.

---

## 8. Application-side work completed during the investigation **[MEASURED]**

These were real defects, found and corrected. They stand on their own merit, and they reduce
what the isolation layer has to fetch, inspect and instrument on every session.

| Metric | Before | After |
|---|---:|---:|
| Startup JavaScript | 21,316 KB | **755 KB** (−96%) |
| JS files at startup | 52 | **15** (−71%) |
| Requests | 140 | **69** (−51%) |
| Fully loaded @ 1 Mbps / 300 ms RTT (emulated) | 9,190 ms | **713 ms** (13×) |

Causes: `<Link>` prefetch pulled entire unvisited routes into the homepage (a 9.1 MB and a
7.1 MB chunk, both served uncompressed because they exceeded the CDN's compression size
limit), and always-mounted overlays fetched their chunks immediately after hydration on
every page.

A separate defect — the shell switching to the tablet layout at any viewport under 1280 CSS
px, which made an 85″ display render as a tablet during a presentation — was fixed by
deciding layout from device class rather than viewport width.

---

## 9. Confidence statement

**What the evidence supports:** the collected measurements show no evidence of an 8–10
second delay inside the application. Measured in the corporate environment itself, the page
is fully loaded 960 ms after navigation begins, with first contentful paint at 888 ms.

**What that does and does not establish:** it establishes that application execution, as
measured, is roughly one second. It does not by itself measure where the remaining seconds
of the user's wait are spent — that requires §6.1 and §6.2.

**On further application optimisation.** The application side is *probably* not where the
remaining time is, but I am not willing to declare it closed, for a specific reason in the
data: the inspection penalty in 1.17 is **per response** (384 ms on a first delivery, ~0 on
repeats). The diagnostics page fetches **4** resources; the application fetches **15**. If
each first delivery carries a comparable penalty and they do not fully overlap, the
application page could measure meaningfully worse than the 960 ms recorded here.

That is item 3.5 — **[UNVERIFIED]** — and it is cheap to settle: one run of
`__neoTimeline()` against `/` instead of `/diag/`. If the app page lands near 960 ms, the
application side is closed. If it lands much higher, then reducing the *number* of startup
responses — not their size — is the remaining application-side lever and is worth pursuing.

I would rather leave that open than close the investigation on a page carrying a quarter of
the application's requests.

---

## 10. Evidence index

| Artifact | Source | Establishes |
|---|---|---|
| Corporate diagnostics report | `/diag/` inside Ericom, 2026-08-02 19:39 UTC | 1.1, 1.3–1.11, 1.16 |
| Clean-machine baseline | `/diag/`, unfiltered, same URL | 1.2, and the comparison basis for 1.4, 1.10 |
| Deep probes, ~20 runs | corporate | 1.12–1.15, 1.17, 1.18 |
| Block-page screenshot | corporate filter `10.199.215.42:15871` | 1.19 |
| Address-bar screenshot | corporate Chrome | 1.20 |
| Emulated network matrix | local, pre- and post-fix | 1.23 |
| Production build measurements | local | 1.21, 1.22 |

**Outstanding:** items 3.1–3.6. Until 3.1 and 3.2 exist, the attribution of the remaining
seconds to the delivery path is an engineering conclusion (§4.4), not a measurement.
