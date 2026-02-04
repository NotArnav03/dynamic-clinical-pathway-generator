import { useState } from "react";

const SYMPTOMS = {
    "Chest Pain Syndromes": [
        "Typical Angina",
        "Atypical Chest Pain",
        "STEMI-like Chest Pain",
        "Unstable Angina",
    ],
    "Respiratory": [
        "Shortness of Breath",
        "Orthopnea",
        "Paroxysmal Nocturnal Dyspnea",
    ],
    "Cardiac Symptoms": [
        "Palpitations",
        "Syncope",
        "Near Syncope",
        "Sudden Cardiac Arrest (ROSC)",
    ],
    "Systemic / Other": [
        "Diaphoresis",
        "Nausea / Vomiting",
        "Fatigue",
        "Epigastric Pain",
    ],
};

export default function InputForm({ onSubmit }) {
    const [form, setForm] = useState({
        age: "",
        duration: "",
        symptom: "",
        severity: "moderate",
    });

    const update = (key, value) =>
        setForm((f) => ({ ...f, [key]: value }));

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit?.(form);
            }}
            className="space-y-5"
        >
            {/* Age */}
            <input
                type="number"
                placeholder="Age"
                value={form.age}
                onChange={(e) => update("age", e.target.value)}
                className="input"
            />

            {/* Duration */}
            <input
                type="number"
                placeholder="Duration of symptoms (hours)"
                value={form.duration}
                onChange={(e) => update("duration", e.target.value)}
                className="input"
            />

            {/* Symptom Selector */}
            <select
                value={form.symptom}
                onChange={(e) => update("symptom", e.target.value)}
                className="input"
            >
                <option value="">Select primary symptom</option>

                {Object.entries(SYMPTOMS).map(([group, items]) => (
                    <optgroup key={group} label={group}>
                        {items.map((symptom) => (
                            <option key={symptom} value={symptom}>
                                {symptom}
                            </option>
                        ))}
                    </optgroup>
                ))}
            </select>

            {/* Severity */}
            <div className="flex gap-3">
                {["mild", "moderate", "severe"].map((level) => (
                    <button
                        type="button"
                        key={level}
                        onClick={() => update("severity", level)}
                        className={`px-4 py-2 rounded-lg border transition ${form.severity === level
                                ? "bg-blue-500 text-white border-blue-500"
                                : "border-white/20 hover:bg-white/10"
                            }`}
                    >
                        {level}
                    </button>
                ))}
            </div>

            {/* Submit */}
            <button className="btn-primary w-full">
                Generate Clinical Pathway
            </button>
        </form>
    );
}
