# SAP SD Order-to-Cash — Expert Explanation

This note assumes familiarity with SAP ECC/S/4HANA document logic and reframes the three-document O2C chain (order → delivery → billing) in terms of data model, integration points, and the mechanics a consultant must control. The source defines the canonical happy path; the commentary below situates it.

## 1. Document architecture and the copy-control backbone
SD documents follow a uniform **header/item** persistence pattern, and the entire chain is stitched together by **copy control**, which governs how one document is created with reference to its predecessor.

| Document | Tcode (create) | Header | Item |
|---|---|---|---|
| Sales order | `VA01` | **VBAK** | **VBAP** |
| Outbound delivery | `VL01N` | **LIKP** | **LIPS** |
| Billing document | `VF01` | **VBRK** | **VBRP** |

- **Schedule lines** (VBEP) sit below the order item and carry confirmed quantities/dates from availability check (ATP) — the source omits them but they drive what is deliverable.
- **Document flow** is materialized in **VBFA** (predecessor/successor links). This is the table you query to trace order → delivery → GI → invoice and to diagnose where a chain stalls.
- **Partner functions** (VBPA) resolve the **sold-to (AG)**, ship-to (WE), bill-to (RE), and payer (RG). The source mentions only sold-to; in practice these four can diverge and change pricing, tax, and delivery.

## 2. The order: pricing, ATP, and credit
The sales order is far more than a request capture:
- **Pricing** runs through the condition technique (procedure → access sequence → condition types), persisted as conditions (KONV/PRCD_ELEMENTS in S/4). Net value flows downstream into billing.
- **Availability check (ATP)** confirms schedule lines against stock/receipts; this is what makes a quantity deliverable.
- **Credit management** (FSCM in S/4, classic SD credit in ECC) can block the order or the delivery.
- Document type (VBAK-AUART, e.g. OR) and item category (VBAP-PSTYV, e.g. TAN) are the control switches; item category determines whether an item is relevant for delivery and billing.

## 3. The delivery: picking, GI, and the WM/MM/FI consequences
`VL01N` creates the delivery; the financially significant event is **post goods issue (PGI)**:
- PGI posts **movement type 601**, debiting Cost of Goods Sold and crediting inventory (the FI side via automatic account determination, OBYC), and reduces unrestricted stock.
- It generates an **MM material document** (MKPF/MSEG in ECC; MATDOC in S/4HANA) and an **accounting document** for the COGS posting — two FI-relevant events occur in O2C, at PGI and at billing.
- Picking may be WM/EWM-driven (transfer orders) or simple lean picking; the source's "picking" abstracts this.
- GI is the point of **revenue recognition relevance** and of stock/ownership transfer; it is also where Incoterms/route/transportation hang off.

## 4. Billing: SD→FI handoff and account determination
`VF01` creates the billing document (VBRK/VBRP) and triggers **automatic FI posting**:
- The accounting document lands in **BKPF/BSEG**; revenue, receivables (reconciliation account on the customer master), and tax lines are derived via **account determination (VKOA)** keyed by account assignment group, condition type, etc.
- Billing can be **order-related** (e.g. services, milestone) or **delivery-related** (the standard goods case described in the source) — the billing relevance flag on the item category decides which.
- Downstream: the FI receivable is cleared on **incoming payment** (FI-AR, F-28 / electronic bank statement). The source's "cash" is implicit — billing creates the receivable; clearing it is the true end of O2C.

## 5. S/4HANA deltas a consultant must flag
- **Material document table**: MKPF/MSEG → **MATDOC** (aggregates removed; ACDOCA is the universal journal for FI).
- **Business partner**: customer master (KNA1/KNVV) is fronted by the **Business Partner (BP)** model with CVI; sold-to is a BP role.
- **Pricing**: KONV → **PRCD_ELEMENTS**.
- **Fiori**: `VA01`/`VL01N`/`VF01` have Fiori app equivalents (Create Sales Orders, Create Outbound Deliveries, Create Billing Documents); the GUI tcodes still work.

## 6. Diagnostic checklist
- Chain broken? Inspect **VBFA** and the document flow in `VA03`.
- Delivery won't create? Check item category delivery relevance, ATP confirmation (VBEP), shipping point determination, and delivery/credit blocks (VBAK-LIFSK/CMGST).
- Billing won't create? Check billing relevance, billing block (VBKD/VBAK-FAKSK), and that GI is posted for delivery-related billing.
- FI not posting? Check VKOA account determination, posting block on the billing type, and number range/period status.

The three transactions in the source are the spine; mastery is in the control tables (copy control, item category, account determination) and the two FI-relevant events (PGI's COGS posting and billing's revenue posting) that bracket the physical flow.
