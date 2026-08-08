// Live client for /api/ask-v2.
//
// Replaces the mock. The component contract is unchanged: this returns the same
// Answer shape the UI already renders, so nothing in the views moved.
//
// Two things the backend does not provide are derived here rather than faked:
//   - section titles, which the API returns as null but the local library index
//     already knows, so citations become readable instead of "book1#3#3.2";
//   - follow-up questions, which are composed from the answer's own scope. They
//     are labelled as suggestions in the UI, not presented as model output.
import type { Answer, Citation, Scope } from "./types";
import { bookById, cachedTree, loadTree, sectionHref } from "./tree";
import { detectDiagramIntent, answerHasDiagram } from "./diagram-intent";
import { StreamError, streamAnswer } from "./stream";

const ORIGIN = (process.env.NEXT_PUBLIC_BOOKS_API_URL || "https://sap-books-api.vercel.app/api/ask-v2")
  .replace(/\/api\/[a-z0-9-]+\/?$/i, "");

/**
 * Each surface has its own endpoints. The server pins the task per URL, so a
 * client bug cannot make the library answer ungrounded — but the client should
 * not be asking the wrong endpoint in the first place, and naming them here
 * makes a crossed wire visible in one place instead of at a call site.
 */
const ENDPOINTS = {
  library: { ask: `${ORIGIN}/api/library`, stream: `${ORIGIN}/api/library-stream` },
  consult: { ask: `${ORIGIN}/api/consult`, stream: `${ORIGIN}/api/consult-stream` },
} as const;

/** Legacy default, still used by the embedded AskAI widget. */
const API = `${ORIGIN}/api/library`;

// The endpoint runs 15-80s depending on which provider serves. Give it room:
// aborting early would show an error for a request that was going to succeed.
const TIMEOUT_MS = 120_000;

/** Never surface a status code, provider name or upstream text to a reader. */
const MSG = {
  unavailable: "שירות ה-AI אינו זמין כרגע. אפשר להמשיך להשתמש בספרייה ולנסות שוב בעוד מספר דקות.",
  timeout: "התשובה לוקחת יותר מדי זמן. נסה לצמצם את ההיקף לפרק או לסעיף מסוים, או לנסות שוב.",
  offline: "אין חיבור לרשת. התשובות דורשות חיבור פעיל.",
  generic: "אירעה שגיאה זמנית. נסה שוב בעוד רגע.",
  empty: "לא התקבלה תשובה. נסה לנסח את השאלה מחדש.",
};

/** The scope mode the backend understands, derived from what the user picked. */
function scopeMode(scope: Scope): string | undefined {
  if (scope.section) return "section";
  if (scope.chapter != null) return "chapter";
  if (scope.bookId) return "book";
  return "library";
}

/** Turn an API source into something a person can read and click. */
// The API returns `book: x.book ?? null`, so null is a real value here. The old
// signature said `string | undefined` and only type-checked because the buffered
// path passed `any` through — the streaming path types its payload, which is
// what surfaced this.
function toCitation(s: {
  id?: string; book?: string | null; chapter?: number | null; section?: string | null; title?: string | null;
}): Citation | null {
  const id = String(s.id || "");
  // ids look like book1#5#5.2.10; fall back to the explicit fields if not.
  const [bookPart, chPart, secPart] = id.split("#");
  const bookId = bookPart || "";
  const chapter = Number(s.chapter ?? chPart ?? 0) || 0;
  const section = String(s.section ?? secPart ?? "");
  if (!bookId) return null;

  // The API returns title: null. The library index has the real heading.
  const tree = cachedTree(bookId);
  const localTitle =
    tree?.chapters.find((c) => c.n === chapter)?.sections.find((x) => x.id === section)?.t ?? null;

  return {
    id: id || `${bookId}#${chapter}#${section}`,
    book: s.book || bookById(bookId)?.title || bookId,
    bookId,
    chapter,
    section,
    title: s.title || localTitle,
    href: sectionHref(bookId, chapter, section),
  };
}

