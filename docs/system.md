flowchart LR
    A[User / Patient Input] --> B[Frontend UI]
    B --> C[API Call]
    C --> D[generate_clinical_pathway()]
    D --> E[Risk Level + Pathway]
    E --> F[Frontend Display]
