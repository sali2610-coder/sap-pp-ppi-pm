/**
 * Removes credentials the old chat page left in the browser.
 *
 * The Gemini-era chat asked the user to paste an API key into a sidebar field
 * and stored it under `neo:gemini-key` in localStorage. That code is deleted,
 * but deleting it does nothing for a browser that already holds a key: the
 * value simply stays there, readable by any script on the origin, until the
 * user clears site data by hand.
 *
 * So the key is actively removed on boot. This runs once per page load, costs a
 * single localStorage probe, and is deliberately kept as a standalone module —
 * a purge that lives inside a feature is a purge that disappears when the
 * feature is refactored.
 *
 * Safe to delete once enough time has passed that no active browser can still
 * be holding one. Until then it is the only thing that clears them.
 */

/** Keys the product no longer writes and must not keep. */
const LEGACY_KEYS = [
  "neo:gemini-key",     // provider credential — the reason this file exists
  "neo:gemini-model",   // written alongside it by the same page
];

export function purgeLegacyStorage(): void {
  if (typeof window === "undefined") return;
  try {
    for (const k of LEGACY_KEYS) {
      if (window.localStorage.getItem(k) !== null) window.localStorage.removeItem(k);
    }
  } catch {
    // Private mode, disabled storage, or a quota error. Nothing to recover:
    // if storage cannot be read it cannot be holding a key we wrote either.
  }
}
