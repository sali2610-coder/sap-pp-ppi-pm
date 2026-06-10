# Mermaid SAP Templates — Reference

Ready-to-render snippets. SAP color tiers:
`classDef ecc fill:#0a6ed1` · `s4 fill:#d62027` · `middleware fill:#6a737d` · `external fill:#107e3e` (white text).

## Flowchart / Process Map (value stream)
```mermaid
flowchart LR
    A["Step<br/>TCODE · TABLE"] --> B["Next<br/>TCODE"]
```
Use `LR` for OTC / PTP value streams, `TD` for hierarchy.

## Swimlane (true horizontal lanes)
```mermaid
flowchart LR
    subgraph LANE1["Role A"]
        direction TB
        A1 --> A2
    end
    subgraph LANE2["Role B"]
        direction TB
        B1 --> B2
    end
    A2 ==> B1
```
Rule: **top-level `LR` + each subgraph `direction TB`** = lanes side-by-side. A top-level `TB` collapses lanes into one vertical column.

## Architecture (tiered subgraphs)
```mermaid
flowchart LR
    subgraph EXT["External"]
      Z[Partner]
    end
    subgraph MW["Middleware"]
      PIPO[SAP PI/PO]
    end
    subgraph SAP["SAP ECC/S4"]
      APP[Application]
    end
    Z --> PIPO --> APP
```

## Org Chart
```mermaid
flowchart TD
    BOSS --> A
    BOSS --> B
    A --> A1
```

## Sequence (IDoc handshake)
```mermaid
sequenceDiagram
    participant EXT as Partner
    participant PI as PI/PO
    participant SAP as ECC
    EXT->>PI: ORDERS05
    PI->>SAP: inbound IDoc
    SAP-->>PI: ORDRSP (status 03)
```

## ER (table relations)
```mermaid
erDiagram
    PLKO ||--o{ PLPO : "task list header→ops"
    EQUI ||--o{ EQKT : "equipment→text"
```

## Render
```bash
bash scripts/render.sh src/file.mmd out/file.svg          # one
bash scripts/render.sh --all src/ out/                     # batch → svg+png
# themes: default | neutral | dark | forest | base
```
Export formats: **SVG** (vector), **PNG** (`-s` DPI scale), **PDF** (`-f` fit), **md** (inlined SVG).
