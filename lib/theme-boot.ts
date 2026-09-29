/**
 * The pre-paint theme script, kept in its own module with NO "use client".
 *
 * app/layout.tsx is a Server Component. Importing this string from the client
 * module next door yields a client reference rather than the literal, so the
 * script silently rendered empty and the theme only applied after hydration —
 * a visible flash from light to dark on every navigation.
 */
import { FACES, SIZES, TYPE_KEY } from "@/components/neo-shell/dock/typography";

export const THEME_KEY = "neo:theme";

// The reader's font and size, on NEO pages, before the first paint (gate 10,
// M6). Applied after mount only, a "גדול מאוד" choice drew every full load at
// the normal size first and then jumped. The same size variable and face
// attribute applyType() writes; the tables come from typography.ts, so the two
// cannot drift.
const SCALE = Object.fromEntries(SIZES.map((s) => [s.id, s.scale]));
const FACE_IDS = FACES.map((f) => f.id).filter((id) => id !== "system");

export const THEME_BOOT =
  `(function(){try{` +
  `var t=localStorage.getItem("${THEME_KEY}")||"system";` +
  `var d=t==="dark"||(t==="system"&&matchMedia("(prefers-color-scheme: dark)").matches);` +
  `document.documentElement.setAttribute("data-theme",d?"dark":"light");` +
  `}catch(e){}` +
  `try{var q=location.pathname;if(q==="/neo"||q.indexOf("/neo/")===0){` +
  `var p=JSON.parse(localStorage.getItem("${TYPE_KEY}")||"null")||{},r=document.documentElement.style;` +
  `var s=${JSON.stringify(SCALE)}[p.size];` +
  `if(s&&s!==1)r.setProperty("--nx-type-scale",String(s));` +
  `if(${JSON.stringify(FACE_IDS)}.indexOf(p.face)>=0)document.documentElement.setAttribute("data-neo-face",p.face);` +
  `}}catch(e){}})();`;
