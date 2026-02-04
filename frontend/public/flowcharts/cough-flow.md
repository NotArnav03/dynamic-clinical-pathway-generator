flowchart TD
    A[Cough] --> B{Duration ≥ 168 hours?}
    B -- Yes --> C[HIGH RISK]
    B -- No --> D[LOW RISK]

    C --> C1[Chest X-Ray]
    C1 --> C2[Sputum Examination]

    D --> D1[Symptomatic Treatment]
