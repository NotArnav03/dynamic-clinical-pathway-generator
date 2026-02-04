flowchart TD
    A[Vomiting] --> B{Severity = severe?}
    B -- Yes --> C{Duration ≥ 24 hours?}
    B -- No --> F[LOW RISK]

    C -- Yes --> D[HIGH RISK]
    C -- No --> F

    D --> D1[IV Fluids]
    D1 --> D2[Electrolyte Testing]
    D2 --> D3[Hospital Observation]

    F --> F1[Oral Rehydration]
    F1 --> F2[Dietary Advice]
