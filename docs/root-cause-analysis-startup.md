# Root Cause Analysis — startup delay in the corporate environment

**Application:** SAP by Sali · Project NEO — `https://sapbysali.app`
**Environment:** Omnissa Horizon Client → Windows Enterprise VDI → Chrome 138 → corporate web filter → Ericom Shield
**Reported symptom:** ~8–10 s of blank screen before the application appears, during executive presentations
**Date of measurement:** 2026-08-02
**Status:** Application cleared. Remaining delay attributed to the delivery path; one measurement still outstanding (§6).

---

## 1. Executive summary

The application is not the cause of the 8–10 second wait.

Measured inside the corporate environment, the entire page — connection, download, parse,
paint, load — completes in **960 ms**. The same page measured from an unfiltered machine
completes in **266 ms**. Both fetched an identical payload (8 KB on the wire, 19 KB decoded)
from the same production URL.

The difference is not distance to the server: DNS, TCP, TLS and TTFB are effectively the
same in both environments. The difference is what happens to the response **after** the
server answers, and the environment leaves three fingerprints of it (§5).

The application already loads in under a second inside the corporate environment. No
change to it can remove a wait that occurs before it starts executing.

---

## 2. Side-by-side measurement — identical URL, identical payload

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

The two rows that matter:

- **TTFB is the same, HTML download is 32× slower.** The origin answers just as fast in
  both cases. The delay is entirely in delivering an 8 KB body that was already compressed
  (`content-encoding: br`) and cached at the edge (`x-vercel-cache: HIT`). At the reported
  1.75 Mbps link, 8 KB should transfer in roughly 35 ms. It took 444 ms.
- **The document grew from 24 KB to 314 KB.** ~290 KB of code that we did not publish was
  injected into the page. The file we serve is 19 KB.

---

## 3. What is proven

1. **The application executes fast inside the corporate environment.** 960 ms from
   navigation start to load event, 888 ms to first contentful paint, on the real corporate
   Chrome behind the real filter.
2. **The payload is not the problem.** Identical bytes on both sides; compression is
   intact (`br`); the edge cache is hitting.
3. **The network path to the origin is not the problem.** DNS 0 ms, TCP 134 ms, TLS 124 ms,
   TTFB 60 ms — all equal to or better than the unfiltered baseline.
4. **An inspection/rewriting layer is present and is measurably expensive.** 430 ms of added
   body-delivery time for 8 KB, plus a 384 ms first-fetch penalty (§5.3).
5. **The document is being rewritten in transit.** 290 KB of foreign instrumentation in a
   19 KB page.

## 4. What is ruled out — each with the measurement that ruled it out

| Hypothesis | Verdict | Evidence |
|---|---|---|
| Application JavaScript is too heavy | **Ruled out** | Startup JS reduced 21,316 KB → 755 KB, but even before that the app painted content in ~200 ms at 1 Mbps in emulation. In-environment total load is 960 ms. |
| Rendering / hydration is slow | **Ruled out** | FCP 888 ms, DOMContentLoaded 5 ms, load event 200 ms — inside the corporate browser. |
| Dynamic imports are blocked | **Ruled out** | `dynamic import()` probe: 5–32 ms across ~20 runs. Never blocked. |
| CSP is blocking or delaying execution | **Ruled out** | Zero `securitypolicyviolation` events across every run. `eval` / `new Function` allowed. |
| Service Worker registration stalls startup | **Ruled out** | `service worker startup: 0 ms`; SW query returns in 3–8 ms. (0 registrations — see §6.) |
| `localStorage` blocked | **Ruled out** | Available. |
| Compression stripped by the proxy | **Ruled out** | `content-encoding: br` present in the corporate run. |
| Redirect chain before the app | **Ruled out** *(for this page)* | `redirects: 0 ms`. |
| Slow origin / CDN | **Ruled out** | TTFB 60 ms, `x-vercel-cache: HIT`. |
| Bandwidth | **Ruled out as the primary cause** | 1.75 Mbps reported; an 8 KB page should not take 444 ms to deliver. |

## 5. Evidence that Ericom Shield / browser isolation is involved

### 5.1 Injected globals
`isolation/proxy globals: __shieldHandlers` — present in every corporate run, absent in
every clean run. This is Ericom Shield instrumentation inside the page.

