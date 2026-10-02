/* D2 · Enterprise Data Lab · overlay script (vanilla, no fetches, no timers)
   1. Inspector: hover/focus a catalogue row and its own cells are shown in one
      floating panel (list → record, 240 ms translate + opacity; CSS owns it).
   2. Query line: the active filters' existing text, stacked as one readout.
   Nothing here invents content: every node is a clone of the row's own cells. */
(function () {
  "use strict";
  var list = document.querySelector(".nxd-list");
  var tools = document.querySelector(".nxd-tools");
  if (!list || !tools) return;

  /* ---- 1. inspector -------------------------------------------------- */
  var insp = document.createElement("aside");
  insp.className = "dl-insp";
  insp.setAttribute("aria-live", "polite");
  insp.setAttribute("aria-label", "תצוגה מקדימה של הרשומה");
  document.querySelector(".nx-app").appendChild(insp);
  var current = null;

  function clone(row, sel) {
    var n = row.querySelector(sel);
    return n ? n.cloneNode(true) : null;
  }
  function show(row) {
    if (row === current) return;
    if (current) current.classList.remove("is-dl-sel");
    current = row;
    row.classList.add("is-dl-sel");
    insp.textContent = "";
    var k = document.createElement("div"); k.className = "dl-insp-k";
    var code = clone(row, ".nxd-id > b"); if (code) k.appendChild(code);
    row.querySelectorAll(".nxd-mod").forEach(function (c) { k.appendChild(c.cloneNode(true)); });
    insp.appendChild(k);
    var he = clone(row, ".nxd-he"); if (he) { var p = document.createElement("p"); p.className = "dl-insp-he"; p.append.apply(p, Array.from(he.childNodes)); insp.appendChild(p); }
    var sub = clone(row, ".nxd-sub"); if (sub) { var q = document.createElement("p"); q.className = "dl-insp-sub"; q.append.apply(q, Array.from(sub.childNodes)); insp.appendChild(q); }
    var nums = clone(row, ".nxd-nums"); if (nums) { nums.className = "dl-insp-nums"; insp.appendChild(nums); }
    var s4 = row.querySelector(".nxd-s4");
    if (s4) {
      var s = document.createElement("p"); s.className = "dl-insp-s4";
      var st = s4.querySelector(".nu-status"); if (st) s.appendChild(st.cloneNode(true));
      var t = s4.querySelector(".nxd-s4-t"); if (t) s.append.apply(s, Array.from(t.cloneNode(true).childNodes));
      insp.appendChild(s);
    }
    var h = document.createElement("p"); h.className = "dl-insp-hint";
    var kbd = document.createElement("kbd"); kbd.textContent = "Enter";
    h.append(kbd, " פותח את הרשומה");
    insp.appendChild(h);
    insp.dataset.on = "1";
  }
  function hide() {
    if (current) current.classList.remove("is-dl-sel");
    current = null;
    insp.dataset.on = "0";
  }
  list.addEventListener("mouseover", function (e) {
    var row = e.target.closest(".nxd-row"); if (row) show(row);
  });
  list.addEventListener("mouseleave", function () { if (!list.contains(document.activeElement)) hide(); });
  list.addEventListener("focusin", function (e) {
    var row = e.target.closest(".nxd-row"); if (row) show(row);
  });
  list.addEventListener("focusout", function (e) {
    if (!e.relatedTarget || !list.contains(e.relatedTarget)) hide();
  });

  /* ---- 2. query line ------------------------------------------------- */
  var line = document.createElement("p");
  line.className = "dl-query";
  line.setAttribute("aria-label", "השאילתה הפעילה");
  tools.insertAdjacentElement("afterend", line);

  function text(el) { return el ? el.textContent.replace(/\s+/g, " ").trim() : ""; }
  function build() {
    line.textContent = "";
    var parts = [];
    var tab = document.querySelector('.nxd-tabs .nu-tab[aria-selected="true"]');
    if (tab) parts.push(["תצוגה", text(tab)]);
    var q = document.querySelector(".nxd-field input");
    if (q && q.value.trim()) parts.push(["חיפוש", q.value.trim()]);
    document.querySelectorAll('.nxd-facets .nu-filter[aria-pressed="true"]').forEach(function (f) {
      var lab = text(f.closest(".nxd-facet") && f.closest(".nxd-facet").querySelector(".nxd-facet-l"));
      parts.push([lab || "מסנן", text(f)]);
    });
    var sort = document.querySelector(".nxd-sort select");
    if (sort && sort.selectedIndex >= 0) parts.push(["מיון", text(sort.options[sort.selectedIndex])]);
    var count = document.querySelector(".nxd-count b");
    parts.forEach(function (p, i) {
      if (i) { var sep = document.createElement("i"); sep.textContent = "AND"; line.appendChild(sep); }
      var k = document.createElement("i"); k.textContent = p[0] + " =";
      var v = document.createElement("b"); v.textContent = p[1];
      line.append(k, " ", v);
    });
    if (count) { var c = document.createElement("i"); c.textContent = "→"; var n = document.createElement("b"); n.textContent = text(count); line.append(c, " ", n); }
    line.hidden = parts.length === 0;
  }
  build();
  document.addEventListener("input", build, true);
  document.addEventListener("change", build, true);
  document.addEventListener("click", function () { requestAnimationFrame(build); }, true);
  new MutationObserver(function () { build(); }).observe(list, { childList: true });
})();
