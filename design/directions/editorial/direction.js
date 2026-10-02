/* D1 · Editorial Technology — the margin footnote.
   Hover or focus on a SAP code shows a footnote built ONLY from text already in
   the DOM beside it (the row's own description / status cell). Nothing is
   fetched, nothing is invented. Vanilla, no dependencies. */
(function () {
  "use strict";
  var root = document.querySelector(".nx-app");
  if (!root || root.querySelector(".ed-fn")) return;

  var CODE = ".nw-sap, .nx-sap, .nh-sap, .nxd-id > b, .nu-chip.is-sap, .fm-code, .nr-sec-n, .ne-node-n";
  var HOSTSEL = ".nxd-row, .nw-row, .nw-rankrow, .fm-node, .nw-idx-i, .ne-node, .nw-fig, .nw-id";
  // where the footnote's text lives, per host row: [host selector, description, mark]
  var HOSTS = [
    [".ne-node", ".ne-node-he", ".ne-node-k, .ne-node-fk"],
    [".nw-id", ".nw-en", null],
    [".nxd-row", ".nxd-he", ".nxd-s4-t"],
    [".nw-row", ".nw-c-he", ".nw-c-s4"],
    [".nw-rankrow", ".nw-rank-t", ".nw-rank-n"],
    [".fm-node", ".fm-label", ".fm-note"],
    [".nw-move", ".nw-move-he", ".nw-move-w"],
    [".nh-mod-nums > div", "dt", null],
    [".nw-fig", "span, em", null],
    [".nw-idx-i", ".nw-idx-t", ".nw-idx-c"],
    [".nr-sec-h", ".nr-sec-t", ".nr-sec-meta"],
    [".nh-imp li", ".nh-imp-l", null],
  ];

  var fn = document.createElement("aside");
  fn.className = "ed-fn";
  fn.setAttribute("role", "status");
  fn.setAttribute("aria-live", "polite");
  fn.hidden = true;
  root.appendChild(fn);

  var current = null, hideT = 0;

  function text(el) { return el ? (el.textContent || "").replace(/\s+/g, " ").trim() : ""; }

  function build(code) {
    var codeText = text(code);
    if (!codeText) return null;
    for (var i = 0; i < HOSTS.length; i++) {
      var host = code.closest(HOSTS[i][0]);
      if (!host) continue;
      var desc = "", mark = "";
      var d = host.querySelectorAll(HOSTS[i][1]);
      for (var j = 0; j < d.length; j++) { var t = text(d[j]); if (t && t !== codeText && desc.indexOf(t) < 0) desc += (desc ? " " : "") + t; }
      if (HOSTS[i][2]) { var m = host.querySelector(HOSTS[i][2]); mark = text(m); }
      if (!desc && !mark) return null;
      return { code: codeText, desc: desc.slice(0, 180), mark: mark.slice(0, 120) };
    }
    var blk = code.closest("li, td, p, dd, dt, h1, h2, h3, a, button, span");
    var near = blk && blk !== code ? text(blk).replace(codeText, "").replace(/\s+/g, " ").trim() : "";
    if (!near) return null;
    return { code: codeText, desc: near.slice(0, 180), mark: "" };
  }

  function place(el) {
    var r = el.getBoundingClientRect();
    var w = fn.offsetWidth || 256, h = fn.offsetHeight || 80;
    var rtl = (document.documentElement.dir || "rtl") !== "ltr";
    // the margin is the inline end: left in RTL, right in LTR
    var x = rtl ? r.left - w - 16 : r.right + 16;
    var y = r.top;
    if (x < 8 || x + w > window.innerWidth - 8) { // no margin room: sit under the code
      x = rtl ? Math.min(r.right - w, window.innerWidth - w - 8) : Math.max(r.left, 8);
      if (x < 8) x = 8;
      y = r.bottom + 8;
    }
    if (y + h > window.innerHeight - 8) y = Math.max(8, window.innerHeight - h - 8);
    fn.style.left = x + "px";
    fn.style.top = y + "px";
  }

  function show(code) {
    var data = build(code);
    if (!data) return hide();
    clearTimeout(hideT);
    current = code;
    fn.innerHTML = "";
    var c = document.createElement("b"); c.className = "ed-fn-code"; c.textContent = data.code; fn.appendChild(c);
    if (data.desc) { var p = document.createElement("span"); p.textContent = data.desc; fn.appendChild(p); }
    if (data.mark) { var m = document.createElement("span"); m.className = "ed-fn-mark"; m.textContent = data.mark; fn.appendChild(m); }
    fn.hidden = false;
    place(code);
    fn.dataset.on = "1";
  }

  function hide() {
    current = null;
    fn.dataset.on = "0";
    clearTimeout(hideT);
    hideT = setTimeout(function () { if (!current) fn.hidden = true; }, 180);
  }

  root.addEventListener("mouseover", function (e) {
    var code = e.target.closest && e.target.closest(CODE);
    if (code) { if (code !== current) show(code); return; }
    if (current && !(e.target.closest && e.target.closest(".ed-fn"))) hide();
  });
  root.addEventListener("mouseleave", hide);

  // keyboard: a focused control that contains or is a code reaches its footnote
  root.addEventListener("focusin", function (e) {
    var t = e.target;
    var code = (t.matches && t.matches(CODE)) ? t : (t.querySelector ? t.querySelector(CODE) : null);
    if (!code) { var host = t.closest && t.closest(HOSTSEL); code = host && (host.querySelector(".ne-node-n, .nxd-id > b") || host.querySelector(CODE)); }
    if (code) show(code); else hide();
  });
  root.addEventListener("focusout", function () { setTimeout(function () { if (!root.contains(document.activeElement) || !document.activeElement.closest(CODE + ", " + HOSTSEL)) hide(); }, 0); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") hide(); });

  // ERD: the title's rule takes the focused table's own module hue (read from its node, never guessed)
  function erdRule() {
    var bar = root.querySelector(".ne-bar-t"), node = root.querySelector(".ne-node[data-lvl='0']");
    if (!bar) return;
    var ms = node ? getComputedStyle(node).getPropertyValue("--ms").trim() : "";
    if (ms) bar.style.setProperty("--ms", ms); else bar.style.removeProperty("--ms");
  }
  if (root.querySelector(".ne")) { setTimeout(erdRule, 300); setTimeout(erdRule, 1500); root.addEventListener("click", function () { setTimeout(erdRule, 600); }); }
  window.addEventListener("scroll", function () { if (current) place(current); }, { passive: true });
  window.addEventListener("resize", function () { if (current) place(current); });
})();