### 5.2 URL rewriting at the browser level
The address bar reads:
```
shield.ericomcloud.net/?Shield-TenantID=49586765-722a-4ddd-ab06-9812527aa22a
                       &X-Authenticated-User=Sali%20Halif
                       &url=https%3A%2F%2Fsapbysali.app%2Fdiag%2F
```
The real destination is a query parameter. A red frame is drawn around the viewport — the
standard Ericom Shield isolation indicator.

**Note for accuracy:** inside the page, `location.hostname` still reports `sapbysali.app`
and `inside a frame? no`. The isolation layer rewrites the page's own view of its location,
so a hostname check cannot detect it. Detection succeeded only through the injected
globals. This is worth recording because the obvious test gives a false negative.

### 5.3 Inspection fingerprint — first-fetch penalty
The diagnostics fetch the same 60 KB file three times with caching disabled:

| Run | fetch #1 | fetch #2 | fetch #3 | penalty |
|---|---:|---:|---:|---:|
| First run of the session | **467 ms** | 82 ms | 84 ms | **+384 ms** |
| Subsequent runs | 69–92 ms | 69–80 ms | 67–92 ms | 0–21 ms |

A large penalty on the **first** delivery of a given body, disappearing on repeats, is the
signature of inline content inspection with caching — not of distance to the server, which
would penalise all three equally.

### 5.4 Content filtering by category
Before any of this, the corporate web filter at `10.199.215.42:15871` returned a block page:

```
Reason : This category is blocked: Newly Registered Websites
URL    : https://sapbysali.app/diag/
USERNAME: Sali Halif        IP: 10.70.3.126
Options: Use Quota Time — 60 minutes remaining, 10-minute sessions
```

Every access is either blocked or charged against a personal quota.

### 5.5 Body inflation
19 KB published → 314 KB in the DOM. ~290 KB of instrumentation injected per page load,
which must itself be generated, transferred, parsed and executed.

---

## 6. What only the IT / Security team can measure

Everything above was measured **from inside the page**, which by definition can only see
its own load. Two things remain outside its reach, and both are needed to attribute the
final seconds precisely.

### 6.1 The pre-navigation gap — the decisive number
`performance.timing` defines `navigationStart = 0`. It cannot observe the proxy category
lookup, the quota decision, the hand-off to the Ericom tenant, or the start of the isolation
container — all of which happen **before** the browser begins the navigation.

The diagnostics can measure it, but only with an external anchor. It was not supplied in
this run. To capture it:

1. Note the wall-clock second you press Enter.
2. When the page appears, run in the console:
   ```js
   __neoTimeline("HH:MM:SS")
   ```
3. Read the row `BEFORE navigation (proxy/isolation)`.

Expected shape, given a 960 ms in-session load and a ~10 s perceived wait:
```
BEFORE navigation (proxy/isolation) : ~8,000–9,000 ms
TOTAL Enter -> usable               : ~9,000–10,000 ms
  application share                 :  ~960 ms  (~10%)
  delivery-path share               : ~9,000 ms (~90%)
```

### 6.2 The HAR — the only view of the request chain
A page cannot see the redirects that preceded it, nor how long the Ericom tenant took to
answer. Capture in the corporate browser:

F12 → Network → tick **Preserve log** and **Disable cache** → load the site →
right-click → **Save all as HAR with content**.

The figure that settles it: **Waiting (TTFB) on the request to `shield.ericomcloud.net`.**
That value *is* the isolation container starting. `chrome://net-export` gives the fuller
record.

### 6.3 Questions only IT can answer from their own consoles
- Ericom Shield: container start / session-establishment time for this tenant, and whether
  containers are pre-warmed or started on demand.
- Web filter: time spent in category lookup and quota evaluation.
- Omnissa Horizon: session and client startup time, if the wait includes opening the VDI.
- Whether `sapbysali.app` is in the isolation policy scope or could be fetched directly.

---

## 7. Recommendations for the infrastructure team

Ordered by expected impact.

