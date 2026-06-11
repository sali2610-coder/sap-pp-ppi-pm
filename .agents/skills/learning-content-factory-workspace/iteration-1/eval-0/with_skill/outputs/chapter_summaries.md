# Chapter Summaries — SAP SD: Order-to-Cash Basics

Source: `source.md` (SAP SD — Order-to-Cash Basics, demo source).
Faithful compression of the source only; no facts, tcodes, or tables added beyond what it states.

### Ch.1 — Sales Orders
**Aim:** Capture a customer's request to deliver goods/services as a sales order.
- A sales order is a customer request to deliver goods or services.
- Created with `VA01`, changed with `VA02`, displayed with `VA03`.
- Header is stored in table `VBAK`; items in table `VBAP`.
- The order references a customer (the sold-to party).
- It carries one or more materials with quantities and prices.

**Takeaway:** The sales order (`VA01`, `VBAK`/`VBAP`) is the starting document that records who ordered what, how much, and at what price.

### Ch.2 — Delivery
**Aim:** Turn the sales order into the logistics movement that ships the goods.
- The outbound delivery (`VL01N`) is the logistics document that triggers picking and goods issue.
- Header is stored in table `LIKP`; items in table `LIPS`.
- Goods issue posts a material movement (movement type `601`).
- That goods issue reduces inventory.

**Takeaway:** The outbound delivery (`VL01N`, `LIKP`/`LIPS`) executes the physical fulfillment — picking and goods issue (movement type `601`) that lowers stock.

### Ch.3 — Billing
**Aim:** Invoice the customer and pass the revenue to Finance.
- Billing (`VF01`) creates the invoice sent to the customer.
- Header is stored in table `VBRK`; items in table `VBRP`.
- Billing passes the revenue to Financial Accounting.
- This creates an FI document (tables `BKPF`/`BSEG`).

**Takeaway:** Billing (`VF01`, `VBRK`/`VBRP`) produces the customer invoice and hands revenue to FI, generating an accounting document in `BKPF`/`BSEG`.
