# Glossary — SAP SD Order-to-Cash

Terms, transaction codes, and tables from the source, with concise definitions.

## Process & concepts
- **SD (Sales and Distribution)** — The SAP module that manages selling and shipping goods/services.
- **Order-to-Cash (O2C)** — The end-to-end business process from a customer order to receiving cash; in this material it covers sales order → delivery → billing.
- **Sales order** — A customer's request to deliver goods or services; the first document in O2C.
- **Sold-to party** — The customer who places the order.
- **Material** — A product or item sold, referenced on the order with quantity and price.
- **Outbound delivery** — The logistics document that triggers picking and goods issue.
- **Picking** — Gathering the ordered goods from the warehouse for shipment.
- **Goods issue (GI)** — Posting that records goods leaving the company; reduces inventory.
- **Movement type 601** — The material movement type posted at goods issue for an outbound delivery.
- **Inventory** — On-hand stock; reduced when goods issue is posted.
- **Billing** — Creating the invoice sent to the customer; passes revenue to Financial Accounting.
- **Invoice** — The billing document sent to the customer requesting payment.
- **FI (Financial Accounting)** — The SAP module that records revenue, receivables, and other accounting entries.
- **FI document** — The accounting document automatically created by billing.
- **Document flow** — The linked chain of documents (order → delivery → billing) that lets you trace the process.

## Transaction codes
- **VA01** — Create sales order.
- **VA02** — Change sales order.
- **VA03** — Display sales order.
- **VL01N** — Create outbound delivery.
- **VF01** — Create billing document.

## Tables
- **VBAK** — Sales order header.
- **VBAP** — Sales order items.
- **LIKP** — Outbound delivery header.
- **LIPS** — Outbound delivery items.
- **VBRK** — Billing document header.
- **VBRP** — Billing document items.
- **BKPF** — Accounting (FI) document header.
- **BSEG** — Accounting (FI) document line items.
