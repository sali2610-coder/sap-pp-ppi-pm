"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Box } from "lucide-react";
import type { ErdCatalog } from "./erd-types";
import "./erd-spatial.css";

const Classic = dynamic(() => import("./erd-workspace").then((m) => m.ErdWorkspace));
const Spatial = dynamic(() => import("./erd-spatial").then((m) => m.ErdSpatial), {
  ssr: false,
  loading: () => <div className="e3-loading" role="status">מכין את מפת הנתונים…</div>,
});

export function ErdExperience({ data }: { data: ErdCatalog }) {
  const [spatial, setSpatial] = useState(true);
  return spatial ? <Spatial data={data} onClassic={() => setSpatial(false)} /> : (
    <div className="e3-classic">
      <button className="e3-classic-switch" onClick={() => setSpatial(true)}><Box size={18} /> תצוגת 3D</button>
      <Classic data={data} />
    </div>
  );
}
