# Chapter Summaries — SAP SD Order-to-Cash Basics

## Chapter 1 — Sales Orders
A **sales order** is a customer's request to deliver goods or services. It is the first document in the Order-to-Cash (O2C) flow.

- **Transactions:** `VA01` (create), `VA02` (change), `VA03` (display).
- **Data:** header stored in table **VBAK**, items in **VBAP**.
- **Key content:** references a customer (the **sold-to party**) and one or more materials, each with a quantity and price.
- **Role in the flow:** captures the commercial agreement; nothing physical or financial has happened yet — it is a commitment to deliver.

## Chapter 2 — Delivery
The **outbound delivery** is the logistics document that moves goods toward the customer.

- **Transaction:** `VL01N` (create outbound delivery).
- **Data:** header table **LIKP**, items **LIPS**.
- **Two physical sub-steps:** **picking** (gathering the goods from the warehouse) and **goods issue (GI)**.
- **Goods issue effect:** posts a material movement of **type 601**, which **reduces inventory** and records that the company no longer owns the stock.
- **Role in the flow:** turns the commercial promise of the order into a physical shipment and a stock reduction.

## Chapter 3 — Billing
**Billing** creates the invoice that is sent to the customer and connects sales to finance.

- **Transaction:** `VF01` (create billing document).
- **Data:** header table **VBRK**, items **VBRP**.
- **Financial integration:** billing passes revenue to **Financial Accounting (FI)**, automatically creating an **FI document** stored in **BKPF** (header) and **BSEG** (line items).
- **Role in the flow:** recognises revenue, posts the receivable against the customer, and closes the O2C cycle.

## The Order-to-Cash chain at a glance
1. **Sales Order** (VA01 → VBAK/VBAP) — the customer commits to buy.
2. **Delivery** (VL01N → LIKP/LIPS) — goods are picked and goods issue (601) reduces stock.
3. **Billing** (VF01 → VBRK/VBRP) — invoice created, revenue posted to FI (BKPF/BSEG).

Each document references the previous one, creating a traceable **document flow** from order to cash.
