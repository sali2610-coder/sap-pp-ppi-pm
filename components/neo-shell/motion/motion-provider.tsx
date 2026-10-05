"use client";

/* ============================================================================
   PROJECT NEO · MOTION PROVIDER
   ----------------------------------------------------------------------------
   WHAT THIS DELIBERATELY DOES NOT DO

     It does not animate anything. Every reveal, parallax, pin and kinetic line
     in this product is a CSS scroll-driven animation running on the compositor,
     which is the entire reason NEO can carry ORYZO's choreography without
     ORYZO's 1,595ms main-thread block. Putting a scroll listener here would
     hand all of that back.

     This component publishes motion choices and observes visibility, with no
     frame loop. It also handles three route-specific jobs:

       1. Publish the surface's motion LEVEL onto the shell, so the CSS
          amplitudes resolve. One attribute write per route change.
       2. Provide the Safari fallback. Where scroll-driven animation is
          unavailable, an IntersectionObserver flips `.is-in` once per element
          and CSS transitions take it from there. The observer is only
          constructed when the feature is actually missing.
       3. Track which SCENE the reader is in, so the shell padding around a
          scene can match its ground instead of framing it in the wrong colour.

   WHY THE OBSERVER ROOT IS .nx-canvas

     The NEO shell is 100dvh with overflow hidden; the element that actually
     scrolls is .nx-canvas. An IntersectionObserver with the default root
     watches the viewport, which for this shell never scrolls, so every element
     would report as permanently intersecting and the fallback would reveal the
     whole page at once. The root has to be the real scroller.

   WHY IT NEVER HIDES CONTENT IT CANNOT REVEAL

     The fallback CSS only hides an element once `[data-nm="on"]` is present on
     the shell, and that attribute is written by this component after mount. If
     the bundle fails, the observer throws, or JS is off entirely, nothing is
     hidden and the page reads normally. Content is never gated on an effect.
   ========================================================================== */

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { motionLevel } from "./level";
import { useMotionPreference, useMotionReduced } from "./preferences";

/** Elements the fallback path is responsible for revealing. */
const SEL = ".nm-rise, .nm-fade, .nm-grow, .nm-kin";

const supportsTimeline = () =>
  typeof CSS !== "undefined" &&
  typeof CSS.supports === "function" &&
  CSS.supports("animation-timeline", "view()");

