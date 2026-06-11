# Glossary — SAP SD Order-to-Cash

- **Billing** — customer invoice; passes revenue to FI. Create: `VF01`; header `VBRK`, items `VBRP`.
- **Delivery (outbound)** — logistics document triggering picking and goods issue. Create: `VL01N`; header `LIKP`, items `LIPS`.
- **Document flow** — audit trail linking order→delivery→billing→accounting. View: `VBFA`.
- **FI document** — financial accounting posting created by billing. Tables `BKPF` (header), `BSEG` (items).
- **Goods issue** — stock-reducing movement on delivery. Movement type `601`.
- **Sales order** — customer request to deliver goods. Create: `VA01`, change `VA02`, display `VA03`; header `VBAK`, items `VBAP`.
