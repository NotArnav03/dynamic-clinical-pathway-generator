import { motion } from "framer-motion";

export default function Flowchart({ steps }) {
    if (!steps.length) {
        return <div className="empty">No pathway generated</div>;
    }

    return (
        <div className="flow">
            {steps.map((s, i) => (
                <motion.div
                    key={i}
                    className="flow-node"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15 }}
                >
                    <span>{i + 1}</span>
                    {s}
                </motion.div>
            ))}
        </div>
    );
}
