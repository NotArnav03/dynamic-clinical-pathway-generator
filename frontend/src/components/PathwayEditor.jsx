import { useState } from "react";
import { motion, Reorder } from "framer-motion";

export default function PathwayEditor({ steps, onStepsChange }) {
    const [editableSteps, setEditableSteps] = useState(steps);
    const [isEditing, setIsEditing] = useState(false);
    const [newStep, setNewStep] = useState("");

    const handleReorder = (newOrder) => {
        setEditableSteps(newOrder);
        if (onStepsChange) onStepsChange(newOrder);
    };

    const handleDelete = (index) => {
        const updated = editableSteps.filter((_, i) => i !== index);
        setEditableSteps(updated);
        if (onStepsChange) onStepsChange(updated);
    };

    const handleAdd = () => {
        if (!newStep.trim()) return;
        const updated = [...editableSteps, newStep];
        setEditableSteps(updated);
        if (onStepsChange) onStepsChange(updated);
        setNewStep("");
    };

    const handleEdit = (index, newText) => {
        const updated = [...editableSteps];
        updated[index] = newText;
        setEditableSteps(updated);
        if (onStepsChange) onStepsChange(updated);
    };

    if (!isEditing) {
        return (
            <div style={{ marginTop: '1rem' }}>
                <button
                    onClick={() => setIsEditing(true)}
                    style={{
                        background: 'rgba(59, 130, 246, 0.2)',
                        border: '1px solid rgba(59, 130, 246, 0.4)',
                        color: '#60a5fa',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: '500'
                    }}
                >
                    ✏️ Edit Pathway
                </button>
            </div>
        );
    }

    return (
        <div style={{
            marginTop: '1rem',
            padding: '1rem',
            background: 'rgba(59, 130, 246, 0.1)',
            borderRadius: '12px',
            border: '1px solid rgba(59, 130, 246, 0.3)'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem'
            }}>
                <h4 style={{ margin: 0, color: '#e5e7eb' }}>Edit Pathway Steps</h4>
                <button
                    onClick={() => setIsEditing(false)}
                    style={{
                        background: 'rgba(34, 197, 94, 0.2)',
                        border: '1px solid rgba(34, 197, 94, 0.4)',
                        color: '#4ade80',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.85rem'
                    }}
                >
                    ✓ Done
                </button>
            </div>

            <p style={{
                fontSize: '0.85rem',
                color: '#94a3b8',
                marginBottom: '1rem'
            }}>
                Drag to reorder • Click edit icon to modify • Click × to remove
            </p>

            <Reorder.Group
                axis="y"
                values={editableSteps}
                onReorder={handleReorder}
                style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0
                }}
            >
                {editableSteps.map((step, index) => (
                    <Reorder.Item
                        key={step}
                        value={step}
                        style={{
                            marginBottom: '0.5rem',
                            background: 'rgba(255, 255, 255, 0.08)',
                            padding: '12px',
                            borderRadius: '8px',
                            cursor: 'grab',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}
                        whileDrag={{
                            scale: 1.05,
                            cursor: 'grabbing',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                        }}
                    >
                        <span style={{
                            color: '#94a3b8',
                            fontSize: '1.2rem',
                            cursor: 'grab'
                        }}>
                            ⋮⋮
                        </span>
                        <span style={{
                            fontWeight: 'bold',
                            color: '#60a5fa',
                            minWidth: '24px'
                        }}>
                            {index + 1}.
                        </span>
                        <input
                            type="text"
                            value={step}
                            onChange={(e) => handleEdit(index, e.target.value)}
                            style={{
                                flex: 1,
                                background: 'transparent',
                                border: 'none',
                                color: '#e5e7eb',
                                fontSize: '0.95rem',
                                outline: 'none'
                            }}
                        />
                        <button
                            onClick={() => handleDelete(index)}
                            style={{
                                background: 'rgba(239, 68, 68, 0.2)',
                                border: '1px solid rgba(239, 68, 68, 0.4)',
                                color: '#ef4444',
                                padding: '4px 8px',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '0.85rem'
                            }}
                        >
                            ×
                        </button>
                    </Reorder.Item>
                ))}
            </Reorder.Group>

            <div style={{
                marginTop: '1rem',
                display: 'flex',
                gap: '8px'
            }}>
                <input
                    type="text"
                    placeholder="Add new step..."
                    value={newStep}
                    onChange={(e) => setNewStep(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                    style={{
                        flex: 1,
                        padding: '10px',
                        borderRadius: '8px',
                        background: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#e5e7eb',
                        outline: 'none'
                    }}
                />
                <button
                    onClick={handleAdd}
                    style={{
                        background: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
                        border: 'none',
                        color: 'white',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '600'
                    }}
                >
                    + Add
                </button>
            </div>
        </div>
    );
}
