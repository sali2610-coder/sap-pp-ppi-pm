/**
 * The pre-paint theme script, kept in its own module with NO "use client".
 *
 * app/layout.tsx is a Server Component. Importing this string from the client
 * module next door yields a client reference rather than the literal, so the
 * script silently rendered empty and the theme only applied after hydration —
 * a visible flash from light to dark on every navigation.
 */
export const THEME_KEY = "neo:theme";

export const THEME_BOOT =
  `(function(){try{` +
  `var t=localStorage.getItem("${THEME_KEY}")||"system";` +
  `var d=t==="dark"||(t==="system"&&matchMedia("(prefers-color-scheme: dark)").matches);` +
  `document.documentElement.setAttribute("data-theme",d?"dark":"light");` +
  `}catch(e){}})();`;
