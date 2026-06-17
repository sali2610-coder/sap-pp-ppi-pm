# SAP Order-to-Cash — Study Guide

## Sales Orders
- **Must-know:** A sales order is a customer request to deliver goods. Create it with VA01, change with VA02, display with VA03. The header is stored in table VBAK and items in 
- **Key codes:** VA01
- **Self-test:** Can you explain sales orders and name its steps?

## Delivery
- **Must-know:** The outbound delivery is created with VL01N. Header table LIKP, items LIPS. Goods issue posts movement type 601 and reduces inventory.
- **Key codes:** VL01N
- **Self-test:** Can you explain delivery and name its steps?

## Billing
- **Must-know:** Billing is created with VF01. Header table VBRK, items VBRP. Billing creates an FI document in tables BKPF and BSEG.
- **Key codes:** VF01
- **Self-test:** Can you explain billing and name its steps?

## Returns
- **Must-know:** A return order uses VA01 with order type RE. Credit memo processing follows with VF01.
- **Key codes:** VA01, VF01
- **Self-test:** Can you explain returns and name its steps?

### You should be able to…
- Sales Orders
- Delivery
- Billing
- Returns