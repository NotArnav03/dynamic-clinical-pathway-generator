flowchart TD
    A[Shortness of Breath] --> B{Severity = severe?}
    B -- Yes --> C[HIGH RISK]
    B -- No --> D[LOW RISK]

    C --> C1[Oxygen Therapy]
    C1 --> C2[Chest X-Ray]
    C2 --> C3[Arterial Blood Gas]
    C3 --> C4[Pulmonology Consultation]

    D --> D1[Pulse Oximetry]
    D1 --> D2[Clinical Assessment]
