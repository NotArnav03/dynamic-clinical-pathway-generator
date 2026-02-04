CLINICAL_RULES = {

    # ===================== COMMON CONDITIONS =====================

    "chest_pain": {
        "high_risk": {
            "criteria": {
                "age_min": 50,
                "severity": ["severe"],
                "duration_min_hours": 1
            },
            "pathway": [
                "Immediate ECG",
                "Cardiac Biomarkers (Troponin)",
                "Cardiology Consultation",
                "Risk Stratification"
            ]
        },
        "low_risk": {
            "criteria": {
                "severity": ["mild", "moderate"],
                "duration_max_hours": 1
            },
            "pathway": [
                "Clinical Examination",
                "Observation"
            ]
        }
    },

    "fever": {
        "high_risk": {
            "criteria": {
                "age_min": 65,
                "severity": ["severe"],
                "duration_min_hours": 48
            },
            "pathway": [
                "Blood Tests",
                "Blood Cultures",
                "Empirical Antibiotics",
                "Hospital Admission"
            ]
        },
        "low_risk": {
            "criteria": {
                "severity": ["mild", "moderate"]
            },
            "pathway": [
                "Temperature Monitoring",
                "Symptomatic Treatment"
            ]
        }
    },

    "shortness_of_breath": {
        "high_risk": {
            "criteria": {
                "severity": ["severe"]
            },
            "pathway": [
                "Oxygen Therapy",
                "Chest X-Ray",
                "Arterial Blood Gas",
                "Pulmonology Consultation"
            ]
        },
        "low_risk": {
            "criteria": {
                "severity": ["mild"]
            },
            "pathway": [
                "Pulse Oximetry",
                "Clinical Assessment"
            ]
        }
    },

    "headache": {
        "high_risk": {
            "criteria": {
                "severity": ["severe"],
                "duration_min_hours": 24
            },
            "pathway": [
                "Neurological Examination",
                "CT Brain",
                "Neurology Consultation"
            ]
        },
        "low_risk": {
            "criteria": {
                "severity": ["mild"]
            },
            "pathway": [
                "Analgesics",
                "Hydration Advice"
            ]
        }
    },

    "abdominal_pain": {
        "high_risk": {
            "criteria": {
                "severity": ["severe"],
                "duration_min_hours": 6
            },
            "pathway": [
                "Abdominal Ultrasound",
                "Blood Tests",
                "Surgical Consultation"
            ]
        },
        "low_risk": {
            "criteria": {
                "severity": ["mild"]
            },
            "pathway": [
                "Clinical Examination",
                "Observation"
            ]
        }
    },

    "cough": {
        "high_risk": {
            "criteria": {
                "duration_min_hours": 168
            },
            "pathway": [
                "Chest X-Ray",
                "Sputum Examination"
            ]
        },
        "low_risk": {
            "criteria": {
                "severity": ["mild"]
            },
            "pathway": [
                "Symptomatic Treatment"
            ]
        }
    },

    "vomiting": {
        "high_risk": {
            "criteria": {
                "severity": ["severe"],
                "duration_min_hours": 24
            },
            "pathway": [
                "IV Fluids",
                "Electrolyte Testing",
                "Hospital Observation"
            ]
        },
        "low_risk": {
            "criteria": {
                "severity": ["mild"]
            },
            "pathway": [
                "Oral Rehydration",
                "Dietary Advice"
            ]
        }
    },

    "diarrhea": {
        "high_risk": {
            "criteria": {
                "duration_min_hours": 48,
                "severity": ["severe"]
            },
            "pathway": [
                "Stool Examination",
                "IV Fluids",
                "Infection Control"
            ]
        },
        "low_risk": {
            "criteria": {
                "severity": ["mild"]
            },
            "pathway": [
                "Oral Rehydration",
                "Dietary Advice"
            ]
        }
    },

    "urinary_pain": {
        "high_risk": {
            "criteria": {
                "severity": ["severe"]
            },
            "pathway": [
                "Urine Culture",
                "Renal Ultrasound",
                "Antibiotic Therapy"
            ]
        },
        "low_risk": {
            "criteria": {
                "severity": ["mild"]
            },
            "pathway": [
                "Urinalysis",
                "Oral Antibiotics"
            ]
        }
    },

    # ===================== NICHE / SPECIALIZED CONDITIONS =====================

    "transient_ischemic_attack": {
        "high_risk": {
            "criteria": {
                "age_min": 55,
                "severity": ["severe"]
            },
            "pathway": [
                "Immediate CT Brain",
                "Carotid Doppler",
                "Stroke Unit Admission"
            ]
        }
    },

    "sepsis_suspected": {
        "high_risk": {
            "criteria": {
                "severity": ["severe"]
            },
            "pathway": [
                "Sepsis Protocol Activation",
                "Blood Cultures",
                "Broad Spectrum Antibiotics",
                "ICU Evaluation"
            ]
        }
    },

    "acute_kidney_injury": {
        "high_risk": {
            "criteria": {
                "duration_min_hours": 24
            },
            "pathway": [
                "Renal Function Tests",
                "Fluid Balance Monitoring",
                "Nephrology Consultation"
            ]
        }
    },

    "pulmonary_embolism_suspected": {
        "high_risk": {
            "criteria": {
                "severity": ["severe"]
            },
            "pathway": [
                "CT Pulmonary Angiography",
                "D-Dimer Test",
                "Anticoagulation Therapy"
            ]
        }
    },

    "meningitis_suspected": {
        "high_risk": {
            "criteria": {
                "severity": ["severe"]
            },
            "pathway": [
                "Lumbar Puncture",
                "IV Antibiotics",
                "Isolation Precautions"
            ]
        }
    }
}
