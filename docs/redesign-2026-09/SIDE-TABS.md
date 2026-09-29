# Side-tabs · the 2026 decision

A "side-tab" is a thick coloured border on the inline-start edge of a card, row or panel. The brief asked that the findings in `app/neo/object.css` not be silenced, but decided inside the new system: kept with documented evidence, or fixed. This file is the record for every instance in `app/neo/*.css` (55), generated from the same table the change was applied from (`neo-redesign-evidence/tools/side-tabs.py`, output `side-tabs.json`).

The rule:

- **Semantic** (kept, thinned to 2px): the line's style or colour states a fact that the adjacent text also states, so it is a second channel, not decoration. Solid versus dashed is the spec's verified versus unverified relation, and primary versus foreign key.
- **Quotation rule** (kept as a neutral 2px rule): a typographic convention for quoted source text; it no longer takes a module or brand colour.
- **Current item** (the selection line): marks the current section or live filter, drawn exactly like the rail's selection.
- **Decorative** (replaced by a 1px hairline): a module, object-class, status or brand colour bar that repeats a chip or word already on the element. Brand red is kept for the one primary action and selection; the chat and cockpit panels no longer paint it as decoration.

Catalogue rows drew their module as a 3px grid column (`.nxd-mark`, "the one strongest identity signal"). The module code in its colour stays on every row; the column is removed (`app/neo/data.css`).

## Semantic: kept, 2px, same style and colour (8)

| file:line | selector | before | after | why |
|---|---|---|---|---|
| `data.css:1105` | `.nx-app .nxb-keyline > div` | `border-inline-start: 3px solid var(--k, var(--ink-3));` | `border-inline-start: 2px solid var(--k, var(--ink-3));` | PK / FK key group, labelled |
| `home.css:195` | `.nx-app .fm-line` | `border-inline-start: 2px solid var(--mod);` | `border-inline-start: 2px solid var(--mod);` | not a side-tab: the process map's vertical connector on a phone |
| `object.css:507` | `.no-rel-row` | `border-inline-start: 3px solid var(--r);` | `border-inline-start: 2px solid var(--r);` | relation kind (--r), with the cardinality in text |
| `object.css:605` | `.no-dangle-l li` | `border-inline-start: 3px dashed var(--r);` | `border-inline-start: 2px dashed var(--r);` | unverified relation: dashed, as the spec requires |
| `object.css:631` | `.no-keyg[data-k="PK"]` | `border-inline-start: 4px solid var(--o);` | `border-inline-start: 2px solid var(--o);` | primary key (solid), labelled PK |
| `object.css:632` | `.no-keyg[data-k="FK"]` | `border-inline-start: 4px dashed color-mix(in srgb, var(--o) 55%, var(--ink-3));` | `border-inline-start: 2px dashed color-mix(in srgb, var(--o) 55%, var(--ink-3));` | foreign key (dashed), labelled FK |
| `object.css:1153` | `.no-fields .no-table tr[data-key="PK"]` | `border-inline-start: 3px solid var(--o);` | `border-inline-start: 2px solid var(--o);` | primary key row (solid), key column says PK |
| `object.css:1155` | `.no-fields .no-table tr[data-key="FK"]` | `border-inline-start: 3px dashed color-mix(in srgb, var(--o) 55%, var(--ink-3));` | `border-inline-start: 2px dashed color-mix(in srgb, var(--o) 55%, var(--ink-3));` | foreign key row (dashed), key column says FK |

## Current or live item: the selection line (3px --select-line) (5)

| file:line | selector | before | after | why |
|---|---|---|---|---|
| `domain.css:299` | `.ndm-chip[data-live="1"]` | `border-inline-start: 2px solid var(--m);` | `border-inline-start: 3px solid var(--select-line);` | current item: the selection line |
| `object.css:1293` | `.nox-chip[data-live="1"]` | `border-inline-start: 2px solid var(--o, var(--brand));` | `border-inline-start: 3px solid var(--select-line);` | current item: the selection line |
| `reader.css:199` | `.nr-crumb-now` | `border-inline-start: 2px solid var(--m);` | `border-inline-start: 3px solid var(--select-line);` | current item: the selection line |
| `reader.css:567` | `.nr-sec[aria-current="true"] .nr-sec-t` | `border-inline-start: 3px solid var(--m);` | `border-inline-start: 3px solid var(--select-line);` | current item: the selection line |
| `s4.css:236` | `.ns4-chip[data-live="1"]` | `border-inline-start: 2px solid var(--s);` | `border-inline-start: 3px solid var(--select-line);` | current item: the selection line |