| # | Action | Expected effect | Owner |
|---|---|---|---|
| 1 | **Exclude `sapbysali.app` from Ericom Shield isolation** (direct-fetch policy for this domain). | Removes container startup, the 430 ms body-delivery overhead, the 384 ms first-fetch inspection penalty and the 290 KB injection. This is the change that removes the wait. | Security |
| 2 | **Re-categorise the domain out of "Newly Registered Websites" and allowlist it.** | Removes the block page and the quota prompt; stops users burning a 60-minute personal budget to reach an internal tool. | Security |
| 3 | If isolation must stay, ask the vendor to **pre-warm containers** for this tenant, or to keep the session alive between page loads. | Directly targets the pre-navigation gap. | Security + vendor |
| 4 | If isolation must stay, request that **already-compressed, edge-cached static assets bypass body inspection**. | Targets the 32× body-delivery penalty. | Security |
| 5 | Provide the HAR and the Ericom container-start metric (§6). | Converts the remaining estimate into a measured number. | IT |

Items 1 and 2 are policy changes on an internal knowledge tool published by the company's
own developer. They do not weaken the security posture for genuinely unknown sites.

---

## 8. What was fixed on the application side regardless

These were real defects, found and corrected during the investigation. They stand on their
own merit and they reduce what the isolation container has to fetch, inspect and inject on
every session.

| Metric | Before | After |
|---|---:|---:|
| Startup JavaScript | 21,316 KB | **755 KB** (−96%) |
| JS files at startup | 52 | **15** (−71%) |
| Requests | 140 | **69** (−51%) |
| Fully loaded @ 1 Mbps / 300 ms RTT | 9,190 ms | **713 ms** (13×) |

Causes: `<Link>` prefetch pulled entire unvisited routes into the homepage (a 9.1 MB and a
7.1 MB chunk, both served uncompressed because they exceeded the CDN's compression limit),
and always-mounted overlays fetched their chunks immediately after hydration on every page.

A separate defect — the shell switching to the tablet layout at any viewport under 1280 CSS
px, which is what made an 85″ display render as a tablet — was fixed by deciding the layout
from device class rather than width.

---

## 9. Confidence statement — would further application optimisation help?

**On the main question: yes, I am confident. Application execution cannot account for the
8–10 second wait.** The entire in-environment load is 960 ms. Even reducing the application
to nothing would leave more than 90% of the wait untouched.

**But I will not claim the application side is fully exhausted, because one measurement
supports a caveat.**

The inspection penalty measured is **per response**, not per byte: 384 ms on the first
delivery of one file, ~0 ms on repeats. The diagnostics page fetches **4** resources. The
application fetches **15** at startup. If each first delivery carries a similar penalty and
they do not fully overlap, the application page could pay materially more than the 960 ms
measured here.

That is a hypothesis, not a finding — and it is cheap to settle:

> Run `__neoTimeline("HH:MM:SS")` on `https://sapbysali.app/` (the app, not `/diag/`)
> inside the corporate browser.

If the app page shows a much worse in-session profile than the diagnostics page, then
**reducing the number of startup responses** — not their size — is the remaining
application-side lever, and it is worth pursuing. If it comes back near 960 ms, the
application side is closed.

Either way the conclusion on ownership does not change: the majority of the wait happens
before the application starts executing, and it belongs to the delivery path.

---

## 10. Evidence index

| Artifact | Source | What it establishes |
|---|---|---|
| Corporate diagnostics report | `/diag/` inside Ericom, 2026-08-02 19:39 UTC | 960 ms total load; 444 ms HTML download; 314 KB DOM; `__shieldHandlers` |
| Clean-machine baseline | `/diag/`, unfiltered, same URL | 266 ms total load; 14 ms HTML download; 24 KB DOM; no injected globals |
| Deep probes, ~20 runs | corporate | dynamic import 5–32 ms; 0 CSP violations; first-fetch penalty 384 ms then ~0 |
| Block-page screenshot | corporate web filter `10.199.215.42:15871` | category block + quota system |
| Address-bar screenshot | corporate Chrome | `shield.ericomcloud.net/?Shield-TenantID=…&url=…` + red isolation frame |
| Emulated network matrix | local, pre-fix and post-fix | app paints content in ~200 ms down to 1 Mbps / 300 ms RTT |
| Build measurements | local production build | 21,316 KB → 755 KB startup JS; 52 → 15 files |

**Outstanding:** the pre-navigation gap (§6.1) and the HAR (§6.2). Until those exist, the
~9 s attributed to the delivery path is an inference from a 960 ms in-session load against a
~10 s reported wait — well supported, but not directly measured.
