# SAP MM — Procure-to-Pay
## Purchase Order
Create with ME21N; header table EKKO, items EKPO.
## Goods Receipt
Post with MIGO; movement 101 increases stock and writes MSEG.
## Invoice Verification
Post with MIRO; three-way match against the PO and goods receipt. Creates an FI document (BKPF).
