# Beginner Explanation — How a Sale Flows Through SAP

Why it matters: when a customer buys something, the company needs to ship it and get paid — and every
step has to be recorded. SAP does this in three connected documents.

Think of it like an online order:
1. **You place the order** — in SAP that's the *sales order* (transaction `VA01`). It says who wants
   what, how much, and at what price.
2. **The warehouse ships it** — that's the *delivery* (`VL01N`). The goods leave the shelf, so stock
   goes down.
3. **You get the invoice** — that's *billing* (`VF01`). Now the customer owes money, and Finance
   records the revenue.

Each document hands off to the next: order → delivery → billing. If you remember those three steps and
their transactions (`VA01` → `VL01N` → `VF01`), you understand the backbone of "Order-to-Cash".