/**
 * Confidence from evidence, not from the model's self-report: the answer policy
 * sets the band, and citation coverage moves it within that band.
 */
function confidenceOf(policy: Answer["policy"], citations: number): number {
  if (policy === "REFUSE") return 0.2;
  const base = policy === "PARTIAL" ? 0.55 : 0.8;
  return Math.min(0.97, base + Math.min(citations, 6) * 0.025);
}

/** Suggestions derived from the current scope. Clearly ours, never quoted as the model's. */
function followUps(scope: Scope, policy: Answer["policy"]): string[] {
  const general = [
    "הסבר יותר לעומק",
    "תן דוגמה מעשית",
    "השווה ל-S/4HANA",
    "הצג טרנזקציות קשורות",
    "הצג טבלאות קשורות",
    "מהן הטעויות הנפוצות?",
  ];
  if (policy === "REFUSE") {
    return [
      scope.section ? "הרחב את החיפוש לפרק כולו" : "הרחב את החיפוש לספר כולו",
      "נסח את השאלה במילים אחרות",
      "חפש את הנושא בספר אחר",
    ];
  }
  return general.slice(0, scope.bookId ? 5 : 4);
}

/** Strips the trailing SOURCES line; it is metadata, not prose. */
function stripSourcesLine(text: string): string {
  return text.replace(/^SOURCES:.*$/mi, "").trimEnd();
}

let seq = 0;

export async function askApi(question: string, scope: Scope, task?: string): Promise<Answer> {
  const id = `a${++seq}`;
  const started = Date.now();

  // A question about a process, a lifecycle or a set of relationships wants a
  // picture. The routing config already had visual profiles; nothing selected
  // them, so every question was answered as prose. An explicit task from a
  // quick-action button always wins over what we infer.
  const intent = task ? null : detectDiagramIntent(question);
  const profile = task ?? intent?.task ?? "HEBREW_EXPLAIN";

  // Citations resolve their titles from this; make sure it is loaded.
  if (scope.bookId) { try { await loadTree(scope.bookId); } catch { /* titles degrade to null */ } }

  const base: Omit<Answer, "text" | "policy" | "confidence" | "citations" | "followUps"> = {
    id, question, scope, ms: 0,
  };

  if (typeof navigator !== "undefined" && navigator.onLine === false) {
    return { ...base, text: "", policy: "REFUSE", confidence: 0, citations: [], followUps: [], error: MSG.offline };
  }

  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(API, {
      method: "POST",
      headers: { "content-type": "application/json" },
      signal: ctl.signal,
      body: JSON.stringify({
        question,
        bookId: scope.bookId,
        chapter: scope.chapter,
        section: scope.section,
        scope: scopeMode(scope),
        task: profile,
        ...(intent && !intent.unsupported ? { diagramKind: intent.kind } : {}),
      }),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok || !data || typeof data.answer !== "string") {
      // 503 is the backend's "provider unavailable"; everything else is generic.
      const msg = res.status === 503 || data?.error === "AI_UNAVAILABLE" ? MSG.unavailable : MSG.generic;
      return { ...base, ms: Date.now() - started, text: "", policy: "REFUSE", confidence: 0, citations: [], followUps: [], error: msg };
    }

    const text = stripSourcesLine(String(data.answer)).trim();
    if (!text) {
      return { ...base, ms: Date.now() - started, text: "", policy: "REFUSE", confidence: 0, citations: [], followUps: [], error: MSG.empty };
    }

    const policy: Answer["policy"] =
      data.policy === "FULL" || data.policy === "PARTIAL" || data.policy === "REFUSE"
        ? data.policy
        // The endpoint strips the label before returning, so infer from the text.
        : /^לא מצאתי|לא נמצא/.test(text) ? "REFUSE" : "FULL";

    const citations = Array.isArray(data.sources)
      ? (data.sources.map(toCitation).filter(Boolean) as Citation[])
      : [];

    return {
      ...base,
      ms: Date.now() - started,
      text,
      policy,
      // A refusal cites nothing, whatever the payload contained.
      citations: policy === "REFUSE" ? [] : citations,
      confidence: confidenceOf(policy, citations.length),
      followUps: followUps(scope, policy),
      model: typeof data.model === "string" ? data.model : undefined,
      truncated: data.truncated === true,
    } as Answer;
  } catch (e) {
    const aborted = (e as Error)?.name === "AbortError";
    return {
      ...base, ms: Date.now() - started, text: "", policy: "REFUSE", confidence: 0,
      citations: [], followUps: [], error: aborted ? MSG.timeout : MSG.generic,
    };
  } finally {
    clearTimeout(timer);
  }
}

