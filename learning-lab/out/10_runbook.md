# Runbook: Process one Order-to-Cash cycle (SAP SD)

## Prerequisites
- Roles/auth for SD (VA01/VL01N/VF01) and stock visibility.
- Master data: customer (sold-to), material with stock at the plant/storage location, pricing maintained.

## Steps
1. Create sales order — `VA01`, order type OR → enter sold-to, material, qty → Save → record the order number (writes `VBAK`/`VBAP`).
2. Create delivery — `VL01N` with reference to the order → confirm picking qty.
3. Post goods issue — in the delivery, **Post Goods Issue** → posts movement `601` (writes `MSEG`/`MKPF`, reduces stock).
4. Create billing — `VF01` with reference to the delivery → Save → creates `VBRK`/`VBRP` and an FI doc (`BKPF`/`BSEG`).

## Verify
- `VBFA` (document flow) shows order → delivery → goods issue → billing → accounting.
- `MMBE`/`MB51` confirms stock reduced; `BSID` shows the customer open item.

## Rollback
- Before PGI: reverse the delivery (`VL09` for PGI reversal) / delete delivery `VL02N`.
- After billing: cancel the invoice with `VF11` (reverses the FI document). Escalate to SD key user if document flow is inconsistent.
