flowchart TD
    A[Diarrhea] --> B{Severity = severe?}
    B -- Yes --> C{Duration ≥ 48 hours?}
    B -- No --> F[LOW RISK]

    C -- Yes --> D[HIGH RISK]
    C -- No --> F

    D --> D1[Stool Examination]
    D1 --> D2[IV Fluids]
    D2 --> D3[Infection Control]

    F --> F1[Oral Rehydration]
    F1 --> F2[Dietary Advice]
