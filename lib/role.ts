"use client";

import { useSyncExternalStore } from "react";
import type { RoleId } from "@/data/onboarding";

const ROLE_KEY = "neo:role";
const ONB_KEY = "neo:onboarded";
let role: RoleId = "new";
const subs = new Set<() => void>();
function emit() { subs.forEach((f) => f()); }

function read(): RoleId { try { return (localStorage.getItem(ROLE_KEY) as RoleId) || "new"; } catch { return "new"; } }
if (typeof window !== "undefined") role = read();

export function setRole(r: RoleId) { role = r; try { localStorage.setItem(ROLE_KEY, r); } catch { /* noop */ } emit(); }
export function useRole(): RoleId {
  return useSyncExternalStore(
    (cb) => { subs.add(cb); return () => subs.delete(cb); },
    () => role,
    () => "new",
  );
}
export function hasOnboarded(): boolean { try { return localStorage.getItem(ONB_KEY) === "1"; } catch { return true; } }
export function markOnboarded() { try { localStorage.setItem(ONB_KEY, "1"); } catch { /* noop */ } }
