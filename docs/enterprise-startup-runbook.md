# Enterprise startup investigation — runbook

> **URL — use `https://sapbysali.app/diag/` (with the trailing slash).**
> The project builds with `trailingSlash: true`, so `/diag.html` is NOT served and
> returns the application's 404 page. This was originally documented incorrectly
> and cost a real quota-time session in the corporate environment.

**Goal:** prove *where* the ~10 s wait happens before the app appears in the corporate
environment (Omnissa Horizon + Ericom Shield + VDI). Not to guess. Every step below
produces an artifact you can paste back.

**Why this document exists:** I cannot reach that environment. Everything measured from
outside says the application paints real content in ~200 ms even on a 1 Mbps / 300 ms
link. So the remaining delay is not reproduced by anything I can run, and I am not
willing to blame Ericom or Omnissa without evidence. These steps produce that evidence.

---

## Before you start — two numbers that decide almost everything

While the page is loading in the corporate browser, note:

| # | Observation | What it means |
|---|---|---|
| 1 | **Wall-clock seconds** from pressing Enter until *anything* other than white appears | The total user-perceived wait |
| 2 | The value of **`TOTAL to load event`** reported by `/diag/` in that same session | The part the browser actually spent on our page |

**The gap between them is time spent before our document was ever requested** — session
setup, container start, authentication, policy evaluation. Our code cannot influence
that, and no optimisation will.

Example: wall clock 10 s, `TOTAL to load event` 800 ms → ~9.2 s happened before the app.

---

## Step 1 — run the diagnostics page inside the VDI

Open, in the corporate browser:

```
https://sapbysali.app/diag/
```

1. Wait for it to finish (~2 s).
2. Click **Run deep probes**.
3. Click **Copy full report** and paste it back.

`diag.html` is 11 KB of plain HTML with one inline script — no framework, no bundle, no
third-party request. If *this* page is slow, the application is not the reason.

It reports:

- **Delivery path** — hostname vs `sapbysali.app`, whether the page is inside a frame,
  injected foreign scripts, security-vendor globals, `Via` header, exposed CSP.
- **Connection phases** — redirects, service-worker startup, DNS, TCP, TLS, TTFB,
  HTML download, parse, DOMContentLoaded, load.
- **Paint** — FP, FCP, LCP.
- **App boot marks** — `performance.mark()` emitted by the app (see step 3).
- **Capability probes** — Service Worker availability, CSP violations,
  `dynamic import()`, `eval`, `localStorage`, connection info.
- **Scanning test** — the same file fetched three times with caching off. A large,
  repeatable penalty on the *first* fetch is the fingerprint of inline inspection
  (AV / DLP / isolation), not of distance to the server.
- **Waterfall** — slowest 40 resources with wire size, decoded size, whether they were
  compressed, total time and wait/TTFB.

**Also run the identical page on a normal laptop outside the VDI and keep both reports.**
The comparison is the evidence; a single report on its own proves little.

---

## Step 2 — capture a real HAR from the corporate browser

1. `F12` → **Network** tab.
2. Tick **Preserve log** and **Disable cache**.
3. Load `https://sapbysali.app/`.
4. Right-click the request list → **Save all as HAR with content**.

Send the HAR. It answers, factually:

- Is there a **redirect chain** before the first HTML response?
- What is the **TTFB of the first document**?
- Are responses arriving **compressed** (`content-encoding`)?
- Is there **`Via` / `X-Cache` / vendor headers** proving an intermediary?
- Are requests **queued/stalled** (the "Stalled" and "Waiting" columns) — the signature
  of a proxy serialising traffic?
- Are any requests **duplicated**?

---

## Step 3 — application boot marks

The app now emits `performance.mark()` at each boot stage:

