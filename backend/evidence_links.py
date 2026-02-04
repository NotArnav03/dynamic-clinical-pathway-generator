# Evidence-based clinical guideline references - Working Medical Resources

EVIDENCE_LINKS = {
    # Chest Pain - Cardiac Guidelines
    "Immediate ECG": "https://main.mohfw.gov.in/",
    "Cardiac Biomarkers (Troponin)": "https://www.who.int/news-room/fact-sheets/detail/cardiovascular-diseases",
    "Cardiology Consultation": "https://www.who.int/health-topics/cardiovascular-diseases",
    "Risk Stratification": "https://main.mohfw.gov.in/",
    "Clinical Examination": "https://www.who.int/health-topics",
    "Observation": "https://main.mohfw.gov.in/",
    
    # Fever - Infectious Diseases
    "Blood Tests": "https://www.icmr.gov.in/",
    "Blood Cultures": "https://www.who.int/health-topics/fever",
    "Chest X-Ray": "https://www.who.int/news-room/fact-sheets/detail/tuberculosis",
    "Antipyretic Medication": "https://www.who.int/health-topics/medicines",
    "Hydration": "https://www.who.int/health-topics/nutrition",
    
    # Headache - Neurological Assessment
    "Neurological Assessment": "https://www.who.int/health-topics/headache-disorders",
    "CT Scan": "https://www.who.int/news-room/fact-sheets/detail/headache-disorders",
    "Pain Management": "https://www.who.int/news-room/fact-sheets/detail/palliative-care",
    "Rest": "https://www.who.int/health-topics",
    
    # Shortness of Breath - Respiratory
    "Oxygen Saturation Check": "https://www.who.int/news-room/fact-sheets/detail/asthma",
    "Pulmonary Function Test": "https://www.who.int/news-room/fact-sheets/detail/chronic-obstructive-pulmonary-disease-(copd)",
    "Bronchodilators": "https://www.who.int/health-topics/asthma",
    "Oxygen Therapy": "https://www.who.int/news-room/fact-sheets/detail/chronic-obstructive-pulmonary-disease-(copd)",
    
    # Abdominal Pain
    "Abdominal Ultrasound": "https://www.who.int/health-topics/diagnostic-imaging",
    "Blood Work": "https://www.icmr.gov.in/",
    "Surgical Consultation": "https://main.mohfw.gov.in/",
    "Symptomatic Relief": "https://www.who.int/health-topics",
    
    # Cough
    "Sputum Examination": "https://www.who.int/news-room/fact-sheets/detail/tuberculosis",
    "Symptomatic Treatment": "https://www.who.int/health-topics/respiratory-infections",
    
    # Diarrhea
    "Stool Analysis": "https://www.who.int/news-room/fact-sheets/detail/diarrhoeal-disease",
    "Rehydration Therapy": "https://www.who.int/news-room/fact-sheets/detail/diarrhoeal-disease",
    "Antimicrobial Therapy": "https://www.who.int/health-topics/antimicrobial-resistance",
    "Dietary Management": "https://www.who.int/health-topics/nutrition",
    
    # Urinary Pain
    "Urinalysis": "https://www.who.int/health-topics/chronic-kidney-disease",
    "Urine Culture": "https://www.icmr.gov.in/",
    "Antibiotic Therapy": "https://www.who.int/health-topics/antimicrobial-resistance",
    "Pain Relief": "https://www.who.int/news-room/fact-sheets/detail/palliative-care",
    "Increased Fluid Intake": "https://www.who.int/health-topics/nutrition",
    
    # Vomiting
    "Antiemetics": "https://www.who.int/health-topics/medicines",
    "Imaging Studies": "https://www.who.int/health-topics/diagnostic-imaging",
    "IV Fluids": "https://www.who.int/health-topics/health-emergencies",
    "Electrolyte Monitoring": "https://main.mohfw.gov.in/",
}

def get_evidence_links():
    """Return all evidence links"""
    return EVIDENCE_LINKS

def get_evidence_for_step(step_name):
    """Get evidence link for a specific step"""
    return EVIDENCE_LINKS.get(step_name, None)
