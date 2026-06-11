# SAP SD Order-to-Cash — Explained for Beginners

Imagine you run a shop and a customer wants to buy something. From the moment they ask, until the money is in your bank, there are three simple steps. SAP calls this whole journey **Order-to-Cash** (often shortened to **O2C**). The part of SAP that handles it is called **SD** — Sales and Distribution.

Let's walk through it like a story.

## Step 1: The customer places an order
A customer says, "I'd like 10 boxes of product X, please." In SAP you write that down as a **sales order**.

- You type `VA01` to **create** the order (later you can use `VA02` to change it or `VA03` to just look at it).
- The order remembers **who** the customer is (the "sold-to party" — the person buying) and **what** they want (the materials/products), how **many**, and at what **price**.
- Behind the scenes, SAP stores the top-level info (customer, date) in a table called **VBAK**, and each product line in **VBAP**.

At this point nothing has actually moved or been paid. It's just a **promise**: "We agree to deliver this."

## Step 2: You ship the goods
Now you actually send the products. This is the **delivery**.

- You type `VL01N` to create the **outbound delivery**.
- Two things happen physically:
  1. **Picking** — someone in the warehouse gathers the 10 boxes.
  2. **Goods issue** — you tell SAP "the goods have left the building." 
- When goods issue happens, SAP records a **stock movement (type 601)** that **lowers your inventory** by 10 boxes — because you no longer own them, the customer does.
- The delivery is stored in tables **LIKP** (header) and **LIPS** (items).

## Step 3: You send the bill and get paid
Finally, you charge the customer. This is **billing**.

- You type `VF01` to create the **invoice**.
- The invoice is the document you send the customer asking for money.
- Importantly, SAP automatically tells the **accounting department (FI = Financial Accounting)** about the sale. It creates an **accounting document** so the revenue and the customer's debt are recorded properly.
- The invoice lives in tables **VBRK** (header) and **VBRP** (items); the accounting document lives in **BKPF** and **BSEG**.

## The big picture
Think of it as a relay race where each runner passes a baton to the next:

> **Order** (the promise) → **Delivery** (the shipping) → **Billing** (the money)

Each document points back to the one before it, so you can always trace the full history: which invoice came from which delivery, which came from which order. SAP calls this the **document flow**.

That's the whole basics of Order-to-Cash. Master these three transactions — `VA01`, `VL01N`, `VF01` — and you understand the backbone of SAP Sales.
