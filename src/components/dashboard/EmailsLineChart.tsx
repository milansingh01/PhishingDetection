import { motion } from "framer-motion";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

interface EmailsLineChartProps {
  data: { date: string; emails: number }[];
}

const EmailsLineChart = ({ data }: EmailsLineChartProps) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass-card p-5"
    >
      <h3 className="text-sm font-semibold text-foreground mb-4">Emails Scanned – Last 30 Days</h3>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="emailGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(197, 100%, 47%)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="hsl(197, 100%, 47%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 15%, 90%)" />
          <XAxis dataKey="date" tick={{ fill: "hsl(215, 15%, 50%)", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "hsl(215, 15%, 50%)", fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ backgroundColor: "hsl(0, 0%, 100%)", border: "1px solid hsl(210, 15%, 88%)", borderRadius: "0.75rem", color: "hsl(215, 25%, 15%)" }}
          />
          <Area type="monotone" dataKey="emails" stroke="hsl(197, 100%, 47%)" fill="url(#emailGradient)" strokeWidth={2} dot={{ r: 3, fill: "hsl(197, 100%, 47%)" }} />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default EmailsLineChart;
