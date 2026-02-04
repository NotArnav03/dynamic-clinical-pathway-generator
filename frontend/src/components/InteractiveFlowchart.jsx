import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactFlow, {
    Background,
    Controls,
    MiniMap,
    useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import * as htmlToImage from "html-to-image";

export default function InteractiveFlowchart({ steps, severity = "moderate" }) {
    const wrapperRef = useRef(null);
    const { fitView } = useReactFlow?.() || {};
    const [active, setActive] = useState(null);
    const [reason, setReason] = useState("");

    // ---- Branching logic (simple but real)
    const branchedSteps = useMemo(() => {
        if (!steps.length) return [];
        if (severity === "severe") {
            return [
                ...steps.slice(0, 2),
                "ICU Admission / Cath Lab Activation",
                ...steps.slice(2),
            ];
        }
        return steps;
    }, [steps, severity]);

    const nodes = branchedSteps.map((label, i) => ({
        id: `${i}`,
        data: { label },
        position: { x: 0, y: i * 110 },
        style: {
            background: active === `${i}` ? "rgba(96,165,250,0.25)" : "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 14,
            padding: 14,
            width: 300,
            color: "#e5e7eb",
            cursor: "pointer",
        },
    }));

    const edges = branchedSteps.slice(1).map((_, i) => ({
        id: `e${i}-${i + 1}`,
        source: `${i}`,
        target: `${i + 1}`,
        animated: true,
        style: { stroke: "#60a5fa" },
    }));

    // ---- Click node → reasoning + voice
    const onNodeClick = useCallback((_, node) => {
        setActive(node.id);
        const text = explain(node.data.label);
        setReason(text);
        speak(text);
    }, []);

    // ---- Export PNG
    const exportPNG = async () => {
        if (!wrapperRef.current) return;
        const dataUrl = await htmlToImage.toPng(wrapperRef.current);
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = "clinical-pathway.png";
        a.click();
    };

    useEffect(() => {
        fitView && fitView({ padding: 0.2 });
    }, [fitView, branchedSteps.length]);

    if (!steps.length) {
        return <div className="empty">Generate a pathway to visualize the flowchart</div>;
    }

    return (
        <div>
            <div className="flow-actions">
                <button className="icon-btn" onClick={() => speak(steps.join(". "))}>🔊 Narrate</button>
                <button className="icon-btn" onClick={exportPNG}>📸 Export PNG</button>
            </div>

            <div ref={wrapperRef} style={{ height: 420, width: "100%" }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodeClick={onNodeClick}
                    fitView
                    nodesDraggable
                    zoomOnScroll
                >
                    <MiniMap nodeColor={() => "#60a5fa"} maskColor="rgba(0,0,0,0.4)" />
                    <Controls />
                    <Background gap={18} color="#1e293b" />
                </ReactFlow>
            </div>

            {reason && (
                <div className="reason-panel">
                    <strong>Clinical reasoning</strong>
                    <p>{reason}</p>
                </div>
            )}
        </div>
    );
}

/* ---------- helpers ---------- */
function speak(text) {
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.9;
    u.pitch = 1;
    speechSynthesis.speak(u);
}

function explain(label) {
    if (label.includes("ECG")) return "Early ECG identifies STEMI or ischemia and dictates immediate reperfusion pathways.";
    if (label.includes("troponin")) return "High-sensitivity troponins confirm myocardial injury and guide risk stratification.";
    if (label.includes("Risk")) return "TIMI/GRACE scores estimate short-term mortality and guide invasive strategy.";
    if (label.includes("ICU")) return "Severe presentations require ICU or cath lab escalation for rapid intervention.";
    if (label.includes("Therapy")) return "Evidence-based therapy reduces mortality and prevents recurrent ischemia.";
    return "This step follows established ACC/AHA guideline recommendations.";
}
