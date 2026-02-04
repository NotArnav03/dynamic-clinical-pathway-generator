import { motion } from "framer-motion";

export default function RiskGauge() {
    return (
        <div className="flex items-center justify-between">
            <div>
                <p className="text-slate-400 text-sm">Estimated Risk</p>
                <h3 className="text-3xl font-bold mt-1">High</h3>
                <p className="text-sm text-slate-400 mt-1">
                    Based on symptom severity and duration
                </p>
            </div>

            <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative w-28 h-28"
            >
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-red-500 to-orange-400 blur-xl opacity-40" />
                <div className="relative w-full h-full rounded-full border border-white/20 flex items-center justify-center text-xl font-bold">
                    🔥
                </div>
            </motion.div>
        </div>
    );
}
