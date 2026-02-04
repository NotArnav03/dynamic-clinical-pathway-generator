"""
Flowchart mapper - maps symptoms to their Mermaid flowchart files
"""

FLOWCHART_MAP = {
    "chest_pain": "chest-pain-flow.md",
    "fever": "fever-flow.md",
    "headache": "headache-flow.md",
    "shortness_of_breath": "shortness-of-breath-flow.md",
    "abdominal_pain": "abdominal-pain-flow.md",
    "cough": "cough-flow.md",
    "diarrhea": "diarrhea-flow.md",
    "urinary_pain": "urinary-pain-flow.md",
    "vomiting": "vomiting-flow.md",
}


def get_flowchart_for_symptom(symptom: str) -> dict | None:
    """
    Get the flowchart filename for a given symptom.
    
    Args:
        symptom: Normalized symptom name (e.g., "chest_pain")
    
    Returns:
        Dictionary with flowchart filename or None if not found
    """
    symptom = symptom.lower().strip()
    
    if symptom in FLOWCHART_MAP:
        return {
            "filename": FLOWCHART_MAP[symptom],
            "available": True
        }
    
    return {
        "filename": None,
        "available": False
    }


def get_flowchart_content(symptom: str) -> str | None:
    """
    Read and return the actual Mermaid flowchart content.
    
    Args:
        symptom: Normalized symptom name
    
    Returns:
        Mermaid flowchart content as string, or None if not found
    """
    import os
    from pathlib import Path
    
    flowchart_info = get_flowchart_for_symptom(symptom)
    
    if not flowchart_info["available"]:
        return None
    
    # Construct path to flowchart file
    # Assuming it's in ../frontend/public/flowcharts/
    base_dir = Path(__file__).parent.parent
    flowchart_path = base_dir / "frontend" / "public" / "flowcharts" / flowchart_info["filename"]
    
    try:
        with open(flowchart_path, "r", encoding="utf-8") as f:
            return f.read()
    except FileNotFoundError:
        return None
    except Exception as e:
        print(f"Error reading flowchart: {e}")
        return None
