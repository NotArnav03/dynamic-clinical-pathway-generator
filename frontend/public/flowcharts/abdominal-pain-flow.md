flowchart TD
    A[Abdominal Pain] --> B{Severity = severe?}
    B -- Yes --> C{Duration ≥ 6 hours?}
    B -- No --> F[LOW RISK]

    C -- Yes --> D[HIGH RISK]
    C -- No --> F

    D --> D1[Abdominal Ultrasound]
    D1 --> D2[Blood Tests]
    D2 --> D3[Surgical Consultation]

    F --> F1[Clinical Examination]
    F1 --> F2[Observation]
