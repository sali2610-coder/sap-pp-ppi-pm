# Knowledge Test — SAP SD Order-to-Cash

10 questions. Answers and explanations are at the bottom. No peeking.

---

## Questions

**1.** Which transaction code creates a sales order?
- A) VL01N
- B) VA01
- C) VF01
- D) VA03

**2.** What is stored in table VBAK?
- A) Sales order items
- B) Sales order header
- C) Delivery header
- D) Billing items

**3.** The "sold-to party" refers to:
- A) The warehouse that ships the goods
- B) The customer who places the order
- C) The accounting department
- D) The material being sold

**4.** Which document triggers picking and goods issue?
- A) Sales order
- B) Billing document
- C) Outbound delivery
- D) FI document

**5.** Which tables hold the outbound delivery header and items?
- A) VBAK / VBAP
- B) LIKP / LIPS
- C) VBRK / VBRP
- D) BKPF / BSEG

**6.** Goods issue posts a material movement of which type?
- A) 101
- B) 261
- C) 601
- D) 561

**7.** What is the inventory effect of goods issue?
- A) Increases inventory
- B) Reduces inventory
- C) No effect on inventory
- D) Transfers inventory between plants

**8.** Which transaction creates the billing document (invoice)?
- A) VF01
- B) VA02
- C) VL01N
- D) VA01

**9.** When billing is created, what does it produce in Financial Accounting?
- A) A material document
- B) A sales order
- C) An FI document (BKPF/BSEG)
- D) A delivery note

**10.** What is the correct sequence of the Order-to-Cash flow?
- A) Billing → Delivery → Sales order
- B) Delivery → Sales order → Billing
- C) Sales order → Delivery → Billing
- D) Sales order → Billing → Delivery

---

## Answer Key

| # | Answer | Why |
|---|--------|-----|
| 1 | **B** | VA01 = create sales order (VA02 change, VA03 display). |
| 2 | **B** | VBAK = sales order header; VBAP = items. |
| 3 | **B** | Sold-to party is the customer placing the order. |
| 4 | **C** | The outbound delivery (VL01N) triggers picking and goods issue. |
| 5 | **B** | LIKP = delivery header, LIPS = delivery items. |
| 6 | **C** | Goods issue posts movement type 601. |
| 7 | **B** | Goods issue reduces inventory (stock leaves the company). |
| 8 | **A** | VF01 creates the billing document / invoice. |
| 9 | **C** | Billing passes revenue to FI, creating an FI document in BKPF/BSEG. |
| 10 | **C** | Order (VA01) → Delivery (VL01N) → Billing (VF01). |

**Scoring:** 9–10 correct = excellent · 7–8 = solid · 5–6 = review the chapters · below 5 = re-read the summaries and notes.
