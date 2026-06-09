"use client";

// Client-side Gemini (NotebookLM pilot) via the official @google/generative-ai SDK,
// with streaming. NOTE: NEXT_PUBLIC_GEMINI_API_KEY ships in the browser bundle —
// use a free, domain-restricted key (chosen client-side architecture).

import { GoogleGenerativeAI } from "@google/generative-ai";

// Runtime-selectable model. 1.5 is retired (404). 2.5-pro = best depth but heavy
// on the free tier; 2.0-flash = large context, far cheaper free-tier quota.
export const MODELS = [
  { id: "gemini-2.5-pro", label: "2.5 Pro · עומק מרבי" },
  { id: "gemini-2.0-flash", label: "2.0 Flash · מהיר/חסכוני" },
] as const;
export type ModelId = (typeof MODELS)[number]["id"];

const LS_MODEL = "neo:gemini-model";
export function getModel(): ModelId {
  if (typeof window !== "undefined") {
    const m = window.localStorage.getItem(LS_MODEL);
    if (m && MODELS.some((x) => x.id === m)) return m as ModelId;
  }
  return "gemini-2.5-pro";
}
export function setModel(id: ModelId) {
  if (typeof window !== "undefined") window.localStorage.setItem(LS_MODEL, id);
}
// kept for the sidebar label
export const GEMINI_MODEL = "gemini-2.5-pro";

const LS_KEY = "neo:gemini-key";

// Resolve the key: build-time env (NEXT_PUBLIC_ prefix, inlined in the bundle)
// first, then a user-pasted key saved in localStorage as a fallback.
export function geminiKey(): string | null {
  const env = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (env && env.trim()) return env.trim();
  if (typeof window !== "undefined") {
    const ls = window.localStorage.getItem(LS_KEY);
    if (ls && ls.trim()) return ls.trim();
  }
  return null;
}

export function saveGeminiKey(k: string) {
  if (typeof window !== "undefined") window.localStorage.setItem(LS_KEY, k.trim());
}
export function clearGeminiKey() {
  if (typeof window !== "undefined") window.localStorage.removeItem(LS_KEY);
}
export function keySource(): "env" | "local" | null {
  const env = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (env && env.trim()) return "env";
  if (typeof window !== "undefined" && window.localStorage.getItem(LS_KEY)) return "local";
  return null;
}

const SYSTEM_PROMPT = `Act as the Master SAP Implementer for CBC Israel (Coca-Cola), guiding the S/4HANA migration.
You answer ONLY from the provided book context (Production Planning with SAP S/4HANA / PP · PP-PI). If an answer is not in the context, say so explicitly in Hebrew — never invent.

When questioned, extract real-world configurations: Master Recipes (PLKO), Material-Recipe Assignments (MAPL), routings (PLPO), BOM properties (STKO/STPO), production versions (MKAL), work centers/resources (CRHD), and process orders (AUFK/AFKO/AFPO).

OUTPUT RULES (mandatory):
1. Write deeply extensive, detailed, well-structured **Hebrew** (RTL). Use Markdown headings, bullet lists and **tables**.
2. Preserve ALL SAP technical identifiers in English, verbatim: T-Codes, table names (PLKO, MAPL, STKO, MKAL, MARA, MARC…), programs, ABAP objects, IDoc names, BAPI/FM names, field/domain names. Do NOT translate them.
3. Provide explicit citations from the context: chapter + PDF page (e.g. "מקור: פרק 4, עמ' 130"). Prefer the [Chapter N | pp X-Y] markers in the context.
4. Be specific: include SPRO/IMG paths, parameters and configuration keys when present in the context.
5. For broad questions, summarize with a Markdown table of the relevant T-Codes / tables / steps.`;

export interface ChatTurn {
  role: "user" | "model";
  text: string;
}

/**
 * Stream an answer from Gemini, grounded in book context.
 * Yields incremental text chunks. Throws Error("MISSING_KEY") if no key.
 */
export async function* streamGemini(
  question: string,
  context: string,
  history: ChatTurn[],
): AsyncGenerator<string, void, unknown> {
  const key = geminiKey();
  if (!key) throw new Error("MISSING_KEY");

  const genAI = new GoogleGenerativeAI(key);
  const model = genAI.getGenerativeModel({
    model: getModel(),
    systemInstruction: SYSTEM_PROMPT,
    generationConfig: { temperature: 0.2, topP: 0.9, maxOutputTokens: 8192 },
  });

  const chat = model.startChat({
    history: [
      // Ground the conversation with the book context as the opening exchange.
      { role: "user", parts: [{ text: `הקשר הספר (Book context) — ענה אך ורק לפיו:\n\n${context}` }] },
      { role: "model", parts: [{ text: "קיבלתי את הקשר הספר. אענה אך ורק לפיו, בעברית מעמיקה ומובנית, עם שמירת מונחי SAP באנגלית וציון מקור (פרק ועמוד)." }] },
      ...history.map((t) => ({ role: t.role, parts: [{ text: t.text }] })),
    ],
  });

  const result = await chat.sendMessageStream(question);
  for await (const chunk of result.stream) {
    const t = chunk.text();
    if (t) yield t;
  }
}
