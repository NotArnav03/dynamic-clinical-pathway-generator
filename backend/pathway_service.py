from engine import generate_clinical_pathway
from llm_explainer import explain_pathway
from flowchart_mapper import get_flowchart_content


def generate_and_explain_pathway(
    symptom: str,
    age: int,
    severity: str,
    duration: float
):
    """
    Complete pipeline: generate pathway → explain with LLM → get flowchart
    
    Args:
        symptom: Patient's symptom (e.g., "chest_pain", "fever")
        age: Patient's age in years
        severity: Severity level ("mild", "moderate", "severe")
        duration: Symptom duration in hours
    
    Returns:
        dict with pathway result, LLM explanation, and flowchart diagram
    """
    
    # Step 1: Generate pathway using rule-based engine
    pathway_result = generate_clinical_pathway(symptom, age, severity, duration)
    
    # Step 2: If pathway was found, get LLM explanation
    llm_explanation = None
    
    if pathway_result["status"] == "matched":
        context = {
            "symptom": symptom,
            "age": age,
            "severity": severity,
            "duration": duration
        }
        
        llm_explanation = explain_pathway(
            context=context,
            steps=pathway_result["pathway"]
        )
    
    # Step 3: Get flowchart diagram for the symptom
    flowchart_content = get_flowchart_content(symptom)
    
    # Step 4: Return combined result
    return {
        "pathway_result": pathway_result,
        "explanation": llm_explanation,
        "flowchart": flowchart_content
    }
