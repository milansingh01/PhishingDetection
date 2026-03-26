import { motion } from "framer-motion";
import { FraudCase } from "@/data/mockData";

interface FraudTableProps {
  cases: FraudCase[];
}

const FraudTable = ({ cases }: FraudTableProps) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="glass-card p-5 overflow-x-auto"
    >
      <h3 className="text-sm font-semibold text-foreground mb-4">Recent Fraud Cases</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            {["Employee", "Department", "Email ID", "Fraud Status", "System Decision", "Human Verification", "Timestamp"].map((h) => (
              <th key={h} className="text-left py-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cases.map((c, i) => (
            <tr key={i} className="border-b border-border/50 transition-colors hover:bg-muted/30">
              <td className="py-3 px-3 font-medium text-foreground">{c.employee}</td>
              <td className="py-3 px-3 text-muted-foreground">{c.department}</td>
              <td className="py-3 px-3 text-muted-foreground font-mono text-xs">{c.emailId}</td>
              <td className="py-3 px-3">
                <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                  c.fraudStatus === "Fraud"
                    ? "bg-destructive/15 text-destructive"
                    : "bg-success/15 text-success"
                }`}>
                  {c.fraudStatus}
                </span>
              </td>
              <td className="py-3 px-3 text-muted-foreground">{c.systemDecision}</td>
              <td className="py-3 px-3 text-muted-foreground">{c.humanVerification}</td>
              <td className="py-3 px-3 text-muted-foreground">{c.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default FraudTable;
