import type { DiagramView } from "./erd-spatial-diagram";
import type { ErdCatalog } from "./erd-types";

export const isSpatialAnalysis = (mode: DiagramView["analysis"]) => mode === "impact" || mode === "lineage" || mode === "dep";

export function returnSpatialSelection(current: DiagramView, previous: DiagramView | null): DiagramView {
  const destination = previous ?? {...current,analysis:isSpatialAnalysis(current.analysis) ? current.analysis : "map",step:null};
  return {...current,module:destination.module,group:destination.group??null,analysis:destination.analysis??"map",step:destination.step??null,crossModule:destination.crossModule??false,selected:null,expanded:false,focus:false,links:true};
}

// A repeated click is a return action. Keeping the camera's reading context
// separate from its selected anchor lets analysis work before or after a pick.
export function selectSpatialTable(data: ErdCatalog, current: DiagramView, previous: DiagramView | null, name: string, visible: ReadonlySet<string>) {
  if (!data.tables.some((t) => t.n === name)) return null;
  if (current.selected === name) return {view:returnSpatialSelection(current,previous),previous:null,detailsOpen:false};
  const analyzing = isSpatialAnalysis(current.analysis);
  const view: DiagramView = {...current,selected:name,expanded:!analyzing,focus:false,links:true};
  if (!analyzing) { view.analysis="map"; view.step=null; }
  if ((!current.module || !data.modules.find((m) => m.code === current.module)?.core.includes(name)) && !(analyzing && current.crossModule)) {
    view.module=data.modules.find((m) => m.core.includes(name))?.code??null;
    view.group=null;
  } else if (current.group && !visible.has(name)) view.group=null;
  return {view,previous:current.selected ? previous : current,detailsOpen:!analyzing};
}
