flowchart TD
    A[Headache] --> B{Severity = severe?}
    B -- Yes --> C{Duration ≥ 24 hours?}
    B -- No --> F[LOW RISK]

    C -- Yes --> D[HIGH RISK]
    C -- No --> F

    D --> D1[Neurological Examination]
    D1 --> D2[CT Brain]
    D2 --> D3[Neurology Consultation]

    F --> F1[Analgesics]
    F1 --> F2[Hydration Advice]
