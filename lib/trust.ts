// Trust Score + Source Traceability (Final Hardening #1, #2).
// GREEN = verified SAP object · YELLOW = domain knowledge · RED = needs SAP verification.
// Source: SAP Standard / S/4 Simplification / Domain Knowledge / הארגון Knowledge / Generated Mapping.

export type TrustLevel = "GREEN" | "YELLOW" | "RED";
export type SourceType = "SAP Standard" | "S/4 Simplification" | "Domain Knowledge" | "הארגון Knowledge" | "Generated Mapping";

export interface Trust { level: TrustLevel; source: SourceType }

export const TRUST_META: Record<TrustLevel, { he: string; color: string; bg: string }> = {
  GREEN: { he: "אובייקט SAP מאומת", color: "#16a34a", bg: "#dcfce7" },
  YELLOW: { he: "ידע תחום (לא bench-verified)", color: "#b45309", bg: "#fef3c7" },
  RED: { he: "נדרש אימות מול SAP", color: "#dc2626", bg: "#fee2e2" },
};
export const SOURCE_HE: Record<SourceType, string> = {
  "SAP Standard": "SAP סטנדרטי",
  "S/4 Simplification": "S/4 Simplification",
  "Domain Knowledge": "ידע תחום",
  "הארגון Knowledge": "ידע הארגון",
  "Generated Mapping": "מיפוי נגזר",
};

// table/tcode/cds = real SAP objects from the generated dataset/standard → GREEN/SAP Standard
export const trustTable = (): Trust => ({ level: "GREEN", source: "SAP Standard" });
export const trustTcode = (deprecatedOrObsolete: boolean): Trust => ({ level: "GREEN", source: deprecatedOrObsolete ? "S/4 Simplification" : "SAP Standard" });
export const trustCds = (): Trust => ({ level: "GREEN", source: "SAP Standard" });
// function: bench-verified curated → GREEN; inferred → RED
export const trustFunction = (inferred?: boolean): Trust => inferred ? { level: "RED", source: "Domain Knowledge" } : { level: "GREEN", source: "SAP Standard" };
// exit/BAdI: named but version-dependent → YELLOW; flagged inferred → RED
export const trustExit = (inferred?: boolean): Trust => inferred ? { level: "RED", source: "Domain Knowledge" } : { level: "YELLOW", source: "Domain Knowledge" };
// SAP Note: certain note number → GREEN; keyword-only → YELLOW
export const trustNote = (hasRef?: boolean): Trust => hasRef ? { level: "GREEN", source: "SAP Standard" } : { level: "YELLOW", source: "Domain Knowledge" };
// incident / troubleshooting / process / solution = authored domain knowledge → YELLOW
export const trustDomain = (): Trust => ({ level: "YELLOW", source: "Domain Knowledge" });
export const trustOrg = (): Trust => ({ level: "YELLOW", source: "הארגון Knowledge" });
