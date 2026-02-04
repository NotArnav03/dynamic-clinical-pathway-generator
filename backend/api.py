from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, validator
from pathway_service import generate_and_explain_pathway
import uvicorn


app = FastAPI(
    title="Clinical Pathway API",
    description="AI-assisted clinical decision support system",
    version="1.0.0"
)

# CORS configuration - allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Vite default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PathwayRequest(BaseModel):
    """Request model for pathway generation"""
    symptom: str = Field(..., description="Patient symptom", min_length=1)
    age: int = Field(..., description="Patient age in years", ge=0, le=120)
    severity: str = Field(..., description="Severity level")
    duration: float = Field(..., description="Duration in hours", ge=0)
    
    @validator('severity')
    def validate_severity(cls, v):
        allowed = ['mild', 'moderate', 'severe']
        if v.lower() not in allowed:
            raise ValueError(f'Severity must be one of: {", ".join(allowed)}')
        return v.lower()
    
    @validator('symptom')
    def validate_symptom(cls, v):
        return v.lower().strip().replace(' ', '_')


class PathwayResponse(BaseModel):
    """Response model for pathway generation"""
    status: str
    risk_level: str
    pathway: list[str]
    explanation: str | None = None
    patient_context: dict
    flowchart: str | None = None
    evidence_links: dict | None = None


@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "status": "online",
        "service": "Clinical Pathway Generator API",
        "version": "1.0.0"
    }


@app.post("/api/pathway", response_model=PathwayResponse)
async def generate_pathway(request: PathwayRequest):
    """
    Generate clinical pathway and explanation
    
    Args:
        request: Patient information (symptom, age, severity, duration)
    
    Returns:
        Structured pathway with LLM explanation
    """
    try:
        # Import evidence links
        from evidence_links import get_evidence_links
        
        # Call the pathway service
        result = generate_and_explain_pathway(
            symptom=request.symptom,
            age=request.age,
            severity=request.severity,
            duration=request.duration
        )
        
        # Build response
        return PathwayResponse(
            status=result["pathway_result"]["status"],
            risk_level=result["pathway_result"]["risk_level"],
            pathway=result["pathway_result"]["pathway"],
            explanation=result["explanation"],
            flowchart=result["flowchart"],
            evidence_links=get_evidence_links(),
            patient_context={
                "symptom": request.symptom,
                "age": request.age,
                "severity": request.severity,
                "duration": request.duration
            }
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error generating pathway: {str(e)}"
        )


@app.get("/api/symptoms")
async def list_symptoms():
    """List all available symptoms in the system"""
    from rules import CLINICAL_RULES
    
    symptoms = list(CLINICAL_RULES.keys())
    return {
        "symptoms": symptoms,
        "count": len(symptoms)
    }


if __name__ == "__main__":
    print("🚀 Starting Clinical Pathway API Server...")
    print("📍 API Docs: http://localhost:8000/docs")
    print("🏥 Frontend should connect to: http://localhost:8000/api/pathway")
    
    uvicorn.run(
        "api:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
