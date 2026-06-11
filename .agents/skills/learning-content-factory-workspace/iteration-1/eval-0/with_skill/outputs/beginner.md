# Beginner Explanation — SAP SD Order-to-Cash

## Why it matters
When a company sells something, it has to do three things: agree to the sale, actually ship the goods, and ask the customer to pay. SAP gives each of these its own document so nothing gets lost. This three-step chain is called **Order-to-Cash** — from the moment an order comes in to the moment the money is recorded.

## The everyday analogy
Think of ordering a pizza:
1. You phone in your order — they write down what you want and the price. (the **sales order**)
2. The driver picks up the boxes and leaves the shop with them — now the shop has fewer pizzas in stock. (the **delivery** and **goods issue**)
3. They hand you the receipt and the money is counted in the till. (the **billing** / invoice)

SAP does exactly this, just with a document and a database table behind each step.

## Step 1 — The sales order (what the customer wants)
A **sales order** is simply the customer's request to deliver goods or services. You create it in a screen reached by the code `VA01`. (If you need to change it later you use `VA02`, and to just look at it you use `VA03`.)

The order writes its top-level info (which customer, the "sold-to party") into a table called `VBAK`, and each line of products (the materials, their quantities, and prices) into a table called `VBAP`. You don't need to memorize the tables yet — just know the order has a "header" and "items."

## Step 2 — The delivery (sending the goods)
Once you agree to sell, the goods have to physically leave the warehouse. That's the **outbound delivery**, created with `VL01N`. It triggers two things: **picking** (grabbing the items) and **goods issue** (the goods officially leave). The header goes into table `LIKP` and the items into `LIPS`.

The important idea: goods issue records a stock movement (its code is movement type `601`) and **reduces inventory** — the company now owns fewer of those items because they've been shipped.

## Step 3 — Billing (getting paid)
Finally you **bill** the customer with `VF01`, which creates the **invoice**. Header goes to table `VBRK`, items to `VBRP`.

Billing also tells the Finance side of SAP how much revenue was earned. That creates a separate accounting document (an "FI document," stored in tables `BKPF`/`BSEG`). So one customer invoice automatically updates the company's books.

## The whole story in one line
Customer asks (`VA01`) → company ships (`VL01N`, stock drops via movement `601`) → company invoices and books the revenue (`VF01` → FI document). That is Order-to-Cash.
