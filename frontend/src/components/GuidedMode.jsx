import { useState } from "react";
import { motion } from "framer-motion";

export default function GuidedMode({ steps, evidenceLinks = {} }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [completedSteps, setCompletedSteps] = useState([]);
    const [isGuidedMode, setIsGuidedMode] = useState(false);

    const markComplete = (index) => {
        if (!completedSteps.includes(index)) {
            setCompletedSteps([...completedSteps, index]);
        }
    };

    const markIncomplete = (index) => {
        setCompletedSteps(completedSteps.filter(i => i !== index));
    };

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    if (!isGuidedMode) {
        return (
            <div style={{ marginTop: '1rem' }}>
                <button
                    onClick={() => setIsGuidedMode(true)}
                    style={{
                        background: 'rgba(34, 197, 94, 0.2)',
                        border: '1px solid rgba(34, 197, 94, 0.4)',
                        color: '#4ade80',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: '500'
                    }}
                >
                    🎯 Start Guided Mode
                </button>
            </div>
        );
    }

    const progress = ((completedSteps.length / steps.length) * 100).toFixed(0);

    return (
        <div style={{
            marginTop: '1rem',
            padding: '1.5rem',
            background: 'rgba(34, 197, 94, 0.1)',
            borderRadius: '12px',
            border: '1px solid rgba(34, 197, 94, 0.3)'
        }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem'
            }}>
                <div>
                    <h4 style={{ margin: 0, color: '#e5e7eb' }}>Guided Workflow</h4>
                    <p style={{
                        margin: '4px 0 0 0',
                        fontSize: '0.85rem',
                        color: '#94a3b8'
                    }}>
                        Step {currentStep + 1} of {steps.length} • {progress}% Complete
                    </p>
                </div>
                <button
                    onClick={() => setIsGuidedMode(false)}
                    style={{
                        background: 'rgba(239, 68, 68, 0.2)',
                        border: '1px solid rgba(239, 68, 68, 0.4)',
                        color: '#ef4444',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.85rem'
                    }}
                >
                    × Exit
                </button>
            </div>

            {/* Progress Bar */}
            <div style={{
                width: '100%',
                height: '8px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '4px',
                overflow: 'hidden',
                marginBottom: '1.5rem'
            }}>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                    style={{
                        height: '100%',
                        background: 'linear-gradient(90deg, #10b981, #34d399)',
                        borderRadius: '4px'
                    }}
                />
            </div>

            {/* Current Step */}
            <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                    padding: '1.5rem',
                    background: 'rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    marginBottom: '1rem',
                    border: '2px solid rgba(34, 197, 94, 0.4)'
                }}
            >
                <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px'
                }}>
                    <input
                        type="checkbox"
                        checked={completedSteps.includes(currentStep)}
                        onChange={(e) => {
                            if (e.target.checked) {
                                markComplete(currentStep);
                            } else {
                                markIncomplete(currentStep);
                            }
                        }}
                        style={{
                            width: '24px',
                            height: '24px',
                            cursor: 'pointer',
                            marginTop: '2px'
                        }}
                    />
                    <div style={{ flex: 1 }}>
                        <h3 style={{
                            margin: '0 0 8px 0',
                            color: '#4ade80',
                            fontSize: '1.1rem'
                        }}>
                            Step {currentStep + 1}: {steps[currentStep]}
                        </h3>

                        {evidenceLinks[steps[currentStep]] && (
                            <a
                                href={evidenceLinks[steps[currentStep]]}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    color: '#60a5fa',
                                    textDecoration: 'none',
                                    fontSize: '0.85rem',
                                    marginTop: '8px',
                                    padding: '6px 12px',
                                    background: 'rgba(59, 130, 246, 0.1)',
                                    borderRadius: '6px',
                                    border: '1px solid rgba(59, 130, 246, 0.3)'
                                }}
                            >
                                📚 View Clinical Evidence
                            </a>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* Navigation */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '12px'
            }}>
                <button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    style={{
                        flex: 1,
                        padding: '12px',
                        borderRadius: '8px',
                        background: currentStep === 0
                            ? 'rgba(255, 255, 255, 0.05)'
                            : 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: currentStep === 0 ? '#64748b' : '#e5e7eb',
                        cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
                        fontWeight: '600'
                    }}
                >
                    ← Previous
                </button>
                <button
                    onClick={nextStep}
                    disabled={currentStep === steps.length - 1}
                    style={{
                        flex: 1,
                        padding: '12px',
                        borderRadius: '8px',
                        background: currentStep === steps.length - 1
                            ? 'rgba(255, 255, 255, 0.05)'
                            : 'linear-gradient(135deg, #10b981, #34d399)',
                        border: 'none',
                        color: currentStep === steps.length - 1 ? '#64748b' : 'white',
                        cursor: currentStep === steps.length - 1 ? 'not-allowed' : 'pointer',
                        fontWeight: '600'
                    }}
                >
                    Next →
                </button>
            </div>

            {/* All Steps Overview */}
            <div style={{
                marginTop: '1.5rem',
                paddingTop: '1rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
                <h5 style={{
                    margin: '0 0 12px 0',
                    color: '#94a3b8',
                    fontSize: '0.9rem'
                }}>
                    All Steps:
                </h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            onClick={() => setCurrentStep(index)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '8px 12px',
                                borderRadius: '6px',
                                background: index === currentStep
                                    ? 'rgba(34, 197, 94, 0.2)'
                                    : 'rgba(255, 255, 255, 0.05)',
                                border: index === currentStep
                                    ? '1px solid rgba(34, 197, 94, 0.4)'
                                    : '1px solid transparent',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            <input
                                type="checkbox"
                                checked={completedSteps.includes(index)}
                                onChange={(e) => {
                                    e.stopPropagation();
                                    if (e.target.checked) {
                                        markComplete(index);
                                    } else {
                                        markIncomplete(index);
                                    }
                                }}
                                style={{ cursor: 'pointer' }}
                            />
                            <span style={{
                                fontSize: '0.85rem',
                                color: completedSteps.includes(index) ? '#4ade80' : '#94a3b8',
                                textDecoration: completedSteps.includes(index) ? 'line-through' : 'none'
                            }}>
                                {index + 1}. {step}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
