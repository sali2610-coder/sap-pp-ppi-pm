# SAP SD — Order-to-Cash Basics (demo source)

## Chapter 1 — Sales Orders
A sales order is a customer request to deliver goods or services. Create it with VA01, change with
VA02, display with VA03. The header is stored in table VBAK and items in VBAP. The order references a
customer (sold-to party) and one or more materials with quantities and prices.

## Chapter 2 — Delivery
The outbound delivery (VL01N) is the logistics document that triggers picking and goods issue. Header
table LIKP, items LIPS. Goods issue posts a material movement (type 601) reducing inventory.

## Chapter 3 — Billing
Billing (VF01) creates the invoice sent to the customer. Header table VBRK, items VBRP. Billing passes
the revenue to Financial Accounting, creating an FI document (tables BKPF/BSEG).
