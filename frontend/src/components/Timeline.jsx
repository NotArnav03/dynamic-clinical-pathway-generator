import { motion } from "framer-motion";

const steps = [
    {
        title: "Immediate ECG Assessment",
        desc: "Obtain 12-lead ECG within 10 minutes to identify STEMI or ischemic changes.",
    },
    {
        title: "Cardiac Biomarker Testing",
        desc: "High-sensitivity troponin at presentation and repeat at 1–3 hours.",
    },
    {
        title: "Risk Stratification (TIMI / GRACE)",
        desc: "Estimate short-term mortality and guide invasive vs conservative strategy.",
    },
    {
        title: "Evidence-Based Therapy",
        desc: "Initiate antiplatelets, anticoagulation, statins, beta-blockers as indicated.",
    },
    {
        title: "Cardiology Consultation",
        desc: "Early specialist involvement for invasive planning and optimization.",
    },
];

export default function Timeline() {
    return (
        <div className="space-y-6">
            {steps.map((step, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="flex gap-5 items-start"
                >
                    <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-sm font-bold">
                            {i + 1}
                        </div>
                        {i !== steps.length - 1 && (
                            <div className="w-px h-full bg-white/20 mt-2" />
                        )}
                    </div>

                    <div className="glass-subcard">
                        <h3 className="font-semibold text-lg">{step.title}</h3>
                        <p className="text-sm text-slate-300 mt-1">{step.desc}</p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