/** Same host as the buffered endpoint, streaming route. */


/**
 * Streaming twin of askApi.
 *
 * Returns the same Answer, so every consumer — history, export, citations,
 * follow-ups — is unchanged. The only difference is that `onDelta` fires while
 * the answer is being written.
 *
 * The delta text is a PREVIEW: it has not been through the Hebrew gate,
 * post-processing or grounding validation. The Answer returned here is built
 * from the `done` event, never from the accumulated preview, so an answer the
 * gates reject cannot survive as rendered text.
 */
export async function askApiStream(
  question: string,
  scope: Scope,
  task: string | undefined,
  handlers: { onDelta?: (text: string) => void; onStatus?: (stage: string) => void },
  signal?: AbortSignal,
  /** Which surface is asking. Decides the endpoint; the server pins the task. */
  surface: keyof typeof ENDPOINTS = "library",
): Promise<Answer> {
  const id = `a${++seq}`;
  const started = Date.now();
  if (scope.bookId) { try { await loadTree(scope.bookId); } catch { /* titles degrade */ } }

  const base: Omit<Answer, "text" | "policy" | "confidence" | "citations" | "followUps"> = {
    id, question, scope, ms: 0,
  };
  if (typeof navigator !== "undefined" && navigator.onLine === false) {
    return { ...base, text: "", policy: "REFUSE", confidence: 0, citations: [], followUps: [], error: MSG.offline };
  }

  const intent = task ? null : detectDiagramIntent(question);
  const profile = task ?? intent?.task ?? "HEBREW_EXPLAIN";

  try {
    const out = await streamAnswer(ENDPOINTS[surface].stream, {
      question,
      bookId: scope.bookId,
      chapter: scope.chapter,
      section: scope.section,
      scope: scopeMode(scope),
      task: profile,
      ...(intent && !intent.unsupported ? { diagramKind: intent.kind } : {}),
    }, handlers, signal);

    const text = stripSourcesLine(String(out.answer || "")).trim();
    const policy: Answer["policy"] =
      out.policy === "FULL" || out.policy === "PARTIAL" || out.policy === "REFUSE"
        ? out.policy
        : /^לא מצאתי|לא נמצא/.test(text) ? "REFUSE" : "FULL";
    const citations = Array.isArray(out.sources)
      ? (out.sources.map(toCitation).filter(Boolean) as Citation[])
      : [];

    return {
      ...base,
      ms: out.ms ?? Date.now() - started,
      text,
      policy,
      citations: policy === "REFUSE" ? [] : citations,
      confidence: confidenceOf(policy, citations.length),
      followUps: followUps(scope, policy),
      model: out.model ?? undefined,
      ...(intent ? {
        diagram: {
          kind: intent.kind,
          explicit: intent.explicit,
          unsupported: intent.unsupported,
          drawn: answerHasDiagram(text),
        },
      } : {}),
    } as Answer;
  } catch (e) {
    const code = e instanceof StreamError ? e.code : "";
    const aborted = (e as Error)?.name === "AbortError";
    const msg = aborted ? MSG.timeout
      : code === "AI_UNAVAILABLE" ? MSG.unavailable
      : MSG.generic;
    return { ...base, ms: Date.now() - started, text: "", policy: "REFUSE",
      confidence: 0, citations: [], followUps: [], error: msg };
  }
}
