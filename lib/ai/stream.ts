/**
 * Reads the SSE answer stream.
 *
 * Uses fetch + a ReadableStream reader rather than EventSource, for two reasons
 * that both matter here: EventSource cannot issue a POST (the question, scope
 * and page context travel in the body), and it cannot be aborted cleanly, which
 * this needs so navigating away stops the generation.
 *
 * The protocol deliberately separates preview from truth. `delta` text is
 * ungated — it has not been through post-processing, the Hebrew script gate or
 * grounding validation. `done` carries the authoritative answer and REPLACES
 * whatever the deltas built. Callers must not treat accumulated deltas as final;
 * when grounding rejects an answer the preview is discarded entirely.
 */

export interface StreamHandlers {
  /** Retrieval finished; `books` passages were served. */
  onMeta?: (m: { books: number }) => void;
  /** A preview fragment. Ungated. */
  onDelta?: (text: string) => void;
  /** The stream is generating no more text; gates are running. */
  onStatus?: (stage: string) => void;
}

export interface StreamResult {
  answer: string;
  sources: { id: string; book?: string | null; chapter?: number | null; section?: string | null; title?: string | null }[];
  policy?: string;
  model?: string | null;
  books?: number;
  ms?: number;
  /** The preview was thrown away — the gates replaced it. */
  replaced?: boolean;
}

export class StreamError extends Error {
  readonly code: string;
  constructor(code: string) { super(code); this.code = code; }
}

/** Splits an SSE byte stream into events without assuming chunk boundaries. */
function* parseEvents(buffer: string): Generator<{ event: string; data: string }> {
  // Kept deliberately simple: this endpoint emits only `event:` + single-line
  // `data:` pairs. Anything else is skipped rather than guessed at.
  for (const block of buffer.split("\n\n")) {
    if (!block.trim()) continue;
    let event = "message";
    const dataLines: string[] = [];
    for (const line of block.split("\n")) {
      if (line.startsWith("event:")) event = line.slice(6).trim();
      else if (line.startsWith("data:")) dataLines.push(line.slice(5).trim());
    }
    if (dataLines.length) yield { event, data: dataLines.join("\n") };
  }
}

/**
 * @throws StreamError with a stable code — never provider text, a status code
 *         or a stack trace. The UI maps the code to Hebrew.
 */
export async function streamAnswer(
  url: string,
  body: unknown,
  handlers: StreamHandlers = {},
  signal?: AbortSignal,
): Promise<StreamResult> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
    signal,
  });

  if (!res.ok || !res.body) {
    // The endpoint answers non-stream errors as plain JSON before switching to
    // SSE, so a failure here still has a readable body.
    const j = await res.json().catch(() => null);
    throw new StreamError(j?.error === "AI_UNAVAILABLE" ? "AI_UNAVAILABLE" : "AI_ERROR");
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let result: StreamResult | null = null;
  let failure: string | null = null;

  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    // Only whole events are safe to parse; keep the trailing partial in the
    // buffer. Splitting on every read would corrupt a multi-byte Hebrew
    // character that straddles two network chunks.
    const lastBreak = buffer.lastIndexOf("\n\n");
    if (lastBreak === -1) continue;
    const ready = buffer.slice(0, lastBreak);
    buffer = buffer.slice(lastBreak + 2);

    for (const { event, data } of parseEvents(ready)) {
      let parsed: unknown;
      try { parsed = JSON.parse(data); } catch { continue; }
      const p = parsed as Record<string, unknown>;
      if (event === "meta") handlers.onMeta?.({ books: Number(p.books) || 0 });
      else if (event === "delta") handlers.onDelta?.(String(p.text ?? ""));
      else if (event === "status") handlers.onStatus?.(String(p.stage ?? ""));
      else if (event === "done") result = p as unknown as StreamResult;
      else if (event === "error") failure = String(p.error ?? "AI_ERROR");
    }
  }

  // Flush anything left after the final read.
  if (buffer.trim()) {
    for (const { event, data } of parseEvents(buffer)) {
      try {
        const p = JSON.parse(data) as Record<string, unknown>;
        if (event === "done") result = p as unknown as StreamResult;
        else if (event === "error") failure = String(p.error ?? "AI_ERROR");
      } catch { /* partial tail */ }
    }
  }

  if (failure) throw new StreamError(failure);
  // A stream that ended without `done` produced no validated answer. Returning
  // the preview here would ship exactly the ungated text the gates exist to
  // catch, so this is an error instead.
  if (!result) throw new StreamError("AI_INCOMPLETE");
  return result;
}
