# Runbook: Run one Order-to-Cash cycle (SAP SD)

A single pass through the sales flow: sales order → outbound delivery → billing. Uses only the
transaction codes, tables, and movement type defined in the source.

## Prerequisites
- SD authorizations to run `VA01`/`VA02`/`VA03`, `VL01N`, and `VF01`.
- A customer set up as the **sold-to party**.
- At least one **material** with a quantity and a price to sell.
- Stock available, since goods issue will **reduce inventory** (movement type `601`).

## Steps
1. **Create the sales order** — run `VA01`. Enter the sold-to party and one or more materials with
   quantities and prices, then save. → Order saved; header written to `VBAK`, items to `VBAP`.
   (To change it later use `VA02`; to view it use `VA03`.)
2. **Create the outbound delivery** — run `VL01N` with reference to the sales order. → Delivery
   created; header written to `LIKP`, items to `LIPS`. This document triggers picking and goods issue.
3. **Post goods issue** — from the delivery, post goods issue. → A material movement of movement
   type `601` is posted, **reducing inventory**.
4. **Create the billing document** — run `VF01` with reference to the delivery. → Invoice created;
   header written to `VBRK`, items to `VBRP`. Billing passes the revenue to Financial Accounting,
   creating an FI document in `BKPF`/`BSEG`.

## Verify
- Sales order exists: display with `VA03`; confirm header entry in `VBAK` and item(s) in `VBAP`.
- Delivery exists with header in `LIKP` / items in `LIPS`, and goods issue is posted (movement type `601`).
- Inventory for the material has decreased (effect of the `601` goods issue).
- Billing document exists in `VBRK`/`VBRP`, and a corresponding FI document exists in `BKPF`/`BSEG`.

## Rollback
The source does not define reversal transactions for these steps. To undo or correct a cycle, work
backwards with the responsible teams: reverse/cancel the billing document (FI document in `BKPF`/`BSEG`),
then reverse the goods issue (the movement type `601` posting that reduced inventory), then the delivery
(`LIKP`/`LIPS`), and finally the sales order (`VA02` to change, `VBAK`/`VBAP`). Escalate to your SD/FI
support team if you are unsure — these reversals are not specified in the source material.
