# Academic Outputs — Templates

One genre per request. Match the skeleton; fill from the evidence ledger. Keep prose concise; hedge
inference ("suggests", "is consistent with"), state results neutrally. Cite every borrowed claim.

## Table of contents
- [Summary](#summary)
- [Introduction](#introduction)
- [Literature Review](#literature-review)
- [Findings](#findings)
- [Discussion](#discussion)
- [Conclusions](#conclusions)
- [Assignment (essay/report)](#assignment)
- [Seminar Paper (IMRaD)](#seminar-paper)
- [References](#references)

## Summary
Three flavours — pick by audience:
- **Abstract** (150–250 words): context · aim · method · key result · implication. One paragraph.
- **Executive summary** (½ page): bullet the 3–5 decisions/takeaways a busy reader needs.
- **Structured summary**: headings = Purpose / Method / Findings / Limitations / Takeaway.

Rule: a summary is a *faithful compression*, not commentary. No claim that isn't in the source.

## Introduction
Funnel structure:
1. Broad context (why the topic matters) — 2–3 sentences.
2. Narrowing to the specific gap/problem (what's missing/contested).
3. Aim or research question, stated explicitly.
4. Contribution + roadmap ("This paper… Section 2…").

## Literature Review
**Synthesize by theme, never paper-by-paper.** A paragraph per theme that groups what multiple
sources say, contrasts them, and ends pointing at the gap.

Skeleton:
- Scope & method (what was searched, inclusion criteria, n sources, years).
- Theme 1 … Theme k (each: consensus → tension → what's unresolved).
- Synthesis matrix (optional table: Source × Theme × Finding).
- Gap statement → motivates the present work.

## Findings
- One claim per paragraph; lead with the claim, then the evidence (number, quote, figure ref).
- Report, don't interpret (interpretation belongs in Discussion).
- Every datum cited to its source location.

## Discussion
- Interpret findings against the research question.
- Compare to prior work (agreement / conflict, and why).
- State limitations honestly (design, sample, scope, validity threats).
- Implications (theory / practice / policy).

## Conclusions
- Restate the contribution in one sentence.
- 2–4 numbered takeaways (the things to remember).
- Future work. **No new evidence or citations introduced here.**

## Assignment
University essay/report skeleton (adapt to the brief/rubric if given):
`Title · Introduction (context+thesis) · Body (argument in themed sections, each evidence-backed) ·
Critical analysis · Conclusion · References`. Keep to the word limit; signpost with topic sentences;
take a position and defend it with cited evidence.

## Seminar Paper
IMRaD — the standard research-paper spine:
`Abstract · Introduction · (Related Work) · Methods · Results · Discussion · Conclusion · References`.
Methods must let a reader judge the findings; Results report neutrally; Discussion interprets +
limitations. This is the most formal genre — strongest citation discipline.

## References
Generate the reference list in the requested style (APA 7 / IEEE / Harvard) from the ledger using
`scripts/cite.py`. Ordering: alphabetical for APA/Harvard, citation-order (numbered) for IEEE. Every
in-text citation must have a matching list entry and vice versa.

---

### Worked micro-example (Abstract, APA 7 in-text)
Input ledger row: *Cunha & Heckman (2007) — early skill investment compounds (skill complementarity).*
Output: "Early childhood skill investments appear to compound over time through skill complementarity
(Cunha & Heckman, 2007), implying that the timing of investment, not only its size, shapes long-run
outcomes." — note the hedge ("appear to"), the in-text cite, and no invented numbers.
