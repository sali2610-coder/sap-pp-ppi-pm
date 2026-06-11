# Practical Exercises — SAP O2C (sandbox)

## Exercise 1 — Create a sales order  (intro)
**Goal:** create a standard order for one material.
**Steps:** `VA01` → order type OR → enter sold-to, material, qty → save.
**Expected result:** system returns a sales document number; check it in `VA03`; header row exists in `VBAK`.
**Solution:** OR + valid sold-to + material with qty → Save → note the document number.

## Exercise 2 — Deliver and post goods issue  (core)
**Goal:** create the outbound delivery and reduce stock.
**Steps:** `VL01N` with reference to the order → pick qty → Post Goods Issue.
**Expected result:** delivery number created (`LIKP`); a 601 material movement posted (`MSEG`); stock reduced.
**Solution:** PGI posts movement 601; verify with `MB51` / stock overview `MMBE`.

## Exercise 3 — Bill the delivery  (stretch)
**Goal:** invoice the customer and confirm the FI posting.
**Steps:** `VF01` with reference to the delivery → save.
**Expected result:** billing document (`VBRK`) + an FI document (`BKPF`); customer open item in `BSID`.
**Solution:** Save billing → use document flow `VBFA` to see order→delivery→billing→accounting linkage.
