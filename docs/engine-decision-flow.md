flowchart TD
    A[Start] --> B[Normalize symptom & severity]
    B --> C{Symptom in CLINICAL_RULES?}

    C -- No --> D[Return unknown_condition]
    C -- Yes --> E[Iterate risk levels]

    E --> F{matches_criteria?}

    F -- Yes --> G[Return matched risk_level + pathway]
    F -- No --> H{More rules?}

    H -- Yes --> E
    H -- No --> I[Return no_match]


