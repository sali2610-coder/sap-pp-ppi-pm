"use client";

import dynamic from "next/dynamic";
import { useState, useSyncExternalStore } from "react";
import { Box } from "lucide-react";
import { useReturnPacket } from "../nav-context";
import type { ErdCatalog, ModCode } from "./erd-types";
import "./erd-spatial.css";

const Classic = dynamic(() => import("./erd-workspace").then((m) => m.ErdWorkspace));
const Spatial = dynamic(() => import("./erd-spatial").then((m) => m.ErdSpatial), {
  ssr: false,
  loading: () => <div className="e3-loading" role="status">מכין את מפת הנתונים…</div>,
});

const subscribeHash = (notify: () => void) => {
  window.addEventListener("hashchange", notify);
  return () => window.removeEventListener("hashchange", notify);
};
const readHash = () => window.location.hash;
const serverHash = () => "";

export function ErdExperience({ data }: { data: ErdCatalog }) {
  const [spatial, setSpatial] = useState(true);
  const [module, setModule] = useState<ModCode | null>(() => data.modules.some((m) => m.code === "PP-PI") ? "PP-PI" : data.modules[0]?.code ?? null);
  const packet = useReturnPacket("neo:erd");
  const hash = useSyncExternalStore(subscribeHash, readHash, serverHash);
  const context = `${packet?.at ?? ""}:${hash}`;
  const [seenContext, setSeenContext] = useState(":");
  // Existing object links and saved return journeys are owned by the current
  // workspace. Keep its selection, filters and camera restoration intact.
  if (context !== seenContext) {
    setSeenContext(context);
    if (packet || hash) setSpatial(false);
  }
  return spatial ? <Spatial data={data} initialModule={module} onModuleChange={setModule} onClassic={() => setSpatial(false)} /> : (
    <div className="e3-classic">
      <button className="e3-classic-switch" onClick={() => setSpatial(true)}><Box size={18} /> תצוגת 3D</button>
      <Classic data={data} initialModule={module} onModuleChange={setModule} />
    </div>
  );
}
