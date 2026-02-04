import { useState } from "react";

export default function InputPanel({ onGenerate, loading }) {
    const [symptom, setSymptom] = useState("");
    const [age, setAge] = useState("");
    const [severity, setSeverity] = useState("moderate");
    const [duration, setDuration] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate form
        if (!symptom || !age || !duration) {
            alert("Please fill in all fields");
            return;
        }

        // Send data to parent
        onGenerate({
            symptom,
            age: parseInt(age),
            severity,
            duration: parseFloat(duration)
        });
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <input
                placeholder="Age"
                type="number"
                min="0"
                max="120"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
            />

            <input
                placeholder="Duration of symptoms (hours)"
                type="number"
                min="0"
                step="0.1"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
            />

            <select
                value={symptom}
                onChange={(e) => setSymptom(e.target.value)}
                required
            >
                <option value="">Select primary symptom</option>
                <option value="chest_pain">Chest pain</option>
                <option value="fever">Fever</option>
                <option value="shortness_of_breath">Shortness of breath</option>
                <option value="headache">Headache</option>
                <option value="abdominal_pain">Abdominal pain</option>
                <option value="cough">Cough</option>
                <option value="vomiting">Vomiting</option>
                <option value="diarrhea">Diarrhea</option>
                <option value="urinary_pain">Urinary pain</option>
            </select>

            <div className="severity">
                {["mild", "moderate", "severe"].map((level) => (
                    <button
                        type="button"
                        key={level}
                        className={severity === level ? "active" : ""}
                        onClick={() => setSeverity(level)}
                    >
                        {level}
                    </button>
                ))}
            </div>

            <button className="primary" type="submit" disabled={loading}>
                {loading ? "Generating..." : "Generate Pathway"}
            </button>
        </form>
    );
}