## Quotation rule: neutral 2px (--line-strong) (8)

| file:line | selector | before | after | why |
|---|---|---|---|---|
| `chat.css:738` | `.nxq-src-quote` | `border-inline-start: 2px solid color-mix(in srgb, var(--brand) 45%, var(--hairline));` | `border-inline-start: 2px solid var(--line-strong);` | quotation rule, neutral |
| `data.css:1321` | `.nx-app .nxb-quote` | `border-inline-start: 2px solid color-mix(in srgb, var(--m) 40%, var(--hairline));` | `border-inline-start: 2px solid var(--line-strong);` | quotation rule, neutral |
| `domain.css:215` | `.ndm-quote` | `border-inline-start: 3px solid color-mix(in srgb, var(--m) 45%, transparent);` | `border-inline-start: 2px solid var(--line-strong);` | quotation rule, neutral |
| `evidence.css:87` | `.nev-src li` | `border-inline-start: 2px solid var(--hairline);` | `border-inline-start: 2px solid var(--line-strong);` | quotation rule, neutral |
| `learn.css:923` | `.nx-app .nxs-l--note` | `border-inline-start: 2px solid var(--nxs-tone, var(--c-hair));` | `border-inline-start: 2px solid var(--line-strong);` | quotation rule, neutral |
| `object.css:841` | `.no-quote` | `border-inline-start: 2px solid var(--hairline);` | `border-inline-start: 2px solid var(--line-strong);` | quotation rule, neutral |
| `reader.css:637` | `.nr-orig-b` | `border-inline-start: 2px solid var(--hairline);` | `border-inline-start: 2px solid var(--line-strong);` | quotation rule, neutral |
| `reader.css:706` | `.nr-bi-cell[data-l="en"]` | `border-inline-start: 2px solid color-mix(in srgb, var(--m) 30%, var(--hairline));` | `border-inline-start: 2px solid var(--line-strong);` | quotation rule, neutral |

## Decorative: a 1px hairline (34)

