export default function ReasoningPanel() {
    return (
        <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
            <p>
                Based on the provided patient data, the system prioritizes early ischemic
                evaluation due to symptom duration and reported severity.
            </p>

            <p>
                High-risk features trigger immediate ECG assessment followed by cardiac
                biomarker testing to rule out acute coronary syndrome.
            </p>

            <p>
                Risk stratification scores guide escalation toward invasive management
                and early cardiology involvement.
            </p>
        </div>
    );
}
