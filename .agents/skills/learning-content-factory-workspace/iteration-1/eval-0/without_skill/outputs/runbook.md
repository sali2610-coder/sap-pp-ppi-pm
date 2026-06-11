# Runbook — Running One Order-to-Cash Cycle in SAP SD

A step-by-step procedure to execute a single end-to-end Order-to-Cash cycle: sales order → outbound delivery (with goods issue) → billing. Based on the standard happy path in the source material.

## Scope & prerequisites
- **Goal:** Take one customer order from creation through invoice, and confirm the financial posting.
- **Assumes:** Customer master and material master exist; the material has available stock; you have authorizations for VA01/VL01N/VF01.
- **Note on codes:** All transaction codes, table names, and the movement type below are SAP technical identifiers — enter them exactly as written.

---

## Step 1 — Create the sales order (`VA01`)
1. Enter transaction **VA01**.
2. Enter the **order type** (e.g. standard order) and the relevant sales area (sales org / distribution channel / division).
3. Enter the **sold-to party** (the customer).
4. Add one or more line items: **material** number and **quantity**. Price defaults from pricing.
5. Save. SAP issues a **sales order number**.
   - **Result:** header written to **VBAK**, items to **VBAP**.
6. (Optional) Verify with **VA03** (display) — note the order number for the next step.

**Checkpoint:** Order saved with a number, no incompletion/credit/delivery blocks. If items are not deliverable, confirm stock availability before continuing.

---

## Step 2 — Create the outbound delivery and post goods issue (`VL01N`)
1. Enter transaction **VL01N**.
2. Enter the **shipping point** and reference the **sales order number** from Step 1.
3. Confirm the delivery quantities.
4. Perform **picking** (enter picked quantities, via warehouse/transfer order or directly, depending on configuration).
5. **Post Goods Issue (PGI)**.
   - **Result:** delivery header written to **LIKP**, items to **LIPS**.
   - PGI posts a material movement of **type 601**, which **reduces inventory**.
6. Save / note the **delivery number**.

**Checkpoint:** Delivery created and goods issue posted (status shows GI complete). Stock for the material is reduced by the delivered quantity.

---

## Step 3 — Create the billing document (`VF01`)
1. Enter transaction **VF01**.
2. Reference the **delivery number** from Step 2 (delivery-related billing).
3. Review the billing items, quantities, and prices.
4. Save to create the **billing document (invoice)**.
   - **Result:** header written to **VBRK**, items to **VBRP**.
   - Billing passes **revenue to Financial Accounting (FI)** and creates an **FI document** in **BKPF** (header) and **BSEG** (items).
5. Note the **billing document number**.

**Checkpoint:** Invoice created; an FI accounting document was generated (revenue and customer receivable posted).

---

## Step 4 — Verify the cycle (document flow)
1. Open the order in **VA03** and review the document flow.
2. Confirm the chain is complete: **Sales order → Delivery → Goods issue → Invoice**.
3. Spot-check the FI document exists (revenue posted, receivable on the customer).

**Done:** One Order-to-Cash cycle is complete — the order is delivered, billed, and the revenue is recorded in accounting.

---

## Quick reference

| Step | Tcode | Creates | Header table | Item table | Key effect |
|------|-------|---------|--------------|-----------|------------|
| 1. Order | VA01 | Sales order | VBAK | VBAP | Captures customer + materials |
| 2. Delivery | VL01N | Outbound delivery + GI | LIKP | LIPS | Picking + GI (mvt 601) reduces stock |
| 3. Billing | VF01 | Invoice | VBRK | VBRP | Revenue to FI (BKPF/BSEG) |

## Troubleshooting (common stops)
- **Cannot create delivery:** order item not relevant for delivery, no stock available, or a delivery block is set on the order.
- **Cannot post goods issue:** insufficient unrestricted stock for the material.
- **Cannot create billing:** goods issue not yet posted (for delivery-related billing) or a billing block is set.
- **No FI document after billing:** account determination missing or the posting period is closed — involve FI configuration.