export function MotionProvider() {
  const path = usePathname() || "/neo";
  const reduced = useMotionReduced();
  const preference = useMotionPreference();

  useEffect(() => {
    const app = document.querySelector<HTMLElement>(".nx-app");
    if (!app) return;
    // The root also covers the ERD's full-screen portal outside the shell.
    // CSS keeps OS reduction unless the reader explicitly chooses full motion.
    document.documentElement.dataset.neoMotion = preference;
    app.dataset.motionReduced = reduced ? "1" : "0";
    if (reduced) {
      // CSS is settled by motion.css. Finish only imperative animations, so a
      // book's closing callback still completes when motion is turned off.
      for (const animation of app.getAnimations({ subtree: true })) {
        if (typeof CSSAnimation !== "undefined" && animation instanceof CSSAnimation) continue;
        if (typeof CSSTransition !== "undefined" && animation instanceof CSSTransition) continue;
        try { animation.finish(); } catch { animation.cancel(); }
      }
    }
    return () => {
      delete app.dataset.motionReduced;
      delete document.documentElement.dataset.neoMotion;
    };
  }, [path, reduced, preference]);

  useEffect(() => {
    const app = document.querySelector<HTMLElement>(".nx-app");
    if (!app) return;
    const sync = () => { app.dataset.motionPaused = document.hidden ? "1" : "0"; };
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => {
      document.removeEventListener("visibilitychange", sync);
      delete app.dataset.motionPaused;
    };
  }, []);

  useEffect(() => {
    const app = document.querySelector<HTMLElement>(".nx-app");
    const canvas = app?.querySelector<HTMLElement>(".nx-canvas");
    if (!app || !canvas) return;
    const selector = ".no-orbit, .nol, .nxq-hero-mark, .nxq-avatar, .nxq-live";
    const watched = new Set<Element>();
    let observer: IntersectionObserver | null = null;
    let mutations: MutationObserver | null = null;
    try {
      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) entry.target.setAttribute("data-motion-visible", entry.isIntersecting ? "1" : "0");
      }, { root: canvas, threshold: 0 });
      const watch = (node: Element) => {
        const elements = [...node.querySelectorAll(selector)];
        if (node.matches(selector)) elements.push(node);
        for (const element of elements) {
          if (watched.has(element)) continue;
          watched.add(element);
          observer?.observe(element);
        }
      };
      watch(canvas);
      mutations = new MutationObserver((records) => {
        for (const record of records) for (const node of record.addedNodes) {
          if (node instanceof Element) watch(node);
        }
      });
      mutations.observe(canvas, { childList: true, subtree: true });
    } catch { /* decoration stays visible if the observer is unavailable */ }
    return () => {
      observer?.disconnect(); mutations?.disconnect();
      for (const element of watched) element.removeAttribute("data-motion-visible");
    };
  }, [path]);

  /* --- 1. level ---------------------------------------------------------- */
  useEffect(() => {
    const app = document.querySelector<HTMLElement>(".nx-app");
    if (!app) return;
    app.dataset.motion = String(motionLevel(path));
    return () => { delete app.dataset.motion; };
  }, [path]);

  /* --- 2. reveal fallback, only where the platform needs one -------------- */
  useEffect(() => {
    const app = document.querySelector<HTMLElement>(".nx-app");
    if (!app) return;

    // Marking the shell live is what ARMS the hiding rules in motion.css. Doing
    // it here rather than in markup is the guarantee that content is only ever
    // hidden by code that is definitely running and able to reveal it again.
    app.dataset.nm = "on";

    if (supportsTimeline()) return () => { delete app.dataset.nm; };

    const scroller = app.querySelector<HTMLElement>(".nx-canvas");
    let io: IntersectionObserver | null = null;
    let mo: MutationObserver | null = null;

    try {
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (!e.isIntersecting) continue;
            e.target.classList.add("is-in");
            io?.unobserve(e.target);   // a reveal is a one-way door
          }
        },
        // A small negative bottom margin means an element commits just after it
        // has genuinely entered, rather than while it is still a sliver.
        { root: scroller ?? null, rootMargin: "0px 0px -8% 0px", threshold: 0.01 },
      );

      const watch = (root: ParentNode) =>
        root.querySelectorAll?.(SEL).forEach((el) => io?.observe(el));

      watch(document);

      // Routes here render client-side, so the elements to reveal frequently do
      // not exist yet when this effect runs. Watching for them is cheaper and
      // far more reliable than guessing a timeout.
      mo = new MutationObserver((muts) => {
        for (const m of muts) {
          for (const n of m.addedNodes) {
            if (!(n instanceof Element)) continue;
            if (n.matches?.(SEL)) io?.observe(n);
            watch(n);
          }
        }
      });
      mo.observe(document.body, { childList: true, subtree: true });
    } catch {
      // No observer means no reveal mechanism, so the hiding rules must be
      // disarmed or the page would stay blank. Failing open is the only safe
      // direction for a component whose job is decoration.
      delete app.dataset.nm;
    }

    return () => {
      io?.disconnect();
      mo?.disconnect();
      delete app.dataset.nm;
    };
  }, [path]);

  /* --- 3. scene tracking -------------------------------------------------- */
  useEffect(() => {
    const app = document.querySelector<HTMLElement>(".nx-app");
    const scroller = app?.querySelector<HTMLElement>(".nx-canvas");
    if (!app || !scroller) return;

    const scenes = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"));
    if (scenes.length === 0) return;

    let activeScene: HTMLElement | null = null;
    const syncGround = () => {
      if (!activeScene) return;
      app.dataset.sceneNow = activeScene.dataset.scene || "base";
      app.style.setProperty(
        "--nm-shell-ground",
        getComputedStyle(activeScene).getPropertyValue("--scene-ground").trim() || "",
      );
    };
    // Changing the theme does not cross an intersection threshold. Re-read
    // the active scene's colour so the outer canvas changes with its cards.
    const themeChanges = new MutationObserver(syncGround);
    themeChanges.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    let io: IntersectionObserver | null = null;
    try {
      io = new IntersectionObserver(
        (entries) => {
          // The scene that owns the MIDDLE of the screen is the scene the
          // reader is in. Picking by "most visible" makes the ground flicker
          // between two neighbours at the seam; picking by the centre line is
          // stable because only one element can hold it.
          for (const e of entries) {
            if (!e.isIntersecting) continue;
            activeScene = e.target as HTMLElement;
            syncGround();
          }
        },
        { root: scroller, rootMargin: "-50% 0px -50% 0px", threshold: 0 },
      );
      scenes.forEach((s) => io?.observe(s));
    } catch { /* the ground simply stays at its default */ }

    return () => {
      io?.disconnect();
      themeChanges.disconnect();
      delete app.dataset.sceneNow;
      app.style.removeProperty("--nm-shell-ground");
    };
  }, [path]);

  return null;
}
