from engine import generate_clinical_pathway


def run_test_case():
    patient_input = {
        "symptom": "chest_pain",
        "age": 58,
        "severity": "severe",
        "duration": 2
    }
    
    result = generate_clinical_pathway(**patient_input)

    print("\n--- Patient Input ---")
    for k, v in patient_input.items():
        print(f"{k}: {v}")

    print("\n--- Clinical Workflow ---")
    print("Risk Level:", result["risk_level"])
    for step in result["pathway"]:
        print("→", step)


if __name__ == "__main__":
    run_test_case()