| file:line | selector | before | after | why |
|---|---|---|---|---|
| `centers.css:80` | `.nct-fam` | `border-inline-start: 3px solid var(--ct);` | `border-inline-start: 1px solid var(--hairline);` | colour bar repeating a chip or word already on the element |
| `cert.css:141` | `.nce-why` | `border-inline-start: 3px solid var(--ok);` | `border-inline-start: 1px solid var(--hairline);` | colour bar repeating a chip or word already on the element |
| `chat.css:246` | `.nxq-ctx` | `border-inline-start: 3px solid color-mix(in srgb, var(--brand) 55%, var(--hairline));` | `border-inline-start: 1px solid var(--hairline);` | colour bar repeating a chip or word already on the element |
| `chat.css:549` | `.nxq-answer` | `border-inline-start: 3px solid color-mix(in srgb, var(--brand) 55%, var(--hairline));` | `border-inline-start: 1px solid var(--hairline);` | colour bar repeating a chip or word already on the element |
| `chat.css:603` | `.nxq-fail` | `border-inline-start: 3px solid var(--brand);` | `border-inline-start: 1px solid var(--hairline);` | colour bar repeating a chip or word already on the element |
| `chat.css:1550` | `.nxq[data-surface="library"] .nxq-w-scope` | `border-inline-start: 3px solid var(--scene-accent);` | `border-inline-start: 1px solid var(--hairline);` | colour bar repeating a chip or word already on the element |
| `domain.css:135` | `.ndm-card` | `border-inline-start: 3px solid var(--m);` | `border-inline-start: 1px solid var(--hairline);` | colour bar repeating a chip or word already on the element |
| `domain.css:243` | `.ndm-step` | `border-inline-start: 3px solid color-mix(in srgb, var(--m) 55%, transparent);` | `border-inline-start: 1px solid var(--hairline);` | colour bar repeating a chip or word already on the element |
| `domain.css:331` | `.ndm-trb li` | `border-inline-start: 3px solid color-mix(in srgb, var(--status-in-analysis) 60%, transparent);` | `border-inline-start: 1px solid var(--hairline);` | colour bar repeating a chip or word already on the element |
| `domain.css:342` | `.ndm-s4 li` | `border-inline-start: 3px solid var(--t, var(--ink-3));` | `border-inline-start: 1px solid var(--hairline);` | colour bar repeating a chip or word already on the element |
| `erd.css:1197` | `.ne-joins > li` | `border-inline-start: 2px solid var(--hairline);` | `border-inline-start: 1px solid var(--hairline);` | colour bar repeating a chip or word already on the element |
| `erd.css:1230` | `.ne-join-s` | `border-inline-start: 2px solid color-mix(in srgb, var(--m) 45%, transparent);` | `border-inline-start: 1px solid var(--hairline);` | colour bar repeating a chip or word already on the element |
| `evidence.css:115` | `.nev-warn` | `border-inline-start: 3px solid var(--status-not-started);` | `border-inline-start: 1px solid var(--hairline);` | colour bar repeating a chip or word already on the element |
| `object.css:203` | `.no-shared` | `border-inline-start: 3px solid var(--mod-pm);` | `border-inline-start: 1px solid var(--hairline);` | colour bar repeating a chip or word already on the element |
| `object.css:297` | `.no-s4flag` | `border-inline-start: 5px solid var(--o);` | `border-inline-start: 1px solid var(--hairline);` | colour bar repeating a chip or word already on the element |
| `object.css:796` | `.no-stand` | `border-inline-start: 4px solid color-mix(in srgb, var(--o) 55%, var(--hairline));` | `border-inline-start: 1px solid var(--hairline);` | colour bar repeating a chip or word already on the element |
| `object.css:1085` | `.no-read-joins li` | `border-inline-start: 3px solid var(--m);` | `border-inline-start: 1px solid var(--hairline);` | colour bar repeating a chip or word already on the element |
| `object.css:1388` | `.nox-int li` | `border-inline-start: 2px solid color-mix(in srgb, var(--o, var(--brand)) 35%, transparent);` | `border-inline-start: 1px solid var(--hairline);` | colour bar repeating a chip or word already on the element |
| `object.css:1419` | `.nod-purpose` | `border-inline-start: 3px solid color-mix(in srgb, var(--o, var(--brand)) 50%, transparent);` | `border-inline-start: 1px solid var(--hairline);` | colour bar repeating a chip or word already on the element |
| `reader.css:353` | `.nr-resume` | `border-inline-start: 3px solid var(--m);` | `border-inline-start: 1px solid var(--hairline);` | colour bar repeating a chip or word already on the element |
| `reader.css:466` | `.nr-ch-n` | `border-inline-start: 3px solid var(--m);` | `border-inline-start: 1px solid var(--hairline);` | colour bar repeating a chip or word already on the element |
| `reader.css:1515` | `.nr-intro` | `border-inline-start: 2px solid color-mix(in oklab, var(--m, var(--brand)) 42%, transparent);` | `border-inline-start: 1px solid var(--hairline);` | colour bar repeating a chip or word already on the element |
| `s4.css:179` | `.ns4-obj` | `border-inline-start: 3px solid var(--s);` | `border-inline-start: 1px solid var(--hairline);` | colour bar repeating a chip or word already on the element |
| `s4.css:246` | `.ns4-rows > li, .ns4-errs > li, .ns4-topics > li` | `border-inline-start: 3px solid var(--r, var(--s));` | `border-inline-start: 1px solid var(--hairline);` | colour bar repeating a chip or word already on the element |
| `s4.css:310` | `.ns4-mods > li` | `border-inline-start: 3px solid var(--s);` | `border-inline-start: 1px solid var(--hairline);` | colour bar repeating a chip or word already on the element |
| `s4.css:350` | `.ns4-wave-l li` | `border-inline-start: 3px solid var(--s);` | `border-inline-start: 1px solid var(--hairline);` | colour bar repeating a chip or word already on the element |
| `search.css:275` | `.nx-app .nxc--r .nxc-sec-body` | `border-inline-start: 2px solid color-mix(in srgb, var(--m, var(--ink-3)) 24%, transparent);` | `border-inline-start: 1px solid var(--hairline);` | colour bar repeating a chip or word already on the element |
| `search.css:423` | `.nx-app .nxc--r .nxc-none` | `border-inline-start: 2px solid var(--c-hair);` | `border-inline-start: 1px solid var(--hairline);` | colour bar repeating a chip or word already on the element |
| `studio.css:152` | `.nst-node` | `border-inline-start: 3px solid var(--c);` | `border-inline-start: 1px solid var(--hairline);` | colour bar repeating a chip or word already on the element |
| `workspace.css:204` | `.nw-hero` | `border-inline-start: 3px solid var(--m);` | `border-inline-start: 1px solid var(--hairline);` | colour bar repeating a chip or word already on the element |
| `workspace.css:885` | `.nw-det` | `border-inline-start: 2px solid var(--m);` | `border-inline-start: 1px solid var(--hairline);` | colour bar repeating a chip or word already on the element |
| `workspace.css:1102` | `.nw-move` | `border-inline-start: 3px solid color-mix(in srgb, var(--m) 45%, var(--hairline));` | `border-inline-start: 1px solid var(--hairline);` | colour bar repeating a chip or word already on the element |
| `workspace.css:1182` | `.nw-sheet-r` | `border-inline-start: 3px solid color-mix(in srgb, var(--m) 38%, var(--hairline));` | `border-inline-start: 1px solid var(--hairline);` | colour bar repeating a chip or word already on the element |
| `workspace.css:1270` | `.nw-bookrow--flat` | `border-inline-start: 2px solid color-mix(in srgb, var(--m) 40%, transparent);` | `border-inline-start: 1px solid var(--hairline);` | colour bar repeating a chip or word already on the element |
## Bars drawn with an inset shadow (same rule, found in a second pass)

