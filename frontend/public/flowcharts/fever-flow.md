flowchart TD
    A[Fever] --> B{Age ≥ 65?}
    B -- Yes --> C{Severity = severe?}
    B -- No --> F[LOW RISK]

    C -- Yes --> D{Duration ≥ 48 hours?}
    C -- No --> F

    D -- Yes --> E[HIGH RISK]
    D -- No --> F

    E --> E1[Blood Tests]
    E1 --> E2[Blood Cultures]
    E2 --> E3[Empirical Antibiotics]
    E3 --> E4[Hospital Admission]

    F --> F1[Temperature Monitoring]
    F1 --> F2[Symptomatic Treatment]
