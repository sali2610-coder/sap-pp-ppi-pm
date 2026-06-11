# Expert Explanation — Order-to-Cash Internals

O2C in SD is a document-flow chain with copy control between document categories. The sales order
(VBAK/VBAP, category C) is created via VA01; pricing is determined through the condition technique
(procedure assigned by sales area + document/customer pricing procedure). Availability check (ATP) and
credit management gate the schedule line.

Delivery (LIKP/LIPS) is created with reference to the order via copy control (VTLA); goods issue posts
movement type 601 through MM-IM, writing MSEG/MKPF and updating valuation (MBEW) — a value string maps
to the FI/CO accounts. Picking may route through WM/EWM (transfer order) depending on the storage
location's configuration.

Billing (VBRK/VBRP) is created via copy control (VTFL/VTFA); SD-FI integration uses the account
determination procedure (KOFI/KOFK) to derive G/L accounts, creating BKPF/BSEG and updating the
customer's open items (BSID). Watch-outs: incomplete pricing blocks the billing due list; revenue
recognition settings (and S/4HANA's RAR) change how VBRK posts; output determination drives the invoice
form. The document flow (VBFA) is the audit trail linking all three.
