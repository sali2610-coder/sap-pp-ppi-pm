/**
 * Device-class detection — desktop-first.
 *
 * WHY THIS EXISTS
 * The shell used to switch on CSS width alone (`xl:` = 1280px). That is wrong for
 * large displays: CSS pixels are not physical size. A conference display or TV
 * running at 150–200% OS scaling, or a browser zoomed in for readability at
 * viewing distance, reports a *logical* width well under 1280 — so an 85" screen
 * was served the tablet shell. Measured on the built site: the shell flipped at
 * exactly 1279px.
 *
 * RULE: the device decides the shell, the width only decides spacing.
 *   - Any desktop OS (Windows / macOS / Linux / ChromeOS) → ALWAYS desktop,
 *     at any resolution, zoom level or monitor size. Covers laptops, ultrawides,
 *     4K/5K, conference displays, projectors and TVs driven by a PC.
 *   - Real tablets (iPad, Android tablet) → tablet.
 *   - Phones → phone.
 *
 * Signals are combined rather than trusted individually: UA-CH when present,
 * classic UA string, pointer/hover capability and maxTouchPoints. Touch on a
 * laptop must never demote it, and iPadOS deliberately reports a Mac UA — so
 * platform alone is not enough either.
 */

export type DeviceClass = "desktop" | "tablet" | "phone";

/** Serialized as a string so the same logic can run in an inline pre-paint script. */
export const DEVICE_DETECT_SOURCE = `(function(){
  try {
    var n = navigator, ua = n.userAgent || "", uaLC = ua.toLowerCase();
    var uad = n.userAgentData || null;
    var platform = (uad && uad.platform) || n.platform || "";
    var platLC = String(platform).toLowerCase();
    var touch = (n.maxTouchPoints || 0) > 1;
    var mm = function (q) { try { return window.matchMedia(q).matches; } catch (e) { return false; } };
    var coarse = mm("(pointer: coarse)");
    var fineAny = mm("(any-pointer: fine)");
    var hoverAny = mm("(any-hover: hover)");

    // 1) Explicit mobile signal from UA-CH is authoritative for phones only.
    var uaMobile = uad && typeof uad.mobile === "boolean" ? uad.mobile : null;

    // 2) OS families from the UA string.
    var isAndroid = /android/.test(uaLC);
    var isIPhone  = /iphone|ipod/.test(uaLC);
    var isIPad    = /ipad/.test(uaLC) ||
                    // iPadOS 13+ masquerades as desktop Safari: Mac UA + real touch.
                    (/macintosh/.test(uaLC) && touch);
    var isDesktopOS = /windows|win32|win64/.test(uaLC + " " + platLC) ||
                      /cros|chromeos/.test(uaLC + " " + platLC) ||
                      /linux/.test(platLC) && !isAndroid ||
                      /x11/.test(uaLC) && !isAndroid ||
                      (/macintosh|mac os x/.test(uaLC) && !isIPad);

    var cls;
    if (isIPhone) cls = "phone";
    else if (isIPad) cls = "tablet";
    else if (isAndroid) cls = /mobile/.test(uaLC) ? "phone" : "tablet";
    else if (isDesktopOS) cls = "desktop";           // never demoted by size or zoom
    else if (uaMobile === true) cls = "phone";
    // Unknown platform: fall back to capabilities, still desktop-leaning.
    else if (coarse && !hoverAny && !fineAny) cls = "tablet";
    else cls = "desktop";

    return cls;
  } catch (e) { return "desktop"; }
})()`;

/**
 * Reads the class the pre-paint script already put on <html>.
 * This is the ONLY runtime accessor — detection itself runs once, in the inline
 * script, so there is a single source of truth and no second implementation to
 * drift out of sync. Returns "desktop" during SSR (desktop-first).
 */
export function currentDeviceClass(): DeviceClass {
  if (typeof document === "undefined") return "desktop";
  const v = document.documentElement.dataset.device;
  return v === "phone" || v === "tablet" ? v : "desktop";
}
