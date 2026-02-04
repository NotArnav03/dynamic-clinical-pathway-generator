import { motion } from "framer-motion";

export default function DynamicPathwayFlowchart({ steps, riskLevel }) {
    if (!steps || steps.length === 0) {
        return (
            <div style={{
                textAlign: 'center',
                padding: '3rem',
                color: '#94a3b8'
            }}>
                Generate a pathway to see the flow
            </div>
        );
    }

    const getRiskColor = () => {
        const risk = riskLevel?.toLowerCase() || '';
        if (risk.includes('high')) return { bg: 'rgba(239, 68, 68, 0.2)', border: '#ef4444' };
        if (risk.includes('low')) return { bg: 'rgba(34, 197, 94, 0.2)', border: '#22c55e' };
        return { bg: 'rgba(245, 158, 11, 0.2)', border: '#f59e0b' };
    };

    const riskColors = getRiskColor();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{
                padding: '1.5rem',
                background: 'rgba(15, 23, 42, 0.5)',
                borderRadius: '12px'
            }}
        >
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                alignItems: 'center'
            }}>
                {/* Start */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    style={{
                        padding: '1rem 2rem',
                        background: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
                        borderRadius: '50px',
                        textAlign: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                    }}
                >
                    📋 Patient Assessment
                </motion.div>

                {/* Arrow */}
                <div style={{ color: '#60a5fa', fontSize: '1.5rem' }}>↓</div>

                {/* Risk Level */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    style={{
                        padding: '1rem 2rem',
                        background: riskColors.bg,
                        border: `3px solid ${riskColors.border}`,
                        borderRadius: '12px',
                        textAlign: 'center',
                        color: '#e5e7eb',
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                        minWidth: '250px',
                        boxShadow: `0 4px 12px ${riskColors.border}40`
                    }}
                >
                    ⚠️ Risk Level: {riskLevel || 'Determined'}
                </motion.div>

                {/* Arrow */}
                <div style={{ color: '#60a5fa', fontSize: '1.5rem' }}>↓</div>

                {/* Steps */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    width: '100%',
                    maxWidth: '500px'
                }}>
                    {steps.map((step, index) => (
                        <div key={index}>
                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                                style={{
                                    padding: '1rem',
                                    background: 'rgba(30, 41, 59, 0.8)',
                                    border: '2px solid rgba(59, 130, 246, 0.4)',
                                    borderRadius: '10px',
                                    color: '#e5e7eb',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    transition: 'all 0.2s',
                                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
                                }}
                                whileHover={{
                                    scale: 1.02,
                                    boxShadow: '0 4px 16px rgba(59, 130, 246, 0.3)',
                                    borderColor: 'rgba(59, 130, 246, 0.6)'
                                }}
                            >
                                <span style={{
                                    background: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
                                    color: 'white',
                                    minWidth: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                    flexShrink: 0,
                                    boxShadow: '0 2px 8px rgba(59, 130, 246, 0.4)'
                                }}>
                                    {index + 1}
                                </span>
                                <span style={{ fontSize: '0.95rem' }}>{step}</span>
                            </motion.div>

                            {/* Arrow between steps */}
                            {index < steps.length - 1 && (
                                <div style={{
                                    textAlign: 'center',
                                    color: '#60a5fa',
                                    fontSize: '1.2rem',
                                    margin: '0.25rem 0'
                                }}>
                                    ↓
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Arrow */}
                <div style={{ color: '#60a5fa', fontSize: '1.5rem' }}>↓</div>

                {/* End */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 + steps.length * 0.1 }}
                    style={{
                        padding: '1rem 2rem',
                        background: 'linear-gradient(135deg, #22c55e, #4ade80)',
                        borderRadius: '50px',
                        textAlign: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)'
                    }}
                >
                    ✅ Treatment Complete
                </motion.div>
            </div>
        </motion.div>
    );
}