A side-tab can also be an inset box-shadow a few pixels wide on the start edge; the border sweep above does not see those. Decided with the same rule:

| where | what | decision |
|---|---|---|
| `data.css` `.nxt-s4[data-impacted]`, `learn.css` `.nxv-s4[data-s4]`, `reference.css` `.nxr-row[data-impacted]` | brand bar (with a red tint or border) on an "impacted" S/4HANA plate or row | decorative: removed; the status mark and word state the impact, and red is the action colour |
| `search.css` `.nx-group[data-hit] .nx-group-btn` | module bar on a rail group that holds search hits | decorative: removed; hits read by weight |
| `reader.css` `.nr-rtoc-t[data-now]`, `.nr-toc-row[data-on]`, `workspace.css` `.nw-row[data-open]` | the current contents entry, the open row | current item: the selection line (3px `--select-line`) |
| `data.css` `.nxb-tbl tr[data-k]`, `object.css` `.no-table tr[data-key="PK"] > :first-child` | primary / foreign key role on a field row, with PK / FK in the key column | semantic: kept at 2px |

## Late decisions (review of the merged branch)

The first sweep matched the shorthand `border-inline-start: <n>px`. Five edges written as longhand or as an inset shadow were found later, by the design hook and by review, and were decided under the same rule:

| Where | Was | Now | Why |
|---|---|---|---|
| `object.css` `.no-stand[data-impact="1"]` | 7px object-colour edge plus `--elev-2` | no edge, no shadow | the panel's status pill already says "impacted" (SIDE-1) |
| `data.css` `.nxt-s4[data-impacted="1"]`, `.nxb-s4flag`; `learn.css` `.nxv-s4[data-s4="1"]`; `reference.css` `.nxr-row[data-impacted="1"]` | brand-red inset edge, tinted border or gradient wash | neutral surface and hairline | red is the action colour, the status word carries the impact (SIDE-2). The row's `box-shadow: none` override was then removed as well: it out-ranked `.nu-card:focus-visible` and hid the keyboard focus ring |
| `workspace.css` `.nw-move[data-risk]` | 6px / 4px edge plus a lift | no edge | the risk word is in the row's pill (SIDE-3) |
| `workspace.css` `.nw-idx-i[data-key="1"]` | 3px module edge | weight and module-coloured number | a key chapter is marked in text, not by a bar |
| `object.css` `.nox-chip[data-live="1"]` | 3px selection-line edge | link language: `--link` text, underline on hover, blue focus ring | it is a link, not a selection (gate 5, finding 5) |

The detector (`impeccable detect`) reports 0 side-tab findings in `object.css` after the merge.

## Added after gate 10 (2026-09-29)

Gate 10 (m12) found two 3px lines outside this record, because the generator reads `app/neo/*.css` only.

| file:line | selector | before | after | why |
|---|---|---|---|---|
| `search.css:441` | `.nx-app .nxc--r .nxc-d-rels li` | `border-inline-start-width: 3px;` | `border-inline-start-width: 2px;` | a relation row's module line in the command surface; the module code is written on the row, so it is the same semantic second channel as `.no-rel-row` |
| `globals.css:841` | `.neo-reader blockquote` | `border-inline-start: 3px solid var(--brand);` | unchanged | the pre-NEO reader's quotation style. No NEO page renders `.neo-reader` (the NEO reader is `.nr`, and every pre-NEO reader address redirects to NEO, NAV-LEGACY.md); it goes with the old layer when `globals.css` is cleaned (gate 10, m14) |