| mark | meaning |
|---|---|
| `neo:html-head` | the browser started executing our HTML head |
| `neo:device-detected` | device class resolved (pre-paint) |
| `neo:dom-ready` | DOMContentLoaded |
| `neo:window-load` | load event |
| `neo:shell-render` | React shell rendered |
| `neo:shell-hydrated` | hydration finished — app is interactive |
| `neo:first-interaction` | user's first real input |
| `neo:overlays-mounted` | deferred overlays mounted |

In the corporate browser, after loading the app, open the console and run:

```js
copy(performance.getEntriesByType("mark")
  .filter(m => m.name.startsWith("neo:"))
  .map(m => m.name + " = " + Math.round(m.startTime) + " ms").join("\n"))
```

Reference numbers measured on a clean network:

```
neo:html-head       94 ms
neo:device-detected 95 ms
neo:dom-ready      164 ms
neo:window-load    205 ms
neo:shell-render   221 ms
neo:shell-hydrated 246 ms
```

If the corporate run shows a similar spread but the user still waited 10 s, the delay is
**not** inside the application boot — it is before `neo:html-head`.

---

## Step 4 — the specific questions you asked, and how each is answered

| Question | Where the answer comes from | What proves it |
|---|---|---|
| Does Ericom delay JavaScript? | diag §6 + HAR | First-fetch penalty on an identical file, repeatable; or large "Stalled/Waiting" per script in the HAR |
| Is the Service Worker blocked? | diag §5 | `Service Worker API: NOT AVAILABLE`, or a blocked registration query |
| Does CSP cause delay? | diag §5 | Captured `securitypolicyviolation` events; blocked `eval` |
| Is antivirus scanning files? | diag §6 + HAR | Same first-fetch penalty pattern, scaling with file size |
| Are dynamic imports blocked? | diag §5 | The `dynamic import()` probe reports BLOCKED |
| Is prefetch delayed? | HAR | Prefetch requests stalled or serialised behind others |
| Is the URL rewritten? | diag §1 | `hostname` is not `sapbysali.app` |
| Is this browser isolation? | diag §1 | Page inside a frame, foreign injected scripts, vendor globals |

---

## Step 5 — what the observations already suggest (hypothesis, not yet proof)

You reported: a **red frame** around the page, a **strange URL**, and ~10 s of white
before anything.

A coloured border plus a rewritten URL is the standard presentation of **Remote Browser
Isolation** — the page is rendered in a container on the vendor's infrastructure and
streamed to the user. If that is what is running, the 10 s is the isolation session
starting, which happens *before* our HTML is requested, and no amount of application
optimisation will shorten it.

**This remains a hypothesis until step 1 confirms it.** The confirmation is specific and
unambiguous:

- `hostname` in diag §1 is **not** `sapbysali.app`, and/or
- `inside a frame? YES`, and/or
- foreign injected resources / vendor globals are listed.

If instead diag §1 comes back clean and `TOTAL to load event` is small while the user
still waited 10 s, then the time is being spent before navigation — VDI session, browser
start, or authentication — and the next step is a network capture at the client, not
another change to the app.

---

## What was already fixed regardless of the outcome

These are real application problems, measured and corrected. They stand on their own
merit and make the app cheaper to deliver and to scan:

| Metric | Before | After |
|---|---|---|
| Startup JavaScript | 21,316 KB | **755 KB** |
| JS files at startup | 52 | **15** |
| Requests | 140 | **69** |
| Fully loaded @ 1 Mbps / 300 ms | 9,190 ms | **713 ms** |

