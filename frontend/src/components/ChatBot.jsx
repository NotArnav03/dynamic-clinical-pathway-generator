import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function ChatBot({ steps, explanation }) {
    const [messages, setMessages] = useState([
        {
            from: "bot",
            text: "I'm your clinical assistant. I'll explain the pathway when it's generated.",
        },
    ]);

    const [input, setInput] = useState("");
    const chatEndRef = useRef(null);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Add LLM explanation when it arrives
    useEffect(() => {
        if (explanation) {
            setMessages([
                {
                    from: "bot",
                    text: "I'm your clinical assistant. Ask me about the pathway, risks, or next steps.",
                },
                {
                    from: "bot",
                    text: explanation,
                    isExplanation: true,
                }
            ]);
        }
    }, [explanation]);

    const speak = (text) => {
        // Stop any ongoing speech
        speechSynthesis.cancel();

        const u = new SpeechSynthesisUtterance(text);
        u.rate = 0.9;
        u.pitch = 1;
        speechSynthesis.speak(u);
    };

    const respond = (question) => {
        const q = question.toLowerCase();
        let reply = "";

        // Specific question patterns
        if (q.includes("what") && (q.includes("next") || q.includes("do"))) {
            if (steps.length > 0) {
                reply = `The immediate next steps are: ${steps.slice(0, 2).join(", then ")}. ${steps.length > 2 ? `Followed by ${steps.length - 2} additional action${steps.length > 3 ? 's' : ''}.` : ''}`;
            } else {
                reply = "Please generate a pathway first by entering patient information.";
            }
        } else if (q.includes("how many") || q.includes("steps")) {
            reply = steps.length
                ? `This pathway includes ${steps.length} clinical step${steps.length > 1 ? 's' : ''}: ${steps.join(", ")}.`
                : "No pathway generated yet.";
        } else if (q.includes("first") || q.includes("priority")) {
            reply = steps.length
                ? `The first and most critical step is: "${steps[0]}". This should be performed immediately.`
                : "Please generate a pathway first.";
        } else if (q.includes("last") || q.includes("final")) {
            reply = steps.length
                ? `The final step is: "${steps[steps.length - 1]}".`
                : "No pathway generated yet.";
        } else if (q.includes("why") && q.includes("risk")) {
            reply = "Risk is determined by matching patient criteria (age, severity, duration) against clinical rules. If criteria don't match any defined pattern, it shows 'undetermined' to prompt individual clinical assessment.";
        } else if (q.includes("what") && q.includes("risk")) {
            reply = "Risk levels are calculated by evaluating patient age, symptom severity, and duration against evidence-based clinical criteria.";
        } else if (q.includes("why") || q.includes("reason")) {
            if (explanation) {
                reply = "Here's the clinical reasoning: " + explanation;
            } else {
                reply = "The pathway is based on evidence-based clinical guidelines matched to the patient's specific characteristics.";
            }
        } else if (q.includes("explain") || q.includes("tell me more")) {
            if (explanation) {
                reply = explanation;
            } else {
                reply = "Generate a pathway to see a detailed clinical explanation.";
            }
        } else if (q.includes("pathway")) {
            reply = steps.length
                ? `This pathway was generated based on the patient's symptom, age, severity, and duration. It contains ${steps.length} evidence-based steps.`
                : "Generate a pathway by entering patient information above.";
        } else if (q.includes("symptom")) {
            reply = "The system analyzes 9 different symptoms: chest pain, fever, headache, shortness of breath, abdominal pain, cough, diarrhea, urinary pain, and vomiting.";
        } else if (q.includes("urgent") || q.includes("emergency")) {
            reply = steps.length && steps[0]
                ? `Based on the pathway, the urgent action is: "${steps[0]}". If this is a real emergency, call emergency services immediately.`
                : "For medical emergencies, always call emergency services (911/112) immediately.";
        } else if (q.includes("how long") || q.includes("duration")) {
            reply = "The duration parameter helps determine urgency. Longer durations may indicate chronic conditions, while acute symptoms require immediate attention.";
        } else if (q.includes("age")) {
            reply = "Age is a key risk factor. Older patients (typically 50+ or 60+) often require more aggressive pathways due to higher complication risks.";
        } else if (q.includes("severity")) {
            reply = "Severity levels (mild, moderate, severe) significantly impact the pathway. Severe symptoms usually trigger high-risk protocols with immediate interventions.";
        } else if (q.includes("help") || q.includes("can you")) {
            reply = "I can answer questions about:\n• Pathway steps and priorities\n• Risk assessment logic\n• Symptom criteria\n• Next actions\n• Clinical reasoning\n\nJust ask me anything!";
        } else if (steps.length) {
            // Default response when pathway exists
            reply = `This pathway has ${steps.length} step${steps.length > 1 ? 's' : ''}. You can ask me about specific steps, risk factors, or what to do next.`;
        } else {
            reply = "I'm here to help! Generate a pathway first, then ask me about steps, risks, or clinical reasoning.";
        }

        setMessages((m) => [...m, { from: "bot", text: reply }]);
        // Removed auto-speak - now user clicks speaker icon
    };

    const send = () => {
        if (!input.trim()) return;

        setMessages((m) => [...m, { from: "user", text: input }]);
        respond(input);
        setInput("");
    };

    return (
        <div className="chatbot">
            <h3>Clinical Assistant 🤖</h3>

            <div className="chat-window">
                {messages.map((m, i) => (
                    <motion.div
                        key={i}
                        className={`chat-msg ${m.from}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={m.isExplanation ? {
                            backgroundColor: 'rgba(59, 130, 246, 0.15)',
                            border: '1px solid rgba(96, 165, 250, 0.4)',
                            padding: '1rem',
                            whiteSpace: 'pre-wrap',
                            color: '#e5e7eb',
                            position: 'relative',
                            paddingBottom: '2.5rem'
                        } : {
                            position: 'relative',
                            paddingBottom: m.from === 'bot' ? '2rem' : '0.5rem'
                        }}
                    >
                        {m.text}
                        {m.from === "bot" && (
                            <button
                                onClick={() => speak(m.text)}
                                style={{
                                    position: 'absolute',
                                    bottom: '8px',
                                    right: '8px',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    borderRadius: '6px',
                                    padding: '4px 8px',
                                    cursor: 'pointer',
                                    fontSize: '0.85rem',
                                    color: '#94a3b8',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                                    e.target.style.color = '#e5e7eb';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                                    e.target.style.color = '#94a3b8';
                                }}
                                title="Listen to this message"
                            >
                                🔊
                            </button>
                        )}
                    </motion.div>
                ))}
                <div ref={chatEndRef} />
            </div>

            <div className="chat-input">
                <input
                    placeholder="Ask about the pathway..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && send()}
                />
                <button onClick={send}>Send</button>
            </div>
        </div>
    );
}
