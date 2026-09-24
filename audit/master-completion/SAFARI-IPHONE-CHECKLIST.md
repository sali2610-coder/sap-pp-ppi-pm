# iPhone / Safari manual gate (external)

Every phone measurement in this repository is Chrome emulation (an iPhone user agent,
390×844 or 320×568 CSS px, touch, light and dark, reduced motion). Chrome with an iPhone
user agent is not Safari: WebKit differs in scroll-driven animation support (the reader and
the S/4 scenes fall back to IntersectionObserver), `100dvh` behaviour with the URL bar,
`env(safe-area-inset-*)`, `backdrop-filter`, and momentum scrolling inside nested
scrollers. This gate stays `MANUAL_LIVE_TEST_REQUIRED` until someone runs it on a device.

Estimated time: 20 minutes on one iPhone (Safari, light, then dark in Settings).

| # | Route | Check | Pass when |
|---|---|---|---|
| 1 | `/neo/` | Open cold, portrait | no horizontal scroll, the four first-screen actions visible, no text at opacity < 1 after a swipe |
| 2 | `/neo/` | Rotate to landscape and back | layout reflows, the rail stays hidden until the edge tap, no overlap with the dock |
| 3 | `/neo/pm/` | Scroll through the table section | the sticky search/filter strip stays on screen, chips readable, no clipped SAP codes |
| 4 | `/neo/tables/AFKO/` | Open, scroll to fields | the status pill matches the list page, the fields table scrolls inside itself, nothing bleeds off-screen |
| 5 | `/neo/bapi/BAPI_ALM_CONF_CREATE/` | Copy the id with the copy button | the id lands in the clipboard (paste in Notes); the technical name is on its own LTR line |
| 6 | `/neo/erd/` | Open, tap a module, tap a table | the overview is a list, "הצגת המפה המלאה" draws the map, the selected card refits (no pinch needed), Esc/back returns |
| 7 | `/neo/studio/` | Open, use fit-to-screen | nodes are legible (label ≥ 11 px), no pinch needed to read a card |
| 8 | `/neo/read/book2/` | Read two screens, change font size, toggle focus mode | text reflows, the bottom bar never covers the focused control, progress is kept after reload |
| 9 | `/library/book2/` | Open from `/neo/books/` and come back with the NEO pill | the pill "Project NEO" is visible in the legacy header and returns to `/neo/`; the reader itself unchanged |
| 10 | `/neo/chat/` | Type a question, do not send | the composer stays above the keyboard, the page does not jump; if a key is configured, send one question and note the latency |
| 11 | `/neo/incidents/COGI/` | Scroll the diagnosis steps | steps readable, warnings before data-changing actions visible |
| 12 | Any page | Settings → Accessibility → Larger Text (2 steps up) | no clipped headings, no overlapping chips |
| 13 | Any page | Settings → Accessibility → Reduce Motion | content is fully present on load, no frozen fades |
| 14 | Any page | Dark appearance | pills, chips and code blocks keep contrast; no white-on-white in the evidence block |
| 15 | `sapbysali.app/` | Cold open of the domain | 307 to `/neo/`, first paint under 3 s on LTE |

Record the result as `audit/master-completion/safari-iphone-result.md` with the device, iOS
version, date, and a photo or screen recording for any failure. Until then the row stays
`MANUAL_LIVE_TEST_REQUIRED` in the Astra matrix (SCOPE-2, S10-2, S10-5).
