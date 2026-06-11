# Chapter Summaries — SAP SD Order-to-Cash

### Ch.1 — Sales Orders
**Aim:** capture a customer's request to deliver goods.
- Create VA01 · change VA02 · display VA03.
- Header in VBAK, items in VBAP.
- References sold-to party + materials with qty/price.
**Takeaway:** the sales order is the commercial starting point of O2C.

### Ch.2 — Delivery
**Aim:** turn the order into a logistics document.
- Outbound delivery VL01N; header LIKP, items LIPS.
- Triggers picking and goods issue.
- Goods issue posts movement type 601, reducing inventory.
**Takeaway:** delivery moves the goods and depletes stock.

### Ch.3 — Billing
**Aim:** invoice the customer and recognise revenue.
- Billing VF01; header VBRK, items VBRP.
- Passes revenue to FI, creating an FI document (BKPF/BSEG).
**Takeaway:** billing closes O2C by turning the delivery into money owed.
