"use client";

// Client-side Gemini (NotebookLM pilot) via the official @google/generative-ai SDK,
// with streaming. NOTE: NEXT_PUBLIC_GEMINI_API_KEY ships in the browser bundle —
// use a free, domain-restricted key (chosen client-side architecture).

import { GoogleGenerativeAI } from "@google/generative-ai";

export const GEMINI_MODEL = "gemini-1.5-pro"; // 2M-token context window

export function geminiKey(): string | null {
  const k = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  return k && k.trim() ? k.trim() : null;
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
    model: GEMINI_MODEL,
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
