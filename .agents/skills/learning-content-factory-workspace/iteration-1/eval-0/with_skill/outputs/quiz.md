# SAP SD Order-to-Cash — Knowledge Test

**1. Which transaction code creates a sales order?**  _(remember)_

   A. VA01
   B. VA03
   C. VL01N
   D. VF01

**2. Which tables store the sales order header and items?**  _(remember)_

   A. LIKP / LIPS
   B. VBAK / VBAP
   C. VBRK / VBRP
   D. BKPF / BSEG

**3. Which transaction code creates the outbound delivery?**  _(remember)_

   A. VA02
   B. VL01N
   C. VF01
   D. VA01

**4. Which movement type does goods issue post?**  _(remember)_

   A. 101
   B. 261
   C. 601
   D. 641

**5. What is the inventory effect of posting goods issue?**  _(understand)_

   A. It increases inventory
   B. It reduces inventory
   C. It has no inventory effect
   D. It only reserves inventory

**6. Which transaction code creates the billing invoice?**  _(remember)_

   A. VF01
   B. VL01N
   C. VA01
   D. VA02

**7. When billing passes revenue to Financial Accounting, which tables hold the resulting FI document?**  _(understand)_

   A. VBRK / VBRP
   B. VBAK / VBAP
   C. LIKP / LIPS
   D. BKPF / BSEG

**8. The outbound delivery (VL01N) triggers picking and goods issue.**  _(understand)_

   A. True
   B. False

**9. The sales order header is stored in table LIKP.**  _(remember)_

   A. True
   B. False

**10. List the three Order-to-Cash documents in sequence with their create tcodes.**  _(apply)_


---

## Answer Key

1. **A** — VA01 creates a sales order; VA03 displays it. [Ch.1]
2. **B** — Sales order header is VBAK, items VBAP. [Ch.1]
3. **B** — VL01N creates the outbound delivery. [Ch.2]
4. **C** — Goods issue posts material movement type 601, reducing inventory. [Ch.2]
5. **B** — Goods issue (movement type 601) reduces inventory. [Ch.2]
6. **A** — VF01 creates the invoice sent to the customer. [Ch.3]
7. **D** — Billing creates an FI document stored in BKPF/BSEG. [Ch.3]
8. **True** — Per Ch.2, the outbound delivery triggers picking and goods issue.
9. **False** — The sales order header is VBAK; LIKP is the delivery header.
10. **Sales order (VA01), outbound delivery (VL01N), billing (VF01).** [Ch.1-3]
