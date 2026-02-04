import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";

export default function RiskChart({ riskLevel }) {
    // Map risk levels to visual data
    const getRiskData = () => {
        if (!riskLevel) {
            return [
                { name: "Low", value: 20 },
                { name: "Medium", value: 40 },
                { name: "High", value: 70 },
            ];
        }

        const isHighRisk = riskLevel === "high_risk";
        const isLowRisk = riskLevel === "low_risk";

        return [
            {
                name: "Low",
                value: isLowRisk ? 80 : 20,
                active: isLowRisk
            },
            {
                name: "Medium",
                value: !isHighRisk && !isLowRisk ? 60 : 30,
                active: !isHighRisk && !isLowRisk
            },
            {
                name: "High",
                value: isHighRisk ? 90 : 40,
                active: isHighRisk
            },
        ];
    };

    const data = getRiskData();

    return (
        <>
            <h3>Risk Assessment</h3>
            <ResponsiveContainer width="100%" height={200}>
                <BarChart data={data}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={
                                    entry.active
                                        ? (entry.name === "High" ? "#ef4444" : "#22c55e")
                                        : "#94a3b8"
                                }
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
            {riskLevel && (
                <p style={{
                    textAlign: "center",
                    marginTop: "0.5rem",
                    fontSize: "0.85rem",
                    color: "#666"
                }}>
                    Current: <strong>{riskLevel.replace('_', ' ')}</strong>
                </p>
            )}
        </>
    );
}
