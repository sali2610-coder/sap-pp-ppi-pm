# SAP Order-to-Cash — Course Book

## Sales Orders
A sales order is a customer request to deliver goods. Create it with VA01, change with VA02, display with VA03. The header is stored in table VBAK and items in VBAP.

## Delivery
The outbound delivery is created with VL01N. Header table LIKP, items LIPS. Goods issue posts movement type 601 and reduces inventory.

## Billing
Billing is created with VF01. Header table VBRK, items VBRP. Billing creates an FI document in tables BKPF and BSEG.

## Returns
A return order uses VA01 with order type RE. Credit memo processing follows with VF01.
