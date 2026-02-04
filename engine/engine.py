from rules import CLINICAL_RULES


def matches_criteria(criteria, age, severity, duration):
    """
    Check if patient input satisfies rule criteria.
    Missing criteria are treated as wildcard (pass).
    """

    if "age_min" in criteria and age < criteria["age_min"]:
        return False

    if "age_max" in criteria and age > criteria["age_max"]:
        return False

    if "severity" in criteria and severity not in criteria["severity"]:
        return False

    if "duration_min_hours" in criteria and duration < criteria["duration_min_hours"]:
        return False

    if "duration_max_hours" in criteria and duration > criteria["duration_max_hours"]:
        return False

    return True


def generate_clinical_pathway(
    symptom: str,
    age: int,
    severity: str,
    duration: float
):
    """
    Returns a structured clinical workflow for a given patient input.
    """

    symptom = symptom.lower().strip()
    severity = severity.lower().strip()

    condition = CLINICAL_RULES.get(symptom)

    if not condition:
        return {
            "status": "unknown_condition",
            "pathway": ["No predefined clinical pathway available"],
            "risk_level": "unknown"
        }

    for risk_level, rule in condition.items():
        if matches_criteria(
            rule.get("criteria", {}),
            age,
            severity,
            duration
        ):
            return {
                "status": "matched",
                "risk_level": risk_level,
                "pathway": rule["pathway"]
            }

    return {
        "status": "no_match",
        "risk_level": "undetermined",
        "pathway": ["Further clinical assessment required"]
    }