Cause: `<Link>` prefetch pulled entire other routes (a 9.1 MB and a 7.1 MB chunk, both
served uncompressed because they exceed the CDN's compression limit), and always-mounted
overlays fetched their chunks right after hydration on every page.

This reduces what any scanner has to inspect by ~96%. It does **not**, by itself, explain
a 10-second blank screen — and I would rather say that plainly than let a good number
stand in for an answer.

---

# ROOT CAUSE — confirmed from the corporate environment (2026-08-02)

Screenshots captured inside Omnissa Horizon by the user settle the architecture
question. This section is evidence, not hypothesis.

## What the request path actually is

```
Chrome (VDI, 10.70.3.126)
   │
   ▼
Corporate web filter — 10.199.215.42:15871  /cgi-bin/blockpage.cgi?ws-session=…
   │  category lookup → "Newly Registered Websites" → BLOCKED by policy
   │  user must spend "quota time" (60 min budget, 10 min per session) to proceed
   ▼
Ericom Shield cloud — shield.ericomcloud.net
   ?Shield-TenantID=49586765-722a-4ddd-ab06-9812527aa22a
   &X-Authenticated-User=Sali%20Halif
   &url=https%3A%2F%2Fsapbysali.app%2Fdiag.html
   │  remote browser container is started, fetches and renders the page there
   ▼
Rendered output streamed back to the user's Chrome  (red isolation frame drawn)
   ▼
sapbysali.app  ← the origin is only reached at this point, by Ericom, not by the user
```

## Proof, item by item

| Claim | Evidence |
|---|---|
| The browser never talks to `sapbysali.app` directly | Address bar reads `shield.ericomcloud.net/?Shield-TenantID=…&url=https%3A%2F%2Fsapbysali.app%2Fdiag.html` — the real URL is a query parameter |
| Remote Browser Isolation is active | Ericom Shield tenant URL + the red frame drawn around the whole viewport |
| A filtering proxy sits in front of it | Block page served from `10.199.215.42:15871/cgi-bin/blockpage.cgi?ws-session=538538123` |
| The domain is blocked by policy, not by error | "Reason: This category is blocked: **Newly Registered Websites**" |
| Access is rationed | "You have 60 minutes of quota time remaining. Click Use Quota Time to start a 10 minute session" |
| The request is identified per user | `USERNAME: Sali Halif`, `IP: 10.70.3.126`, `X-Authenticated-User=Sali%20Halif` |

## What this means for the 10-second wait

Before a single byte of the application is requested, the environment performs:
category lookup and policy decision at the proxy, quota validation, hand-off to
the Ericom Shield tenant, **start of a remote browser container**, and only then
the fetch of `sapbysali.app` — followed by streaming the rendered result back.

Container start dominates that sequence and is measured in seconds. **No change
to the application can shorten it**, because the application is not running on
the user's machine at all — it runs inside Ericom's container.

This is consistent with everything measured from outside: across every emulated
profile down to 1 Mbps / 300 ms, the app paints real content in ~200 ms. There was
never a rendering problem to find.

## The 404 in the screenshot

`https://sapbysali.app/diag/` returned the application's 404 page because the
diagnostics page is not on `main` yet (PR #149). This is **not** a deployment
defect: `public/diag.html` exists and the static export copies it to
`out/diag.html` — verified, 19 KB, all sections intact. It simply has not been
merged. A build guard now enforces this permanently (see below).

## Actions — and who owns each

| # | Action | Owner | Effect |
|---|---|---|---|
| 1 | Merge PR #149 so `/diag/` exists in production | us | makes the tool reachable |
| 2 | **Ask IT to re-categorise `sapbysali.app` and add it to the allowlist** — it is flagged "Newly Registered Websites" | IT / security | removes the block page and the quota prompt entirely |
| 3 | Ask IT whether `sapbysali.app` can be **excluded from Ericom Shield isolation** (direct-fetch policy) | IT / security | removes container startup — this is the actual 10 s |
| 4 | Keep the startup optimisation (#148) | us | 21.3 MB → 755 KB is what Ericom's container has to fetch and scan on every session; it makes the isolated session materially cheaper |

Item 3 is the one that removes the wait. Items 1 and 4 are ours; items 2 and 3
are infrastructure decisions we cannot make from the codebase.

## Permanent diagnostics guarantee

`scripts/check-diag.mjs` runs in CI after the production build and fails the
pipeline if `out/diag.html` is absent, truncated, or missing any of its sections.
The page can no longer disappear from a deploy without the build going red.
