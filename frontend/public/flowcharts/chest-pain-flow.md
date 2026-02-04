flowchart TD
    A[Chest Pain] --> B{Age ≥ 50?}
    B -- Yes --> C{Severity = severe?}
    B -- No --> F[Low Risk Pathway]

    C -- Yes --> D{Duration ≥ 1 hour?}
    C -- No --> F

    D -- Yes --> E[HIGH RISK]
    D -- No --> F

    E --> E1[Immediate ECG]
    E1 --> E2[Troponin Test]
    E2 --> E3[Cardiology Consult]
    E3 --> E4[Risk Stratification]

    F --> F1[Clinical Examination]
    F1 --> F2[Observation]
