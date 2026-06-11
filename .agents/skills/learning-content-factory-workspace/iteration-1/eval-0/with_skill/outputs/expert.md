# Expert Explanation — SAP SD Order-to-Cash

Assumes familiarity with SD document flow and the FI/MM interfaces. This note maps the three SD documents to their persistence and the postings they trigger, strictly per the source.

## Document chain and persistence
The Order-to-Cash flow is a chain of three SD documents, each with a header/item table pair:

| Step | Document | Tcode(s) | Header | Items |
|------|----------|----------|--------|-------|
| 1 | Sales order | `VA01` / `VA02` / `VA03` | `VBAK` | `VBAP` |
| 2 | Outbound delivery | `VL01N` | `LIKP` | `LIPS` |
| 3 | Billing document (invoice) | `VF01` | `VBRK` | `VBRP` |

The sales order (`VBAK`/`VBAP`) anchors the partner determination — the source explicitly names the **sold-to party** as the referenced customer — and carries the material lines with quantities and prices, i.e. the commercial terms that the subsequent documents copy forward.

## Inventory posting at goods issue
The delivery (`VL01N`) is the logistics trigger for picking and goods issue. Goods issue is the inventory-relevant event: it posts a **material movement of movement type `601`**, which **reduces inventory**. This is the point in the chain where stock quantity (and, in a full system, stock value) leaves the company's books on the MM side. In the source's model, goods issue — not order creation and not billing — is what decrements inventory.

## Revenue posting at billing
Billing (`VF01`) creates the customer invoice persisted in `VBRK`/`VBRP`. Critically, billing is the SD→FI handoff: it **passes the revenue to Financial Accounting**, generating an **FI document** persisted in `BKPF` (accounting header) / `BSEG` (accounting line items). So a single billing document drives both the SD-side invoice and the FI-side accounting document.

## Connecting the pieces / what to watch
- **Two integration boundaries, one flow.** Step 2 is the SD→MM (inventory) boundary via movement type `601`; step 3 is the SD→FI (revenue) boundary via the `BKPF`/`BSEG` document. The sales order itself posts to neither — it is purely an SD commercial document.
- **Header/item symmetry.** Every document in the chain splits into header + item tables (`VBAK`/`VBAP`, `LIKP`/`LIPS`, `VBRK`/`VBRP`). When tracing a flow, join header-to-item within a document and document-to-document across the chain.
- **Sequence dependency.** Inventory does not move until the delivery's goods issue (`601`); revenue is not recognized in FI until billing. The order alone changes neither stock nor the ledger.

> Scope note: The source defines only these three documents, their tcodes, tables, the `601` goods-issue movement, and the `BKPF`/`BSEG` FI posting. Anything beyond (pricing procedures, copy control, output determination, account determination keys) is out of scope here.
