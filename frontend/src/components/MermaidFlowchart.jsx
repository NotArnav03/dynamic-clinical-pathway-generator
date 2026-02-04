import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function MermaidFlowchart({ flowchartContent, symptom }) {
    const containerRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!flowchartContent) {
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setError(null);

        // Load mermaid from CDN
        const loadMermaid = async () => {
            try {
                // Check if mermaid is already loaded
                if (!window.mermaid) {
                    const script = document.createElement('script');
                    script.src = 'https://cdn.jsdelivr.net/npm/mermaid@10.9.0/dist/mermaid.min.js';
                    script.async = false;

                    const loadPromise = new Promise((resolve, reject) => {
                        script.onload = resolve;
                        script.onerror = reject;
                    });

                    document.head.appendChild(script);
                    await loadPromise;
                }

                // Initialize mermaid
                if (window.mermaid && !window.mermaid.initialized) {
                    window.mermaid.initialize({
                        startOnLoad: false,
                        theme: "dark",
                        themeVariables: {
                            primaryColor: '#3b82f6',
                            primaryTextColor: '#fff',
                            primaryBorderColor: '#60a5fa',
                            lineColor: '#94a3b8',
                            secondaryColor: '#1e293b',
                            background: '#0f172a',
                            mainBkg: '#1e293b',
                            secondBkg: '#0f172a',
                            tertiaryColor: '#334155',
                            fontSize: '16px',
                            fontFamily: 'Inter, system-ui, sans-serif'
                        },
                        flowchart: {
                            useMaxWidth: true,
                            htmlLabels: true,
                            curve: 'basis'
                        }
                    });
                    window.mermaid.initialized = true;
                }

                // Render the diagram
                if (containerRef.current && window.mermaid) {
                    containerRef.current.innerHTML = "";

                    const id = `mermaid-${Date.now()}`;

                    try {
                        const { svg } = await window.mermaid.render(id, flowchartContent);
                        containerRef.current.innerHTML = svg;
                        setIsLoading(false);
                    } catch (renderError) {
                        console.error('Mermaid render error:', renderError);
                        // Fallback: show the text content
                        containerRef.current.innerHTML = `<pre style="color: #e5e7eb; font-size: 0.9rem; white-space: pre-wrap;">${flowchartContent}</pre>`;
                        setError("Flowchart rendering issue - showing diagram code");
                        setIsLoading(false);
                    }
                }
            } catch (err) {
                console.error('Error loading Mermaid:', err);
                setError("Failed to load diagram library");
                setIsLoading(false);
            }
        };

        loadMermaid();
    }, [flowchartContent]);

    if (!flowchartContent) {
        return (
            <div style={{
                textAlign: "center",
                padding: "3rem",
                color: "#94a3b8",
                fontSize: "0.95rem"
            }}>
                <p>📊 No flowchart available for this symptom</p>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            style={{
                padding: "1.5rem",
                backgroundColor: "#1e293b",
                borderRadius: "12px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                overflow: "auto",
                maxHeight: "600px",
                minHeight: "200px"
            }}
        >
            {isLoading && (
                <div style={{
                    textAlign: "center",
                    padding: "2rem",
                    color: "#94a3b8"
                }}>
                    Loading flowchart...
                </div>
            )}

            {error && (
                <div style={{
                    textAlign: "center",
                    padding: "0.5rem",
                    color: "#fbbf24",
                    fontSize: "0.85rem",
                    marginBottom: "1rem"
                }}>
                    ⚠️ {error}
                </div>
            )}

            <div
                ref={containerRef}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: isLoading ? "200px" : "auto"
                }}
            />

            {symptom && !isLoading && (
                <p style={{
                    textAlign: "center",
                    marginTop: "1rem",
                    fontSize: "0.85rem",
                    color: "#94a3b8"
                }}>
                    Decision flowchart for: <strong style={{ color: "#e5e7eb" }}>{symptom.replace('_', ' ')}</strong>
                </p>
            )}
        </motion.div>
    );
}
