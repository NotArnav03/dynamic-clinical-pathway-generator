flowchart TD
    A[Urinary Pain] --> B{Severity = severe?}
    B -- Yes --> C[HIGH RISK]
    B -- No --> D[LOW RISK]

    C --> C1[Urine Culture]
    C1 --> C2[Renal Ultrasound]
    C2 --> C3[Antibiotic Therapy]

    D --> D1[Urinalysis]
    D1 --> D2[Oral Antibiotics]
