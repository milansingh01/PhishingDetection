import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface DepartmentBarChartProps {
  data: { department: string; cases: number }[];
}

const DepartmentBarChart = ({ data }: DepartmentBarChartProps) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="glass-card p-5"
    >
      <h3 className="text-sm font-semibold text-foreground mb-4">Fraud Cases by Department</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 15%, 90%)" />
          <XAxis dataKey="department" tick={{ fill: "hsl(215, 15%, 50%)", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "hsl(215, 15%, 50%)", fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ backgroundColor: "hsl(0, 0%, 100%)", border: "1px solid hsl(210, 15%, 88%)", borderRadius: "0.75rem", color: "hsl(215, 25%, 15%)" }}
          />
          <Bar dataKey="cases" fill="hsl(197, 100%, 47%)" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default DepartmentBarChart;
