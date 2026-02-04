import { useState } from "react";
import { motion } from "framer-motion";
import InputPanel from "./components/InputPanel";
import MermaidFlowchart from "./components/MermaidFlowchart";
import DynamicPathwayFlowchart from "./components/DynamicPathwayFlowchart";
import RiskChart from "./components/RiskChart";
import ChatBot from "./components/ChatBot";
import PathwayEditor from "./components/PathwayEditor";
import GuidedMode from "./components/GuidedMode";
import { ReactFlowProvider } from "reactflow";

const API_URL = "http://localhost:8000/api/pathway";

export default function App() {
  const [steps, setSteps] = useState([]);
  const [severity, setSeverity] = useState("moderate");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [riskLevel, setRiskLevel] = useState(null);
  const [explanation, setExplanation] = useState(null);
  const [patientContext, setPatientContext] = useState(null);
  const [flowchart, setFlowchart] = useState(null);
  const [evidenceLinks, setEvidenceLinks] = useState({});

  const handleGenerate = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to generate pathway");
      }

      const data = await response.json();

      // Update state with response
      setSteps(data.pathway);
      setSeverity(formData.severity);
      setRiskLevel(data.risk_level);
      setExplanation(data.explanation);
      setPatientContext(data.patient_context);
      setFlowchart(data.flowchart);
      setEvidenceLinks(data.evidence_links || {});

    } catch (err) {
      setError(err.message);
      console.error("Error generating pathway:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <motion.div
        className="container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* LEFT */}
        <section className="left">
          <h1>Clinical Pathway Generator</h1>
          <p className="subtitle">
            AI-assisted clinical decision support
          </p>
          <InputPanel onGenerate={handleGenerate} loading={loading} />

          {/* Error Display */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="card"
              style={{
                backgroundColor: "#fee",
                border: "1px solid #fcc",
                marginTop: "1rem",
                padding: "1rem",
              }}
            >
              <h3 style={{ color: "#c33", margin: 0 }}>⚠️ Error</h3>
              <p style={{ margin: "0.5rem 0 0 0", color: "#666" }}>{error}</p>
            </motion.div>
          )}

          {/* Patient Context Display */}
          {patientContext && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="card"
              style={{ marginTop: "1rem" }}
            >
              <h3>Patient Information</h3>
              <div style={{ fontSize: "0.9rem", color: "#666" }}>
                <p><strong>Symptom:</strong> {patientContext.symptom.replace('_', ' ')}</p>
                <p><strong>Age:</strong> {patientContext.age} years</p>
                <p><strong>Severity:</strong> {patientContext.severity}</p>
                <p><strong>Duration:</strong> {patientContext.duration} hours</p>
                <p><strong>Risk Level:</strong> <span style={{
                  color: riskLevel === 'high_risk' ? '#c33' : '#3c3',
                  fontWeight: 'bold'
                }}>{riskLevel?.replace('_', ' ')}</span></p>
              </div>


              {/* Interactive Features */}
              {steps.length > 0 && (
                <div>
                  <PathwayEditor
                    steps={steps}
                    onStepsChange={setSteps}
                  />
                  <GuidedMode
                    steps={steps}
                    evidenceLinks={evidenceLinks}
                  />
                </div>
              )}
            </motion.div>
          )}
        </section>

        {/* RIGHT */}
        <section className="right">
          <div className="card large">
            <div className="card-header">
              <h2>Clinical Decision Flowchart</h2>
            </div>
            {flowchart ? (
              <MermaidFlowchart
                flowchartContent={flowchart}
                symptom={patientContext?.symptom}
              />
            ) : (
              <div style={{
                textAlign: "center",
                padding: "3rem",
                color: "#999"
              }}>
                Enter patient information to generate pathway
              </div>
            )}
          </div>

          {/* Dynamic Pathway Flowchart - Updates with edits */}
          {steps.length > 0 && (
            <div className="card large" style={{ marginTop: '1rem' }}>
              <div className="card-header">
                <h2>Current Pathway Flow</h2>
                <span style={{
                  fontSize: '0.85rem',
                  color: '#94a3b8',
                  fontWeight: 'normal'
                }}>
                  ✨ Updates automatically when you edit steps
                </span>
              </div>
              <DynamicPathwayFlowchart
                steps={steps}
                riskLevel={riskLevel}
              />
            </div>
          )}

          <div className="grid-2">
            <div className="card subtle">
              <RiskChart riskLevel={riskLevel} />
            </div>
            <div className="card highlight">
              <ChatBot steps={steps} explanation={explanation} />
            </div>
          </div>
        </section>
      </motion.div>
    </div>
  );
}
