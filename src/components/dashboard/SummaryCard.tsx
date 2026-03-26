import { motion } from "framer-motion";
import { Target, AlertTriangle, XCircle } from "lucide-react";

interface SummaryCardProps {
  data: {
    accuracy: number;
    falsePositives: number;
    falseNegatives: number;
  };
}

const SummaryCard = ({ data }: SummaryCardProps) => {
  const items = [
    { label: "Accuracy", value: `${data.accuracy}%`, icon: Target, color: "text-primary" },
    { label: "False Positives", value: String(data.falsePositives), icon: AlertTriangle, color: "text-warning" },
    { label: "False Negatives", value: String(data.falseNegatives), icon: XCircle, color: "text-destructive" },
  ];

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="glass-card p-5"
    >
      <h3 className="text-sm font-semibold text-foreground mb-4">Detection Summary</h3>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.label} className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
            <div className="flex items-center gap-3">
              <item.icon className={`w-4 h-4 ${item.color}`} />
              <span className="text-sm text-muted-foreground">{item.label}</span>
            </div>
            <span className="text-lg font-bold text-foreground">{item.value}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default SummaryCard;
