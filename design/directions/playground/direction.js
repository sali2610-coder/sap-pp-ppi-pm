/* D3 · Playground · vanilla, no fetches. Two toys:
   1. the catalogue mini-record: built only from the row's own cells, shown on
      hover / focus, hidden on leave / blur / Escape (one element, reused).
   2. the reader's progress ring: drawn from the percentage already on the page. */
(function () {
  "use strict";
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---- 1. mini-record ---------------------------------------------------- */
  var list = document.querySelector(".nxd-list");
  if (list) {
    var mini = document.createElement("div");
    mini.className = "d3-mini";
    mini.setAttribute("aria-hidden", "true");
    var host = null;
    function text(el, sel) { var n = el.querySelector(sel); return n ? n.textContent.replace(/\s+/g, " ").trim() : ""; }
    function build(row) {
      var code = text(row, ".nxd-id > b");
      var mods = Array.prototype.map.call(row.querySelectorAll(".nxd-mod"), function (c) {
        return Array.prototype.map.call(c.childNodes, function (n) { return (n.textContent || "").trim(); }).filter(Boolean).join(" ");
      });
      var he = text(row, ".nxd-he");
      var sub = text(row, ".nxd-sub");
      var nums = Array.prototype.map.call(row.querySelectorAll(".nxd-nums .nu-chip"), function (c) { return c.textContent.replace(/\s+/g, " ").trim(); });
      var st = text(row, ".nxd-s4 .nu-status");
      var s4 = text(row, ".nxd-s4-t");
      var h = "";
      h += '<span class="d3-mini-code"></span>';
      h += '<div class="d3-mini-row"><b class="d3-he"></b><span class="d3-sub"></span></div>';
      h += '<div class="d3-mini-row d3-mods"></div>';
      h += '<div class="d3-mini-row d3-nums"></div>';
      h += '<div class="d3-mini-s4"><i></i><b class="d3-st"></b><span class="d3-s4"></span></div>';
      mini.innerHTML = h;
      mini.querySelector(".d3-mini-code").textContent = code;
      mini.querySelector(".d3-he").textContent = he;
      mini.querySelector(".d3-sub").textContent = sub;
      var modsEl = mini.querySelector(".d3-mods");
      mods.forEach(function (m) { var s = document.createElement("span"); s.textContent = m; modsEl.appendChild(s); });
      var numsEl = mini.querySelector(".d3-nums");
      nums.forEach(function (n) { var s = document.createElement("span"); s.textContent = n; numsEl.appendChild(s); });
      mini.querySelector(".d3-st").textContent = st;
      mini.querySelector(".d3-s4").textContent = s4;
      if (!s4 && !st) mini.querySelector(".d3-mini-s4").remove();
    }
    function show(row) {
      var item = row.closest(".nxd-item");
      if (!item || host === item) return;
      hide();
      build(row);
      item.appendChild(mini);
      host = item;
      requestAnimationFrame(function () { mini.dataset.show = "1"; });
    }
    function hide() {
      if (!host) return;
      mini.dataset.show = "0";
      mini.remove();
      host = null;
    }
    if (fine) {
      list.addEventListener("mouseover", function (e) { var r = e.target.closest(".nxd-row"); if (r) show(r); });
      list.addEventListener("mouseleave", hide);
      list.addEventListener("mouseout", function (e) { var r = e.target.closest(".nxd-row"); if (r && !r.contains(e.relatedTarget)) hide(); });
    }
    list.addEventListener("focusin", function (e) { var r = e.target.closest(".nxd-row"); if (r) show(r); });
    list.addEventListener("focusout", function (e) { if (!e.relatedTarget || !e.relatedTarget.closest(".nxd-row")) hide(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") hide(); });
  }

  /* ---- 1b. the chapter board opens by itself on a wide canvas (CD S1) ------- */
  var board = document.querySelector(".nw-idx-d");
  if (board && window.matchMedia("(min-width: 834px)").matches) board.open = true;

  /* ---- 2. reader progress ring -------------------------------------------- */
  var head = document.querySelector(".nr-rail-head");
  var pct = head && head.querySelector(".nr-rail-pct");
  if (pct && !head.querySelector(".d3-ring")) {
    var v = parseFloat((pct.textContent || "").replace(/[^\d.]/g, ""));
    if (!isNaN(v)) {
      var r = 32, c = 2 * Math.PI * r;
      var ns = "http://www.w3.org/2000/svg";
      var svg = document.createElementNS(ns, "svg");
      svg.setAttribute("class", "d3-ring");
      svg.setAttribute("viewBox", "0 0 72 72");
      svg.setAttribute("aria-hidden", "true");
      var bed = document.createElementNS(ns, "circle");
      bed.setAttribute("class", "d3-ring-bed"); bed.setAttribute("cx", "36"); bed.setAttribute("cy", "36"); bed.setAttribute("r", String(r));
      var val = document.createElementNS(ns, "circle");
      val.setAttribute("class", "d3-ring-v"); val.setAttribute("cx", "36"); val.setAttribute("cy", "36"); val.setAttribute("r", String(r));
      val.setAttribute("stroke-dasharray", c.toFixed(2));
      val.setAttribute("stroke-dashoffset", (c * (1 - Math.min(100, Math.max(0, v)) / 100)).toFixed(2));
      val.setAttribute("transform", "rotate(-90 36 36)");
      svg.appendChild(bed); svg.appendChild(val);
      head.insertBefore(svg, head.firstChild);
    }
  }
})();
